import type { Meta, StoryObj } from '@storybook/react-vite';
import { OfferProposedModal } from './OfferProposedModal';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/internal/preview-api';

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
  render: (args) => {
    const [{ isOpen }, updateArgs] = useArgs();

    const handleClose = () => {
      args.onClose?.();
      updateArgs({ isOpen: false });
    };

    return <OfferProposedModal {...args} isOpen={isOpen} onClose={handleClose} />;
  },
};
