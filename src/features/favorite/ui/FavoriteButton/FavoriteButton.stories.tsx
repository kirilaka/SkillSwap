import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FavoriteButton } from './FavoriteButton';

const meta: Meta<typeof FavoriteButton> = {
  title: 'Features/Favorite/FavoriteButton',
  component: FavoriteButton,
  tags: ['autodocs'],
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

export const Default: Story = {
  args: {
    isFavorite: false,
  },
};

export const Favorite: Story = {
  args: {
    isFavorite: true,
  },
};

export const Interactive: Story = {
  args: {
    isFavorite: false,
  },
  render: function Render(args) {
    const [isFav, setIsFav] = useState(args.isFavorite);
    return <FavoriteButton {...args} isFavorite={isFav} onClick={() => setIsFav(!isFav)} />;
  },
};
