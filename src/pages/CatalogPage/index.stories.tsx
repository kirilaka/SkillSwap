import type { Meta, StoryObj } from '@storybook/react-vite';
import CatalogPage from '.';

const meta = {
  // здесь Pages т.к. компонент CatalogPage находится в пааке src/pages
  title: 'Pages/CatalogPage',
  component: CatalogPage,
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof CatalogPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
