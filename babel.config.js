module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['module:@react-native/babel-preset', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@virtualswitch': './src/',
            '@assets': './assets',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
