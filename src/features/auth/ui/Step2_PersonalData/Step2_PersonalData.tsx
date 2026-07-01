import clsx from 'clsx';
import styles from './Step2_PersonalData.module.scss';
import UserInfo from 'shared/assets/images/user-info.svg';
import AddIcon from 'shared/assets/images/Add.svg';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Input } from '@/shared/ui/Input/Input';
import { DdInputSelect } from '@/shared/ui/DropdownInput';
import { DdInputCheckbox } from '@/shared/ui/DropdownInput';
import { Button } from '@/shared/ui/Button/Button';
import { DatePicker } from '@/shared/ui/DatePicker/DatePicker';
import { cities } from 'src/entities/city/model/constants';
import { skillsFilterList } from '@/features/filtration/models/artFilter';
import { ProfileFormData } from '../../model/types';
import React, { useState } from 'react';

export const genders = [
  { id: 'male', label: 'Мужской' },
  { id: 'female', label: 'Женский' },
];

interface DropdownItem {
  id: string;
  label: string;
}

interface Step2_PersonalDataProps {
  /**Доп.классы */
  className?: string;
  /**Сабмит при клике на кнопку*/
  onSubmit: (data: ProfileFormData) => void;
  /**Обработчик клика по кнопке назад*/
  onPrevButtonClick?: () => void;
}

export const Step2_PersonalData = ({
  className,
  onSubmit,
  onPrevButtonClick,
}: Step2_PersonalDataProps) => {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    birthData: undefined,
    genderId: null,
    citiId: null,
    categoryId: null,
    subcategoryId: null,
    avatar: null,
  });
  const allSubcategories: DropdownItem[] = skillsFilterList.flatMap(
    (category) =>
      category?.subFilters?.map((subcategory) => ({
        id: subcategory.id,
        label: subcategory.label,
      })) ?? [],
  );

  const selectedCategory = skillsFilterList.find((category) => category.id === formData.categoryId);

  const selectedSubcategoryCategory = skillsFilterList.find((category) =>
    category.subFilters?.some((subcategory) => subcategory.id === formData.subcategoryId),
  );

  const categoryItems: DropdownItem[] =
    formData.subcategoryId && selectedSubcategoryCategory
      ? [
          {
            id: selectedSubcategoryCategory.id,
            label: selectedSubcategoryCategory.label,
          },
        ]
      : skillsFilterList.map((category) => ({
          id: category.id,
          label: category.label,
        }));

  const subcategoryItems: DropdownItem[] =
    formData.categoryId && selectedCategory
      ? (selectedCategory?.subFilters?.map((subcategory) => ({
          id: subcategory.id,
          label: subcategory.label,
        })) ?? [])
      : allSubcategories;
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };
  const handleBirthChange = (date?: Date) => {
    setFormData((prev) => ({
      ...prev,
      birthData: date,
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
            <DatePicker
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
          <DdInputSelect
            items={cities.map((city) => ({
              id: city.id,
              label: city.name,
            }))}
            placeholder="Не указан"
            onSelectItem={handleCitiChange}
          />
        </label>
        <label className={styles.label}>
          Категория навыка, которому хотите научиться
          <DdInputCheckbox
            items={categoryItems}
            placeholder="Выберите категорию"
            onSelectItem={(id) => setFormData((prev) => ({ ...prev, categoryId: id }))}
          />
        </label>
        <label className={styles.label}>
          Подкатегория навыка, которому хотите научиться
          <DdInputCheckbox
            items={subcategoryItems}
            placeholder="Выберите подкатегорию"
            onSelectItem={(id) => setFormData((prev) => ({ ...prev, subcategoryId: id }))}
          />
        </label>

        <div className={styles.buttons}>
          <Button type="button" onClick={onPrevButtonClick}>
            Назад
          </Button>
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
