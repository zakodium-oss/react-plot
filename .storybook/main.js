export default {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: ['@storybook/addon-links', '@storybook/addon-docs'],

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
