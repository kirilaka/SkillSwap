import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkillWrapper } from './SkillWrapper';

const meta: Meta<typeof SkillWrapper> = {
  title: 'UI/SkillWrapper',
  component: SkillWrapper,
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
    skillCategory: 'business',
    variant: 'icon',
    children: '💼',
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
      <SkillWrapper skillCategory="cosiness" variant="text">
        Cosiness
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
