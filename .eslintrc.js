module.exports = {
  extends: ["react-app", "eslint:recommended", "plugin:react/recommended"],
  rules: {
    "no-nested-ternary": "error",
    "no-unneeded-ternary": "error",
    eqeqeq: "error",
    "no-else-return": ["error", { allowElseIf: false }],
    "react/display-name": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/prefer-regexp-exec": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "prefer-destructuring": "error",
    "react/jsx-no-useless-fragment": "error",
    "react/jsx-key": "error",
    "react/jsx-sort-props": "error",
  },
  settings: {
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
