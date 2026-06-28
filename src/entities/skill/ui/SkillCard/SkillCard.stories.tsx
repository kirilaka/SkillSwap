import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import type { Skill } from '@/shared/types';
import { SkillCard } from './SkillCard';

const mockSkill: Skill = {
  id: '1',
  title: 'Уроки игры на барабанах',
  description:
    'Научу вас играть на барабанах с нуля. Разберем базовые ритмы, постановку рук и ног.',
  type: 'teach',
  category: 'art',
  tags: ['музыка', 'барабаны'],
  imageUrl: null,
  authorId: '123',
  createdAt: '2023-10-27',
  categoryId: '',
  subcategory: '',
  subcategoryId: '',
};

const meta: Meta<typeof SkillCard> = {
  title: 'Entities/SkillCard',
  component: SkillCard,
  parameters: {
    layout: 'padded',
  },
  args: {
    skill: mockSkill,
    onEditButtonClick: fn(),
    onConfirmEditButtonClick: fn(),
    onSendOfferButtonClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof SkillCard>;

export const Offer: Story = {
  args: {
    cardVariant: 'offer',
  },
};

export const Editable: Story = {
  args: {
    cardVariant: 'editable',
  },
};
