import { defineConfig } from "eslint/config";

// eslint-disable-next-line import/extensions
import sharedConfig from "@nihalgonsalves/esconfig/eslint.config.shared.js";

export default defineConfig(
  { ignores: ["package-test", "dist"] },
  ...sharedConfig,
  {
    rules: {
      "@typescript-eslint/no-duplicate-enum-values": "off",
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        { allowNumber: true },
      ],
    },
  },
);
