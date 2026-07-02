import { Meta, StoryObj } from '@storybook/react-vite';
import { saveAuthUser } from '@/features/auth/model/authUtils';
import ProfilePage from '.';

type AuthUserLike = { id: string; name: string; email: string; token: string };

const mockAuthUser: AuthUserLike = {
  id: '1',
  name: 'Иван',
  email: 'ivan@example.com',
  token: 'mock_token',
};

const meta: Meta<typeof ProfilePage> = {
  title: 'Pages/ProfilePage/Profile',
  component: ProfilePage,
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof ProfilePage>;

export const Default: Story = {
  decorators: [
    (Story) => {
      saveAuthUser(mockAuthUser);
      return <Story />;
    },
  ],
};

export const Empty: Story = {
  decorators: [
    (Story) => {
      localStorage.removeItem('user');
      return <Story />;
    },
  ],
};
