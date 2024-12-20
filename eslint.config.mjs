import globals from "globals";
import js from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,

  {
    languageOptions: { globals: globals.browser },
    rules: {
      "prefer-const": "warn",
      "no-constant-binary-expression": "error",
      "semi": ["error", "always"],
      "quotes": [2, "double"],
    }
  },

];