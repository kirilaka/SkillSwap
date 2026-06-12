import type { Meta, StoryObj } from '@storybook/react-vite'

import { Header } from './Header'

const meta = {
  // пояснение к следующей строчке:
  // До '/':
  // указывать папку из src, где находится ваш компонент
  // После '/':
  // Вместо 'ExampleHeader' поставить название вашего компонента
  title: 'Stories/ExampleHeader',

  // в следующей строчке меняете Header на ваш компонент
  component: Header,
  parameters: {
    // для тестирования страницы целиком используем
    layout: 'fullscreen',

    // для тестирования отдельных компонентов, наприменр, кнопок
    // layout: 'centered',
  },

  //пропсы компонента по умолчанию
  args: {},
  // в следующей строчке меняете Header на ваш компонент
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

//конкретные состояния

export const LoggedIn: Story = {
  //пропсы для конкретного сториса
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
}

export const LoggedOut: Story = {}
