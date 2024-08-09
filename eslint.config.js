/* eslint-disable @typescript-eslint/no-var-requires */
const { fixupConfigRules } = require("@eslint/compat");
const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");
const tseslint = require("typescript-eslint");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = tseslint.config(
  { ignores: ["dist"] },
  // @ts-expect-error type mismatch
  ...fixupConfigRules(
    compat.extends("./node_modules/@nihalgonsalves/esconfig/.eslintrc"),
  ),
  {
    languageOptions: {
      parserOptions: {
        project: undefined,
        projectService: true,
      },
    },
    rules: {
      "@typescript-eslint/no-duplicate-enum-values": "off",
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        { allowNumber: true },
      ],
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: ["**/*.test.{js,jsx,ts,tsx}", "eslint.config.js"],
        },
      ],
      // typescript
      "no-undef": "off",
    },
  },
);
