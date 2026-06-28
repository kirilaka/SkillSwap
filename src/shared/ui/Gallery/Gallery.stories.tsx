import type { Meta, StoryObj } from '@storybook/react-vite';
import { Gallery } from './Gallery';

const meta = {
  title: 'UI/Gallery',
  component: Gallery,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Gallery>;

export default meta;
type Story = StoryObj<typeof meta>;

// Цветные заглушки
const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];

const ImagePlaceholder = ({ index }: { index: number }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: colors[index % colors.length],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '48px',
      color: '#fff',
      fontWeight: 'bold',
    }}
  >
    {index + 1}
  </div>
);

const renderImages = (count: number) =>
  Array.from({ length: count }).map((_, i) => <ImagePlaceholder key={i} index={i} />);

export const With4Images: Story = {
  args: { children: renderImages(4) },
};

export const With6Images: Story = {
  args: { children: renderImages(6) },
};

export const With7Images: Story = {
  args: { children: renderImages(7) },
};

export const With1Image: Story = {
  args: { children: renderImages(1) },
};

export const Empty: Story = {
  args: { children: [] },
};
