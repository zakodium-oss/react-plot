module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  core: {
    builder: 'webpack5',
  },
  reactOptions: {
    fastRefresh: true,
    strictMode: true,
  },
  addons: [
    {
      name: '@storybook/addon-storysource',
      options: {
        loaderOptions: {
          injectStoryParameters: false,
        },
      },
    },
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  staticDirs: ['../stories/data'],
};
