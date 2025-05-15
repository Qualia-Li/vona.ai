import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@typescript-eslint/recommended",
    // "plugin:prettier/recommended"
  ),
  {
    rules: {
      "react/no-unused-prop-types": "warn",
      "react/no-unescaped-entities": "warn",
      "react/self-closing-comp": ["error", { component: true, html: true }],
      "@typescript-eslint/no-unused-vars": ["warn", { 
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_"
      }],
      "@typescript-eslint/no-explicit-any": "error",
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
          alphabetize: { 
            order: "asc",
            caseInsensitive: true
          },
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
              position: "after"
            }
          ]
        }
      ]
    }
  }
];

export default eslintConfig;
