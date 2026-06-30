import type { Meta, StoryObj } from '@storybook/react-vite';
import { Step2_PersonalData } from './Step2_PersonalData';

const meta = {
  title: 'Features/auth/Step2_PersonalData',
  component: Step2_PersonalData,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Step2_PersonalData>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: (data) => {
      console.log(data);
    },
  },
};
