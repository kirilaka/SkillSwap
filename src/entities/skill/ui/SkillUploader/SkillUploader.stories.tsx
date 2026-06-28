import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkillUploader } from './SkillUploader';

const meta: Meta<typeof SkillUploader> = {
  title: 'Entities/Skill/SkillUploader',
  component: SkillUploader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SkillUploader>;

/** По умолчанию */
export const Default: Story = {
  args: {
    className: '',
  },
};
