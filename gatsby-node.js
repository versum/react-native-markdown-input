// eslint-disable-next-line import/no-commonjs
exports.onCreateWebpackConfig = (args) => {
  args.actions.setWebpackConfig({
    resolve: {
      alias: {
        'react-native': 'react-native-web',
      },
    },
  });
};
