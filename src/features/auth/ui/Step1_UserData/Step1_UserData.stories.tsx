import type { Meta, StoryObj } from '@storybook/react-vite';
import { Step1_UserData } from './Step1_UserData';

const meta: Meta<typeof Step1_UserData> = {
  title: 'Features/auth/Step1_UserData',
  component: Step1_UserData,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Step1_UserData>;

export const Default: Story = {};
