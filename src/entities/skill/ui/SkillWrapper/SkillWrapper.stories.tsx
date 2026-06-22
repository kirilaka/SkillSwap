import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkillWrapper } from './SkillWrapper';
import { LifestyleIcon } from '@/shared/ui/Icons/LifestyleIcon/LifestyleIcon';

const meta: Meta<typeof SkillWrapper> = {
  title: 'Shared/SkillWrapper',
  component: SkillWrapper,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof SkillWrapper>;

export const Text: Story = {
  args: {
    skillCategory: 'business',
    variant: 'text',
    children: 'Business',
  },
};

export const Icon: Story = {
  args: {
    skillCategory: 'health',
    variant: 'icon',
    children: <LifestyleIcon />,
  },
};

export const Categories: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <SkillWrapper skillCategory="business" variant="text">
        Business
      </SkillWrapper>
      <SkillWrapper skillCategory="art" variant="text">
        Art
      </SkillWrapper>
      <SkillWrapper skillCategory="language" variant="text">
        Language
      </SkillWrapper>
      <SkillWrapper skillCategory="education" variant="text">
        Education
      </SkillWrapper>
      <SkillWrapper skillCategory="home" variant="text">
        Home
      </SkillWrapper>
      <SkillWrapper skillCategory="health" variant="text">
        Health
      </SkillWrapper>
      <SkillWrapper skillCategory="more" variant="text">
        More
      </SkillWrapper>
    </div>
  ),
};
