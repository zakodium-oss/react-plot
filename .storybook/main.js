module.exports = {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],

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

  framework: {
    name: '@storybook/react-vite',

    options: {
      fastRefresh: true,
      strictMode: true,
    },
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};
