/* eslint-env node */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PostgresError } = require("../dist");

const main = () => {
  console.log("Got code for UNIQUE_VIOLATION", PostgresError.UNIQUE_VIOLATION);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/no-unsafe-enum-comparison
  if (PostgresError.UNIQUE_VIOLATION !== "23505") {
    throw new Error("Failed");
  }

  console.log("OK");
};

try {
  main();
} catch (e) {
  console.error(e);
  process.exit(1);
}
