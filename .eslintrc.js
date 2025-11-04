module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js',"app.e2e-spec.ts"],
    rules: {
        "no-multiple-empty-lines": [1, { "max": 1 }], //最多一个空行
        "semi": [1, "always"],//语句强制分号结尾        

        'prettier/prettier': 'off',
        "no-trailing-spaces": 1,
        "@typescript-eslint/no-namespace": "off",
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/parser": "off",
        "@typescript-eslint/no-empty-function": "off"
    },
};
