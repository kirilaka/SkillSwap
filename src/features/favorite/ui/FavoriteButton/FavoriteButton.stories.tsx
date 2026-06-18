import type { Meta, StoryObj } from '@storybook/react-vite';
import { FavoriteButton } from './FavoriteButton';

const meta: Meta<typeof FavoriteButton> = {
  title: 'Features/Favorite/FavoriteButton',
  component: FavoriteButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isFavorite: {
      control: 'boolean',
      description: 'Состояние избранного',
    },
    onClick: {
      action: 'clicked',
      description: 'Обработчик клика',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FavoriteButton>;

/** Не в избранном — контурное сердечко */
export const Default: Story = {
  args: {
    isFavorite: false,
  },
};

/** В избранном — залитое сердечко */
export const Favorite: Story = {
  args: {
    isFavorite: true,
  },
};
