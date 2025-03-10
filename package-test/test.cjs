const { PostgresError } = require("pg-error-enum");

const main = () => {
  console.log("Got code for UNIQUE_VIOLATION", PostgresError.UNIQUE_VIOLATION);

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
