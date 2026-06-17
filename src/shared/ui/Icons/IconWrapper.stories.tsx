import { Meta, StoryObj } from '@storybook/react-vite';
import { IconWrapper } from './IconWrapper';

const meta: Meta<typeof IconWrapper> = {
  title: 'Shared/icons/IconWrapper',
  component: IconWrapper,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof IconWrapper>;

const PlaceholderIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10" />
  </svg>
);

export const Default: Story = {
  args: {
    children: <PlaceholderIcon />,
  },
};
