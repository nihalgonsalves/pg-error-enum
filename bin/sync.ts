/* eslint-disable import/no-extraneous-dependencies */

import { writeFileSync } from 'fs';
import { join } from 'path';

import fetch from 'cross-fetch';
import * as z from 'zod';

const sourceUrl = (branch = 'master') =>
  `https://github.com/postgres/postgres/raw/${branch}/src/backend/utils/errcodes.txt`;

const getSourceText = (): Promise<string[]> =>
  fetch(sourceUrl())
    .then((response) => response.text())
    .then((text) => text.split('\n'));

const stripCommentsAndEmptyLines = (lines: string[]) =>
  lines.filter((line) => line !== '' && line.charAt(0) !== '#');

const sectionRegex = /^Section:\s(?<description>.*)$/;
const SectionMatchGroups = z.object({ description: z.string().optional() });

type Section = { description: string; lines: string[] };

const groupBySections = (lines: string[]): Section[] => {
  const sections: Record<string, Section> = {};
  let currentSection = '';

  lines.forEach((line) => {
    const matches = sectionRegex.exec(line);
    const description = matches?.groups
      ? SectionMatchGroups.parse(matches.groups).description
      : undefined;

    if (description) {
      currentSection = description;
      sections[currentSection] = {
        description: currentSection,
        lines: [],
      };
    } else {
      sections[currentSection]?.lines.push(line);
    }
  });

  return Object.values(sections);
};

const errorLineRegex = /^(?<sqlstate>[A-Z0-9]*)\s*(?<severity>[EWS])\s*ERRCODE_(?<constant>[A-Z_]*)\s*(?<code>[a-z_]*)$/;
const ErrorLineMatchGroups = z.object({
  sqlstate: z.string(),
  severity: z.string(),
  constant: z.string(),
  code: z.string(),
});

const parseErrorLine = (line: string) => {
  const matches = errorLineRegex.exec(line);

  if (!matches?.groups) {
    throw new Error(`Error parsing error line:\n\t"${line}"`);
  }

  const { sqlstate, severity, constant, code } = ErrorLineMatchGroups.parse(
    matches.groups,
  );

  return {
    sqlstate,
    severity,
    constant,
    code,
  };
};

const parseSectionLines = (data: Section[]) =>
  data.map(({ lines, ...otherData }) => ({
    errorCodes: lines.map(parseErrorLine),
    ...otherData,
  }));

const getEnum = async () => {
  const errorSections = await getSourceText()
    .then(stripCommentsAndEmptyLines)
    .then(groupBySections)
    .then(parseSectionLines);

  return [
    '/* eslint-disable max-len */',
    '',
    'export enum PostgresError {',
    errorSections
      .flatMap((section) =>
        section.errorCodes.map(
          (errorCode) =>
            `  /** ${section.description}: [${errorCode.severity}] ${errorCode.code} */\n  ${errorCode.constant} = '${errorCode.sqlstate}',`,
        ),
      )
      .join('\n'),
    '}',
    '',
  ].join('\n');
};

const writeEnum = (enumString: string) => {
  writeFileSync(join(__dirname, '../src/PostgresError.ts'), enumString);
};

void getEnum()
  .then(writeEnum)
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  });
