import type { Meta, StoryObj } from '@storybook/react-vite';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './MainLayout';

const meta: Meta<typeof MainLayout> = {
  title: 'App/MainLayout',
  component: MainLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof MainLayout>;

export const Default: Story = {
  render: () => (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="*"
          element={<div style={{ padding: '2rem' }}>Контент страницы (Outlet)</div>}
        />
      </Route>
    </Routes>
  ),
};
