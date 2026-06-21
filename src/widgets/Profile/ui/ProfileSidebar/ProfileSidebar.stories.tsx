import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProfileSidebar } from './ProfileSidebar';

const meta: Meta<typeof ProfileSidebar> = {
  title: 'widgets/Profile/ProfileSidebar',
  component: ProfileSidebar,
  decorators: [
    (Story) => (
      <div style={{ width: '292px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProfileSidebar>;

export const Normal: Story = {
  args: {},
};
