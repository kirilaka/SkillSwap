import { Meta, StoryObj } from '@storybook/react-vite';
import { RegisterPage } from './RegisterPage';

const meta: Meta<typeof RegisterPage> = {
  title: 'Pages/RegisterPage',
  component: RegisterPage,
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof RegisterPage>;

export const Default: Story = {};
