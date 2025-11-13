module.exports = [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
  parser: require("@typescript-eslint/parser"),
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.json"
      }
    },
    settings: { react: { version: "detect" } },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "off"
    }
  }
];
