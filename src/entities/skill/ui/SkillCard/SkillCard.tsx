import clsx from 'clsx';
import { Button } from '@/shared/ui/Button/Button';
import { ShareIcon } from '@/shared/ui/Icons/ShareIcon/ShareIcon';
import { MoreCircleIcon } from '@/shared/ui/Icons/MoreCircleIcon/MoreCircleIcon';
import { EditIcon } from '@/shared/ui/Icons/EditIcon/EditIcon';
import { Skill as SkillType } from '@/entities/skill/model/types';
import { Gallery } from '@/shared/ui/Gallery/Gallery';
import { FavoriteButton } from '@/features/favorite/ui/FavoriteButton';
import styles from './SkillCard.module.scss';

export interface SkillCardProps {
  /** Данные навыка */
  skill: SkillType;
  /** Вариант карточки */
  cardVariant?: 'offer' | 'editable';
  /** Находится ли навык в избранном */
  isFavorite?: boolean;
  /** Состояние загрузки (блокирует кнопки) */
  isLoading?: boolean;
  /** Разрешено ли редактирование */
  canEdit?: boolean;
  /** Разрешено ли удаление */
  canDelete?: boolean;
  /** Обработчик клика по кнопке избранного */
  onFavoriteClick?: () => void;
  /** Обработчик клика по кнопке "Поделиться" */
  onShareClick?: () => void;
  /** Обработчик клика по кнопке "Дополнительно" */
  onMoreClick?: () => void;
  /** Обработчик клика по кнопке редактирования */
  onEditButtonClick?: () => void;
  /** Обработчик клика по кнопке подтверждения редактирования (Сохранить) */
  onConfirmEditButtonClick?: () => void;
  /** Обработчик клика по кнопке удаления */
  onDeleteButtonClick?: () => void;
  /** Обработчик клика по кнопке "Предложить обмен" */
  onSendOfferButtonClick?: () => void;
  /** Дополнительный класс */
  className?: string;
}

export const SkillCard = ({
  skill,
  cardVariant = 'offer',
  isFavorite = false,
  isLoading = false,
  canEdit = true,
  canDelete = false,
  onFavoriteClick,
  onShareClick,
  onMoreClick,
  onEditButtonClick,
  onConfirmEditButtonClick,
  onDeleteButtonClick,
  onSendOfferButtonClick,
  className,
}: SkillCardProps) => {
  const images = Array.isArray(skill.imageUrl) ? skill.imageUrl : [];

  return (
    <article className={clsx(styles.card, styles[cardVariant], className)}>
      {cardVariant === 'offer' ? (
        <div className={styles.offerHeader}>
          <FavoriteButton isFavorite={isFavorite} onClick={onFavoriteClick} disabled={isLoading} />
          <button
            type="button"
            className={styles.headerIcon}
            aria-label="Поделиться"
            onClick={onShareClick}
            disabled={isLoading}
          >
            <ShareIcon />
          </button>
          <button
            type="button"
            className={styles.headerIcon}
            aria-label="Дополнительно"
            onClick={onMoreClick}
            disabled={isLoading}
          >
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

      <div
        className={clsx(
          styles.content,
          cardVariant === 'offer' ? styles.contentOffer : styles.contentEdit,
        )}
      >
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
                disabled={isLoading || !onSendOfferButtonClick}
              >
                Предложить обмен
              </Button>
            ) : (
              <>
                {canDelete && (
                  <Button
                    buttonType="secondary"
                    onClick={onDeleteButtonClick}
                    className={styles.actionButton}
                    disabled={isLoading || !onDeleteButtonClick}
                  >
                    Удалить
                  </Button>
                )}
                <Button
                  buttonType="secondary"
                  onClick={onEditButtonClick}
                  className={clsx(styles.buttonWithIcon, styles.actionButton)}
                  disabled={isLoading || !canEdit || !onEditButtonClick}
                >
                  Редактировать <EditIcon />
                </Button>
                <Button
                  buttonType="primary"
                  onClick={onConfirmEditButtonClick}
                  className={styles.actionButton}
                  disabled={isLoading || !canEdit || !onConfirmEditButtonClick}
                >
                  Сохранить
                </Button>
              </>
            )}
          </div>
        </div>

        <div className={styles.gallery}>
          <Gallery>
            {images.map((url, index) => (
              <img key={`${url}-${index}`} src={url} alt={`skill photo ${index + 1}`} />
            ))}
          </Gallery>
        </div>
      </div>
    </article>
  );
};
