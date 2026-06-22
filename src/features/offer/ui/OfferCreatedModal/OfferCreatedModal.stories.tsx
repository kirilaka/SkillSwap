import type { Meta, StoryObj } from '@storybook/react-vite';
import { OfferCreatedModal } from './OfferCreatedModal';
import { fn } from 'storybook/test';

const meta: Meta<typeof OfferCreatedModal> = {
  title: 'features/offer/OfferCreatedModal',
  component: OfferCreatedModal,
  tags: ['autodocs'],
  args: {
    isOpen: true,
    onClose: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof OfferCreatedModal>;

export const Normal: Story = {
  args: {
    isOpen: true,
  },
};
