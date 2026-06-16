import { Meta, StoryObj } from '@storybook/react-vite';
import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'shared/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  args: {
    isOpen: true,
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const DefaultList: Story = {
  args: {
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '4px' }}>
        <button style={{ cursor: 'pointer', padding: '6px 12px' }}>Мужской</button>
        <button style={{ cursor: 'pointer', padding: '6px 12px' }}>Женский</button>
      </div>
    ),
  },
};

export const LargeContentCalendar: Story = {
  args: {
    children: (
      <div
        style={{
          width: '280px',
          height: '200px',
          backgroundColor: '#eee7f7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '4px',
          fontWeight: 'bold',
        }}
      >
        📅 Здесь Календарь
      </div>
    ),
  },
};

export const WithCategoriesList: Story = {
  render: (args) => (
    <Dropdown {...args}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '8px 12px',
        }}
      >
        {/* === РАЗДЕЛ 1 === */}
        <section>
          <h3
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: '500',
              fontSize: '1.5rem',
              lineHeight: '28px',
              letterSpacing: '-0.011em',
              margin: '0 0 8px 0',
              color: '#253017',
            }}
          >
            Бизнес и карьера
          </h3>

          <ul
            style={{
              listStyle: 'none',
              padding: '0',
              margin: '0',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <li
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontWeight: '400',
                fontSize: '1rem',
                lineHeight: '24px',
                letterSpacing: '0.02em',
                color: '#508826',
                cursor: 'pointer',
              }}
            >
              Управление командой
            </li>
            <li
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontWeight: '400',
                fontSize: '1rem',
                lineHeight: '24px',
                letterSpacing: '0.02em',
                color: '#508826',
                cursor: 'pointer',
              }}
            >
              Маркетинг и реклама
            </li>
          </ul>
        </section>

        {/* === РАЗДЕЛ 2 === */}
        <section>
          <h3
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: '500',
              fontSize: '1.5rem',
              lineHeight: '28px',
              letterSpacing: '-0.011em',
              margin: '0 0 8px 0',
              color: '#253017',
            }}
          >
            Творчество и искусство
          </h3>
          <ul
            style={{
              listStyle: 'none',
              padding: '0',
              margin: '0',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <li
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontWeight: '400',
                fontSize: '1rem',
                lineHeight: '24px',
                letterSpacing: '0.02em',
                color: '#508826',
                cursor: 'pointer',
              }}
            >
              Фотография
            </li>
            <li
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontWeight: '400',
                fontSize: '1rem',
                lineHeight: '24px',
                letterSpacing: '0.02em',
                color: '#508826',
                cursor: 'pointer',
              }}
            >
              Видеомонтаж
            </li>
          </ul>
        </section>
      </div>
    </Dropdown>
  ),
};
