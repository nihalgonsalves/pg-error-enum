# pg-error-enum

![npm version](https://img.shields.io/npm/v/pg-error-enum.svg)
![build status](https://github.com/nihalgonsalves/pg-error-enum/workflows/check/badge.svg)

TypeScript Enum for Postgres Errors with no runtime dependencies. Also compatible with plain JavaScript.

## Quick Start

### Installation

```sh
# Using npm
npm install --save pg-error-enum

# Using yarn
yarn add pg-error-enum
```

### Usage

```ts
import { PostgresError } from "pg-error-enum";
```

<details>
<summary>Legacy CommonJS</summary>

```js
const { PostgresError } = require("pg-error-enum");
```

</details>

Usage

```ts
if (error.code === PostgresError.UNIQUE_VIOLATION) {
  throw new Error("That username is taken");
}
```

## Generation

The Enum is generated directly from [errcodes.txt](https://github.com/postgres/postgres/blob/master/src/backend/utils/errcodes.txt) in the Postgres repository.

It follows the syntax defined in the text file, i.e., in short:

1. Lines beginning with `#` and empty lines are ignored.

2. Sections are parsed using:

   ```ts
   const sectionRegex = /^Section:\s(?<description>.*)$/;
   ```

3. Each error code is parsed using:

   ```ts
   const errorLineRegex =
     /^(?<sqlstate>[A-Z0-9]*)\s*(?<severity>[EWS])\s*ERRCODE_(?<constant>[A-Z_]*)\s*(?<code>[a-z_]*)$/;
   ```
