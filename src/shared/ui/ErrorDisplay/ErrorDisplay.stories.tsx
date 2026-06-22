import { Meta, StoryObj } from '@storybook/react-vite';
import { ErrorDisplay } from './ErrorDisplay';
import { type ErrorCode } from './types';

const meta: Meta<typeof ErrorDisplay> = {
  title: 'Shared/ErrorDisplay',
  component: ErrorDisplay,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    errorCode: {
      control: { type: 'radio', options: ['404', '500'] },
      defaultValue: '404',
    },
    onSendButtonClick: {
      action: 'onSendButtonClick',
    },
    onClick: {
      action: 'onClick',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorDisplay>;

export const ErrorCode404: Story = {
  args: {
    errorCode: '404' as ErrorCode,
  },
};

export const ErrorCode500: Story = {
  args: {
    errorCode: '500' as ErrorCode,
  },
};
