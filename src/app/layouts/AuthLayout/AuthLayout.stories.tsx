import type { Meta, StoryObj } from '@storybook/react-vite';
import { Routes, Route } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';

const meta: Meta<typeof AuthLayout> = {
  title: 'App/AuthLayout',
  component: AuthLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof AuthLayout>;

export const Default: Story = {
  render: () => (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route
          path="*"
          element={<div style={{ padding: '2rem' }}>Контент страницы (Outlet)</div>}
        />
      </Route>
    </Routes>
  ),
};
