module.exports = {
  root: true,
  extends: '@react-native-community',
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto',
          },
        ],
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
};
