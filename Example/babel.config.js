module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@versum/react-native-markdown-input': '../src/index',
          },
        },
      ],
    ],
  };
};
