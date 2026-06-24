import { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './ProfileContent.module.scss';
import { User } from '@/entities/user/model/types';
import { Box } from '@/shared/ui/Box/Box';
import { Input } from '@/shared/ui/Input/Input';
import { UserAvatar } from '@/entities/user/ui/UserAvatar/UserAvatar';
import { GalleryEditIcon } from '@/shared/ui/Icons/GalleryEditIcon/GalleryEditIcon';
import { EditIcon } from '@/shared/ui/Icons/EditIcon/EditIcon';
import { Button } from '@/shared/ui/Button/Button';
import { ControlChip } from '@/shared/ui/ControlChip/ControlChip';
import { DdInputSelect } from '@/shared/ui/DropdownInput';

interface ProfileContentProps {
  user: User | null;
  className?: string;
}

export type ProfileContentUser = User & {
  description?: string;
  city?: string;
  birthday?: string;
  gender?: 'male' | 'female' | '';
};

interface DropdownItem {
  id: string;
  label: string;
}

const genderItems: DropdownItem[] = [
  { id: 'male', label: 'Мужской' },
  { id: 'female', label: 'Женский' },
];

const cityItems: DropdownItem[] = [
  { id: 'moscow', label: 'Москва' },
  { id: 'spb', label: 'Санкт-Петербург' },
  { id: 'kazan', label: 'Казань' },
];

const toProfileUser = (user: User | null): ProfileContentUser | null =>
  user ? (user as ProfileContentUser) : null;

export const ProfileContent = ({ user, className }: ProfileContentProps) => {
  const profileUser = toProfileUser(user);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    if (!profileUser) return;

    setName(profileUser.name || '');
    setEmail(profileUser.email || '');
    setDescription(profileUser.description || '');
    setBirthday(profileUser.birthday || '');
    setGender(profileUser.gender || '');
    setCity(profileUser.city || '');
    setAvatarUrl(profileUser.avatarUrl);
    setPassword('');
    setIsPasswordVisible(false);
  }, [profileUser]);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handleBirthdayChange = (e: ChangeEvent<HTMLInputElement>) => setBirthday(e.target.value);
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const foundItem = cityItems.find(
      (item) => item.label.toLowerCase() === value.toLowerCase() || item.id === value,
    );
    setCity(foundItem ? foundItem.id : value);
  };

  const handleGenderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const foundItem = genderItems.find(
      (item) => item.label.toLowerCase() === value.toLowerCase() || item.id === value,
    );
    if (foundItem) {
      setGender(foundItem.id as 'male' | 'female');
    }
  };

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);
  const handleGalleryClick = () => fileInputRef.current?.click();

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Сохранение данных профиля:', {
      name,
      email,
      birthday,
      gender,
      city,
      description,
      avatarUrl,
      password: isPasswordVisible ? password : undefined,
    });
  };

  if (!profileUser) {
    return <Box className={clsx(styles.ProfileContent, className)}>Пользователь не найден</Box>;
  }

  const currentCityLabel = cityItems.find((item) => item.id === city)?.label || city;
  const currentGenderLabel = genderItems.find((item) => item.id === gender)?.label || '';

  return (
    <Box className={clsx(styles.ProfileContent, className)}>
      <form onSubmit={handleSubmit} className={styles.formSection}>
        <div className={styles.inputsGrid}>
          <div className={styles.fieldWrapper}>
            <label className={styles.fieldLabel}>Почта</label>
            <Input
              value={email}
              onChange={handleEmailChange}
              icon={<EditIcon />}
              iconPosition="right"
              type="email"
            />
          </div>

          <div className={styles.passwordSection}>
            <ControlChip
              label={isPasswordVisible ? 'Скрыть изменение пароля' : 'Изменить пароль'}
              onClick={togglePasswordVisibility}
              className={styles.passwordChip}
            />

            {isPasswordVisible && (
              <div className={styles.fieldWrapper}>
                <label className={styles.fieldLabel}>Новый пароль</label>
                <Input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Введите новый пароль"
                />
              </div>
            )}
          </div>

          <div className={styles.fieldWrapper}>
            <label className={styles.fieldLabel}>Имя</label>
            <Input
              value={name}
              onChange={handleNameChange}
              icon={<EditIcon />}
              iconPosition="right"
            />
          </div>

          <div className={clsx(styles.fieldWrapper, styles.halfWidthField)}>
            <label className={styles.fieldLabel}>Дата рождения</label>
            <Input type="date" value={birthday} onChange={handleBirthdayChange} />
          </div>

          <div className={clsx(styles.fieldWrapper, styles.halfWidthField)}>
            <label className={styles.fieldLabel}>Пол</label>
            <DdInputSelect
              placeholder="Ваш пол"
              items={genderItems}
              className={styles.genderInput}
              value={currentGenderLabel}
              onChange={handleGenderChange}
            />
          </div>

          <div className={styles.fieldWrapper}>
            <label className={styles.fieldLabel}>Город</label>
            <DdInputSelect value={currentCityLabel} onChange={handleCityChange} items={cityItems} />
          </div>

          <div className={styles.fieldWrapper}>
            <label className={styles.fieldLabel}>О себе</label>
            <div className={styles.textareaWrapper}>
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Расскажите о себе"
                className={styles.textareaField}
                rows={3}
              />
              <div className={styles.textareaIcon}>
                <EditIcon />
              </div>
            </div>
          </div>
        </div>

        <Button type="submit" buttonType="primary" className={styles.submitButton}>
          Сохранить изменения
        </Button>
      </form>

      <div className={styles.avatarSection}>
        <UserAvatar user={{ ...profileUser, avatarUrl }} className={styles.hideProfileName} />
        <button
          type="button"
          className={styles.galleryButton}
          aria-label="Изменить аватар"
          onClick={handleGalleryClick}
        >
          <GalleryEditIcon className={styles.galleryIcon} />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className={styles.hiddenFileInput}
          onChange={handleAvatarChange}
        />
      </div>
    </Box>
  );
};
