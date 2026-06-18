import type { Meta, StoryObj } from '@storybook/react-vite';
import { SignUpProgress } from './SignUpProgress';

const meta: Meta<typeof SignUpProgress> = {
  title: 'Features/SignUpProgress',
  component: SignUpProgress,
  argTypes: {
    step: {
      control: 'radio',
      options: [1, 2, 3],
    },
  },
};

export default meta;

type Story = StoryObj<typeof SignUpProgress>;

export const Step1: Story = {
  args: {
    step: 1,
  },
};

export const Step2: Story = {
  args: {
    step: 2,
  },
};

export const Step3: Story = {
  args: {
    step: 3,
  },
};

export const AllSteps: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px' }}>
      <SignUpProgress step={1} />
      <SignUpProgress step={2} />
      <SignUpProgress step={3} />
    </div>
  ),
};
