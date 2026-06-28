import { FC } from 'react';
import clsx from 'clsx';
import { Button } from '@/shared/ui/Button/Button';
import { LikeIcon } from '@/shared/ui/Icons/LikeIcon/LikeIcon';
import { ShareIcon } from '@/shared/ui/Icons/ShareIcon/ShareIcon';
import { MoreCircleIcon } from '@/shared/ui/Icons/MoreCircleIcon/MoreCircleIcon';
import { EditIcon } from '@/shared/ui/Icons/EditIcon/EditIcon';
import { Skill as SkillType } from '@/entities/skill/model/types';
import { Gallery } from '@/shared/ui/Gallery/Gallery';
import styles from './SkillCard.module.scss';

export interface SkillCardProps {
  /** Данные навыка */
  skill: SkillType;
  /** Вариант карточки */
  cardVariant?: 'offer' | 'editable';
  /** Обработчик клика по кнопке редактирования */
  onEditButtonClick?: () => void;
  /** Обработчик клика по кнопке подтверждения редактирования */
  onConfirmEditButtonClick?: () => void;
  /** Обработчик клика по кнопке отправки предложения */
  onSendOfferButtonClick?: () => void;
  /** Дополнительный класс */
  className?: string;
}

export const SkillCard: FC<SkillCardProps> = ({
  skill,
  cardVariant = 'offer',
  onEditButtonClick,
  onConfirmEditButtonClick,
  onSendOfferButtonClick,
  className,
}) => {
  return (
    <article className={clsx(styles.card, styles[cardVariant], className)}>
      {cardVariant === 'offer' ? (
        <div className={styles.offerHeader}>
          <button type="button" className={styles.headerIcon} aria-label="В избранное">
            <LikeIcon />
          </button>
          <button type="button" className={styles.headerIcon} aria-label="Поделиться">
            <ShareIcon />
          </button>
          <button type="button" className={styles.headerIcon} aria-label="Дополнительно">
            <MoreCircleIcon />
          </button>
        </div>
      ) : (
        <div className={styles.editHeader}>
          <h2 className={styles.editTitle}>Ваше предложение</h2>
          <p className={styles.editSubtitle}>
            Пожалуйста, проверьте и подтвердите правильность данных
          </p>
        </div>
      )}

      <div className={styles.contentWrapper}>
        <div className={styles.info}>
          <div className={styles.textBlock}>
            <div className={styles.titleWrapper}>
              <h2 className={styles.title}>{skill.title}</h2>
              <p className={styles.category}>{skill.category}</p>
            </div>
            <p className={styles.description}>{skill.description}</p>
          </div>

          <div className={styles.actions}>
            {cardVariant === 'offer' ? (
              <Button
                buttonType="primary"
                onClick={onSendOfferButtonClick}
                className={styles.actionButton}
              >
                Предложить обмен
              </Button>
            ) : (
              <>
                <Button
                  buttonType="secondary"
                  onClick={onEditButtonClick}
                  className={clsx(styles.buttonWithIcon, styles.actionButton)}
                >
                  Редактировать <EditIcon />
                </Button>
                <Button
                  buttonType="primary"
                  onClick={onConfirmEditButtonClick}
                  className={styles.actionButton}
                >
                  Сохранить
                </Button>
              </>
            )}
          </div>
        </div>

        <div className={styles.gallery}>
          <Gallery>{[]}</Gallery>
        </div>
      </div>
    </article>
  );
};
