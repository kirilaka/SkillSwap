import type { Meta, StoryObj } from '@storybook/react-vite';
import { OfferCreatedModal } from './OfferCreatedModal';
import { useArgs } from 'storybook/internal/preview-api';
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
  render: (args) => {
    const [{ isOpen }, updateArgs] = useArgs();

    const handleClose = () => {
      args.onClose?.();
      updateArgs({ isOpen: false });
    };

    return <OfferCreatedModal {...args} isOpen={isOpen} onClose={handleClose} />;
  },
};
