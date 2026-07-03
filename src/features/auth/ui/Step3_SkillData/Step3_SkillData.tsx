import { Input } from '@/shared/ui/Input/Input';
import { DdInputSelect } from '@/shared/ui/DropdownInput';
import { SkillUploader } from '@/entities/skill/ui/SkillUploader';
import { Button } from '@/shared/ui/Button/Button';
import { SkillCard } from '@/entities/skill/ui/SkillCard/SkillCard';
import { Modal } from '@/shared/ui/Modal/Modal';
import clsx from 'clsx';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import styles from './Step3_SkillData.module.scss';
import SchoolBoard from 'shared/assets/images/school-board.svg';
import { ProfileFormData } from '../../model/types';
import { skillsFilterList } from '@/features/filtration/models/artFilter';
import DoneIcon from '@/shared/ui/Icons/DoneIcon/DoneIcon.svg';
import { SKILL_CATEGORIES } from '@/shared/lib/constants';
import { SkillType } from '@/shared/types';
import { fileToBase64 } from '@/shared/lib/helpers';

interface Step3_SkillDataProps {
  /**Сабмит при клике на кнопку*/
  onSubmit: (data: ProfileFormData) => void;
  /**Доп.классы */
  className?: string;
  /**Обработчик клика по кнопке назад*/
  onPrevButtonClick?: () => void;
}

// TL - Компонент решил временно не разделять, так как дедлайн очень близко

export const Step3_SkillData = ({
  onSubmit,
  className,
  onPrevButtonClick,
}: Step3_SkillDataProps) => {
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    birthDate: undefined,
    genderId: null,
    cityId: null,
    categoryId: { teach: null, learn: null },
    subcategoryId: { teach: null, learn: null },
    avatar: null,
    skillTitle: '',
    skillDescription: '',
    skillImageUrl: null,
  });

  const CategorySkillChange = (id: string | null) => {
    setFormData((prev) => ({
      ...prev,
      categoryId: {
        ...prev.categoryId,
        teach: id,
      },
      subcategoryId: {
        ...prev.subcategoryId,
        teach: null,
      },
    }));
  };
  const subCategorySkillChange = (id: string | null) => {
    setFormData((prev) => ({
      ...prev,
      subcategoryId: {
        ...prev.subcategoryId,
        teach: id,
      },
    }));
  };
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      skillDescription: value,
    }));
  };
  const handleSkillNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      skillTitle: value,
    }));
  };

  const handleFilesChange = useCallback(async (files: File[]) => {
    const imageUrls = await Promise.all(files.map((file) => fileToBase64(file)));

    setFormData((prev) => ({
      ...prev,
      skillImageUrl: imageUrls,
    }));
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsPreviewModalOpen(true);
  };

  const isFormValid =
    formData.skillTitle.trim() !== '' &&
    formData.categoryId.teach !== null &&
    formData.categoryId.teach !== '' &&
    formData.subcategoryId.teach !== null &&
    formData.subcategoryId.teach !== '' &&
    formData.skillDescription.trim() !== '' &&
    formData.skillImageUrl?.length &&
    formData.skillImageUrl.length >= 1 &&
    formData.skillImageUrl.length <= 5;

  const selectedCategoryData = skillsFilterList.find((cat) => cat.id === formData.categoryId.teach);
  const currentSubCategories = selectedCategoryData ? selectedCategoryData.subFilters : [];

  const displaySubCategory =
    currentSubCategories?.find((s) => s.id === formData.subcategoryId.teach)?.label || '';

  return (
    <div className={clsx(styles.page, className)}>
      <form onSubmit={handleSubmit} className={clsx(className, styles.form)}>
        <div className={styles.nameSkils}>
          <label className={styles.nameSkillLabel}>Название навыка</label>
          <Input
            value={formData.skillTitle}
            onChange={handleSkillNameChange}
            placeholder="Введите название вашего навыка"
          />
        </div>
        <div className={styles.categorySkils}>
          <label className={styles.nameSkillLabel}>Категория навыка</label>
          <DdInputSelect
            items={skillsFilterList.map((cat) => ({ id: String(cat.id), label: cat.label }))}
            onSelectItem={CategorySkillChange}
            placeholder="Выберите категорию навыка"
          />
        </div>
        <div className={styles.subcategorySkils}>
          <label className={styles.nameSkillLabel}>Подкатегория навыка</label>
          <DdInputSelect
            items={
              currentSubCategories
                ? currentSubCategories.map((sub) => ({ id: String(sub.id), label: sub.label }))
                : []
            }
            onSelectItem={subCategorySkillChange}
            placeholder="Выберите подкатегорию навыка"
            disabled={!formData.categoryId.teach}
          />
        </div>
        <div className={styles.description}>
          <label className={styles.nameSkillLabel}>Описание</label>
          <textarea
            className={styles.textarea}
            value={formData.skillDescription}
            onChange={handleDescriptionChange}
            placeholder="Коротко опишите, чему можете научить"
            rows={4}
          />
        </div>

        <div className={styles.uploaderWrapper}>
          <SkillUploader onFilesChange={handleFilesChange} />
        </div>
        <div className={styles.actionsButton}>
          <Button type="button" buttonType="secondary" onClick={onPrevButtonClick}>
            Назад
          </Button>

          <Button type="submit" className={styles.continueButton} disabled={!isFormValid}>
            Продолжить
          </Button>
        </div>
      </form>
      <section className={styles.infoSection}>
        <img src={SchoolBoard} alt="" aria-hidden={true} />
        <div className={styles.heroContent}>
          <h2 className={styles.title}>Укажите, чем вы готовы поделиться</h2>
          <p className={styles.description}>
            Так другие люди смогут увидеть ваши предложения и предложить вам обмен!
          </p>
        </div>
      </section>
      <Modal isOpen={isPreviewModalOpen} onClose={() => setIsPreviewModalOpen(false)}>
        <SkillCard
          className={styles.previewModal}
          cardVariant="editable"
          skill={{
            id: '',
            title: formData.skillTitle || 'Название навыка не указано',
            description: formData.skillDescription || 'Описание отсутствует',
            type: 'teach' as SkillType,

            category: String(formData.categoryId.teach || '') as unknown as SKILL_CATEGORIES,

            categoryId: String(formData.categoryId.teach || ''),
            subcategory: displaySubCategory || '',
            subcategoryId: String(formData.subcategoryId.teach || ''),
            tags: [],
            imageUrl: formData.skillImageUrl,
            authorId: '',
            createdAt: '',
          }}
          onEditButtonClick={() => setIsPreviewModalOpen(false)}
          onConfirmEditButtonClick={() => {
            setIsPreviewModalOpen(false);
            setIsSuccessModalOpen(true);
            onSubmit(formData);
          }}
        />
      </Modal>
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        className={styles.modalWindownSuccessfully}
      >
        <div className={styles.iconDoneBox}>
          <img src={DoneIcon} alt="" className={styles.iconDone} />
        </div>
        <div className={styles.modalContent}>
          <div className={styles.modalText}>
            <h3 className={styles.modalTitle}>Ваше предложение создано</h3>
            <p className={styles.modalSuccessText}>Теперь вы можете предложить обмен</p>
          </div>

          <div className={styles.modalActions}>
            <Button
              type="button"
              className={styles.buttonActions}
              onClick={() => {
                setIsSuccessModalOpen(false);
              }}
            >
              Готово
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
