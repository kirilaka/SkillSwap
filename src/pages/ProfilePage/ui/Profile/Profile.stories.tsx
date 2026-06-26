import { Meta, StoryObj } from '@storybook/react-vite';
import { Profile } from './Profile';
import { saveAuthUser } from '@/features/auth/model/authUtils';

type AuthUserLike = { id: string; name: string; email: string; token: string };

const mockAuthUser: AuthUserLike = {
  id: '1',
  name: 'Иван',
  email: 'ivan@example.com',
  token: 'mock_token',
};

const meta: Meta<typeof Profile> = {
  title: 'Pages/ProfilePage/Profile',
  component: Profile,
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof Profile>;

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
