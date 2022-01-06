module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
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
};
