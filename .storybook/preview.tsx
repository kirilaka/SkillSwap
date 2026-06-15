import type { Preview } from '@storybook/react-vite';
import '../src/app/styles/global.scss';
import { MemoryRouter } from 'react-router-dom';

const preview: Preview = {
  tags: ['autodocs'],

  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    actions: {
      argTypesRegex: '^on[A-Z].*',
    },
  },
};

export default preview;
