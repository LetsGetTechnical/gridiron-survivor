import { addons } from '@storybook/manager-api';

addons.setConfig({
  sidebar: {
    showRoots: true,
    collapsedRoots: ['about', 'technical-planning-documents'],
  },
});
