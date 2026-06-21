import type { Meta, StoryObj } from '@storybook/react-vite';
import { OfferProposedModal } from './OfferProposedModal';
import { fn } from 'storybook/test';

const meta: Meta<typeof OfferProposedModal> = {
  title: 'features/offer/OfferProposedModal',
  component: OfferProposedModal,
  tags: ['autodocs'],
  args: {
    isOpen: true,
    onClose: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof OfferProposedModal>;

export const Normal: Story = {
  args: {
    isOpen: true,
  },
};
