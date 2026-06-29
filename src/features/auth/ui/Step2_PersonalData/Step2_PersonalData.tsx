import clsx from 'clsx';
import styles from './Step2_PersonalData.module.scss';
import UserInfo from 'shared/assets/images/user-info.svg';
import AddIcon from 'shared/assets/images/Add.svg';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Input } from '@/shared/ui/Input/Input';
import { DdInputSelect } from '@/shared/ui/DropdownInput';
import { DdInputCheckbox } from '@/shared/ui/DropdownInput';
import { Button } from '@/shared/ui/Button/Button';
import React, { useState } from 'react';

interface DropdownItem {
  id: string;
  label: string;
}

interface Subcategory {
  id: string;
  label: string;
}

interface Category {
  id: string;
  label: string;
  subcategories: Subcategory[];
}
interface ProfileFormData {
  name: string;
  birthData: string;
  genderId: string | null;
  citiId: string | null;
  categoryId: string | null;
  subcategoryId: string | null;
  avatar: File | null;
}

interface Step2_PersonalDataProps {
  /**Доп.классы */
  className?: string;
  /** Массив полов для Dd */
  genders: DropdownItem[];
  /** Массив городов для Dd */
  cities: DropdownItem[];
  /** Массив категорий и подкатегорий для Dd */
  categories: Category[];
  /**Сабмит при клике на кнопку*/
  onSubmit: (data: ProfileFormData) => void;
}

export const Step2_PersonalData = ({
  genders,
  cities,
  categories,
  className,
  onSubmit,
}: Step2_PersonalDataProps) => {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    birthData: '',
    genderId: null,
    citiId: null,
    categoryId: null,
    subcategoryId: null,
    avatar: null,
  });

  const selectedCategory = categories.find((category) => category.id === formData.categoryId);
  const subcategories = selectedCategory?.subcategories ?? [];
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };
  const handleBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      birthData: e.target.value,
    }));
  };
  const handleGenderChange = (id: string | null) => {
    setFormData((prev) => ({
      ...prev,
      genderId: id,
    }));
  };
  const handleCitiChange = (id: string | null) => {
    setFormData((prev) => ({
      ...prev,
      citiId: id,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData((prev) => ({
      ...prev,
      avatar: file,
    }));
  };

  const avatarUrl = formData.avatar ? URL.createObjectURL(formData.avatar) : '';
  return (
    <div className={clsx(className, styles.page)}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.avatarContainer}>
          <label className={styles.avatar}>
            <Avatar src={avatarUrl} alt="Изображение пользователя" />
            <img className={styles.addIcon} src={AddIcon} alt="" aria-hidden="true" />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className={styles.fileInput}
            />
          </label>
        </div>
        <label className={styles.label}>
          Имя
          <Input placeholder="Введите ваше имя" value={formData.name} onChange={handleNameChange} />
        </label>
        <div className={styles.birthGenderRow}>
          <label className={clsx(styles.label, styles.date)}>
            Дата рождения
            <Input
              placeholder="дд.мм.гггг"
              value={formData.birthData}
              onChange={handleBirthChange}
            />
          </label>
          <label className={styles.label}>
            Пол
            <DdInputSelect
              items={genders}
              placeholder="Не указан"
              onSelectItem={handleGenderChange}
            />
          </label>
        </div>
        <label className={styles.label}>
          Город
          <DdInputSelect items={cities} placeholder="Не указан" onSelectItem={handleCitiChange} />
        </label>
        <label className={styles.label}>
          Категория навыка, которому хотите научиться
          <DdInputCheckbox
            items={categories}
            placeholder="Выберите категорию"
            onSelectItem={(id) =>
              setFormData((prev) => ({ ...prev, categoryId: id, subcategoryId: null }))
            }
          />
        </label>
        <label className={styles.label}>
          Подкатегория навыка, которому хотите научиться
          <DdInputCheckbox
            items={subcategories}
            placeholder="Выберите подкатегорию"
            onSelectItem={(id) => setFormData((prev) => ({ ...prev, subcategoryId: id }))}
          />
        </label>

        <div className={styles.buttons}>
          <Button type="button">Назад</Button>
          <Button type="submit" buttonType="primary">
            Продолжить
          </Button>
        </div>
      </form>
      <section className={styles.infoSection}>
        <img className={styles.image} src={UserInfo} alt="" aria-hidden="true" />
        <div className={styles.heroContent}>
          <h2 className={styles.title}>Расскажите немного о себе</h2>
          <p className={styles.description}>
            Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена
          </p>
        </div>
      </section>
    </div>
  );
};
