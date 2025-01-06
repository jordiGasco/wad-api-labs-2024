import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 2020, // Updated to fully support ES2020 (or use "latest")
      sourceType: "module", // Use module format
    },
    rules: {
      "semi": 1, // Warn for missing semicolons
      "no-console": "off", // Allow console.log statements
    },
  },
  pluginJs.configs.recommended, // Apply recommended ESLint rules
];
