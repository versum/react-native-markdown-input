module.exports = {
  git: {
    requireUpstream: false,
    tag: true,
    tagName: '${version}',
    commit: true,
    commitMessage: 'chore(:bookmark:): react-native-markdown-input ${version}',
  },
  github: {
    release: true,
    releaseName: 'react-native-markdown-input@${version}',
    draft: false,
  },
  npm: {
    publish: false,
  },
  plugins: {
    '@release-it/conventional-changelog': {
      preset: 'angular',
      infile: 'CHANGELOG.md',
    },
  },
};
