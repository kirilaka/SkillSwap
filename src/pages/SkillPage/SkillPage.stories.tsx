import type { Meta, StoryObj } from '@storybook/react-vite';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SkillPage from './index';
import { UserInfo, Skill } from '@/shared/types';

// ==========================================
// МОКОВЫЕ ДАННЫЕ
// ==========================================
const mockSkills: Skill[] = [
  {
    id: 'skill-4',
    title: 'Хочу научиться управлять командой',
    description:
      'Ищу наставника, который поможет освоить управление командой и развить лидерские качества.',
    type: 'teach', // Екатерина ХОЧЕТ научиться
    category: 'business',
    categoryId: '1',
    subcategory: 'Управление командой',
    subcategoryId: '1.1',
    tags: ['управление', 'лидерство', 'команда'],
    imageUrl: null,
    authorId: 'user-4',
    createdAt: '2026-02-04T09:00:00.000Z',
  },
];

const pageUser: UserInfo = {
  id: 'user-4',
  name: 'Екатерина',
  email: 'ekaterina.kozlov@example.com',
  avatarUrl: null,
  gender: 'female',
  createdAt: '2026-01-25T14:45:00.000Z',
  city: 'Екатеринбург',
  age: 26,
  description: 'Data Scientist, работаю с нейросетями.',
  skills: mockSkills,
};

const generalUsers: UserInfo[] = [
  pageUser,
  {
    id: 'user-5',
    name: 'Александр',
    email: 'alex@example.com',
    avatarUrl: null,
    gender: 'male',
    createdAt: '2026-02-01T12:00:00.000Z',
    city: 'Москва',
    age: 30,
    description: 'Team Lead с 5-летним опытом. Обучаю управлению.',
    skills: mockSkills,
  },
  {
    id: 'user-6',
    name: 'Дмитрий',
    email: 'dima@example.com',
    avatarUrl: null,
    gender: 'male',
    createdAt: '2026-02-02T10:00:00.000Z',
    city: 'Санкт-Петербург',
    age: 28,
    description: 'Project Manager. Поделюсь опытом лидерства.',
    skills: mockSkills,
  },
];

// ==========================================
// СБОРКА МОК-СТОРА
// ==========================================
const mockStore = configureStore({
  reducer: {
    skills: createSlice({
      name: 'skills',
      initialState: {
        items: mockSkills,
        currentSkill: mockSkills[0],
        isLoading: false,
        error: null,
      },
      reducers: {},
    }).reducer,
    users: createSlice({
      name: 'users',
      initialState: { items: generalUsers, currentUser: pageUser, isLoading: false, error: null },
      reducers: {},
    }).reducer,
  },
});

// ==========================================
// НАСТРОЙКА СТОРИБУКА
// ==========================================
const meta: Meta<typeof SkillPage> = {
  title: 'pages/SkillPage',
  component: SkillPage,
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <Story />
      </Provider>
    ),
    (Story) => {
      const navigate = useNavigate();

      useEffect(() => {
        navigate('/skills/skill-4', {
          state: { user: pageUser },
          replace: true,
        });
      }, [navigate]);

      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof SkillPage>;

export const Default: Story = {};
