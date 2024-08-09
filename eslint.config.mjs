import tseslint from "typescript-eslint";

// eslint-disable-next-line import/extensions
import sharedConfig from "@nihalgonsalves/esconfig/eslint.config.shared.js";

export default tseslint.config({ ignores: ["dist"] }, ...sharedConfig, {
  rules: {
    "@typescript-eslint/no-duplicate-enum-values": "off",
    "@typescript-eslint/restrict-template-expressions": [
      "error",
      { allowNumber: true },
    ],
  },
});
