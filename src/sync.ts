import { join } from 'path';
import { writeFileSync } from 'fs';
import lodashFlatten from 'lodash.flatten';
import isomorphicFetch from 'isomorphic-fetch';

const sourceUrl = (branch = 'master') =>
  `https://github.com/postgres/postgres/raw/${branch}/src/backend/utils/errcodes.txt`;

const getSourceText = (): Promise<string[]> =>
  isomorphicFetch(sourceUrl())
    .then(response => response.text())
    .then(text => text.split('\n'));

const stripCommentsAndEmptyLines = (lines: string[]) =>
  lines.filter(line => line !== '' && line.charAt(0) !== '#');

const sectionRegex = /^Section:\s(?<description>.*)$/;

const groupBySections = (lines: string[]) => {
  const sections: Record<string, { description: string, lines: string[] }> = {};
  let currentSection = '';

  lines.forEach((line) => {
    const matches = line.match(sectionRegex);

    if (matches) {
      currentSection = (matches as any).groups.description;
      sections[currentSection] = {
        description: currentSection,
        lines: [],
      };
    } else {
      sections[currentSection].lines.push(line);
    }
  });

  return Object.values(sections);
};

const errorLineRegex =
  /^(?<sqlstate>[A-Z0-9]*)\s*(?<severity>[EWS])\s*ERRCODE_(?<constant>[A-Z_]*)\s*(?<code>[a-z_]*)$/;

const parseErrorLine = (line: string) => {
  const matches = line.match(errorLineRegex);

  if (!matches) {
    throw new Error(`Error parsing error line:\n\t"${line}"`);
  }

  const { sqlstate, severity, constant, code } = (matches as any).groups;

  return { sqlstate, severity, constant, code  };
};

const parseSectionLines = (data: ReturnType<typeof groupBySections>) =>
  data.map(({ lines, ...otherData }) => ({ errorCodes: lines.map(parseErrorLine), ...otherData }));

const getEnum = async () => {
  const errorSections =
    await getSourceText()
      .then(stripCommentsAndEmptyLines)
      .then(groupBySections)
      .then(parseSectionLines);

  const enumEntries = errorSections.map(section =>
    section.errorCodes.map(
      // tslint:disable-next-line: max-line-length
      errorCode => `  /** ${section.description}: [${errorCode.severity}] ${errorCode.code} */\n  ${errorCode.constant} = '${errorCode.sqlstate}',`,
    ),
  );

  const allEntries = lodashFlatten(enumEntries);

  return [
    '// tslint:disable:max-line-length',
    '',
    'export enum PostgresError {',
    allEntries.join('\n'),
    '}',
    '',
  ].join('\n');
};

const writeEnum = (enumString: string) => {
  writeFileSync(join(__dirname, '../src/PostgresError.ts'), enumString);
};

getEnum().then(writeEnum);
