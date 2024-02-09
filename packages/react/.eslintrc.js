const { eslint } = require('@siberiacancode/eslint');

module.exports = {
  ...eslint.react,
  parserOptions: {
    ...eslint.react.parserOptions,
    tsconfigRootDir: __dirname
  },
  overrides: [
    ...eslint.react.overrides,
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'jsx-a11y/media-has-caption': 'off',
        'react-hooks/exhaustive-deps': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-floating-promises': 'off'
      }
    }
  ]
};
