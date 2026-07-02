import type { Preview } from '@storybook/react-vite';
import '../src/app/styles/global.scss';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../src/store';

const preview: Preview = {
  tags: ['autodocs'],

  decorators: [
    (Story) => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
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
