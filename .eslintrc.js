module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    // "extends": [
    //     "eslint:recommended",
    //     "plugin:@typescript-eslint/recommended"
    // ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module",
        parser: "@typescript-eslint/parser",
        project: "./tsconfig.json",
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "ignorePatterns": ['*.js'],
    "rules": {
        // Most of these are disabled because jree or minecraft dont follow them.
        "prefer-const": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-floating-promises": "error"
    },
};
