import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'shared/Modal',
  component: Modal,
  argTypes: {
    isOpen: { control: 'boolean' },
  },
  decorators: [
    (Story) => {
      if (!document.getElementById('modal-root')) {
        const portalRoot = document.createElement('div');
        portalRoot.setAttribute('id', 'modal-root');
        document.body.appendChild(portalRoot);
      }
      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Первая стори: модалка открыта (для статического просмотра в панели)
export const Opened: Story = {
  args: {
    isOpen: true,
    children: (
      <div>
        <h2>Заголовок модального окна</h2>
        <p>Это статическое состояние модального окна, отрендеренное через React Portal.</p>
      </div>
    ),
  },
};

// Вторая стори: интерактивная
export const Interactive: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <button onClick={() => setIsOpen(true)} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Открыть модальное окно
        </button>

        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <h3>Интерактивный тест</h3>
          <p>Попробуйте кликнуть на этот текст — окно останется на месте.</p>
          <p>Кликните на темный фон вокруг — окно плавно закроется!</p>
          <button onClick={() => setIsOpen(false)} style={{ marginTop: '15px' }}>
            Закрыть изнутри
          </button>
        </Modal>
      </div>
    );
  },
};
