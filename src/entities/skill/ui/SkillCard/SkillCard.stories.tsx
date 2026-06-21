import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { SkillCard } from './SkillCard';

const meta: Meta<typeof SkillCard> = {
  title: 'Entities/SkillCard',
  component: SkillCard,
  parameters: {
    layout: 'padded',
  },
  args: {
    title: 'Игра на барабанах',
    category: 'Творчество и искусство / Музыка и звук',
    description:
      'Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без партитуры',
    onEditButtonClick: fn(),
    onConfirmEditButtonClick: fn(),
    onSendOfferButtonClick: fn(),
    images: [
      '/images/skill-drums/3.jpg',
      '/images/skill-drums/2.jpg',
      '/images/skill-drums/4.jpg',
      '/images/skill-drums/1.jpg',
      '/images/skill-drums/3.jpg',
      '/images/skill-drums/2.jpg',
      '/images/skill-drums/4.jpg',
    ],
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
