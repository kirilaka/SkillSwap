import { FC } from 'react';
import clsx from 'clsx';
import { Button } from '@/shared/ui/Button/Button';
import { LikeIcon } from '@/shared/ui/Icons/LikeIcon/LikeIcon';
import { ShareIcon } from '@/shared/ui/Icons/ShareIcon/ShareIcon';
import { MoreCircleIcon } from '@/shared/ui/Icons/MoreCircleIcon/MoreCircleIcon';
import { EditIcon } from '@/shared/ui/Icons/EditIcon/EditIcon';
import styles from './SkillCard.module.scss';

export interface SkillCardProps {
  title: string;

  category: string;

  description: string;

  cardVariant?: 'offer' | 'editable';

  images?: string[];

  onEditButtonClick?: () => void;

  onConfirmEditButtonClick?: () => void;

  onSendOfferButtonClick?: () => void;

  className?: string;
}

export const SkillCard: FC<SkillCardProps> = ({
  title,
  category,
  description,
  cardVariant = 'offer',
  images = [],
  onEditButtonClick,
  onConfirmEditButtonClick,
  onSendOfferButtonClick,
  className,
}) => {
  const mainImage = images[0];
  const thumbnails = images.slice(1, 4);
  const remainingImagesCount = images.length > 4 ? images.length - 4 : 0;

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
          <h3 className={styles.editTitle}>Ваше предложение</h3>
          <p className={styles.editSubtitle}>
            Пожалуйста, проверьте и подтвердите правильность данных
          </p>
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.textBlock}>
            <div className={styles.titleWrapper}>
              <h2 className={styles.title}>{title}</h2>
              <p className={styles.category}>{category}</p>
            </div>
            <p className={styles.description}>{description}</p>
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
                  Редактировать <EditIcon className={styles.actionIcon} />
                </Button>
                <Button
                  buttonType="primary"
                  onClick={onConfirmEditButtonClick}
                  className={styles.actionButton}
                >
                  Готово
                </Button>
              </>
            )}
          </div>
        </div>

        {mainImage && (
          <div className={styles.gallery}>
            <div className={styles.mainImageWrapper}>
              <img src={mainImage} alt="Главное фото навыка" className={styles.mainImage} />
              {images.length > 1 && (
                <div className={styles.sliderControls}>
                  <button
                    type="button"
                    className={styles.sliderButton}
                    aria-label="Предыдущее фото"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <button type="button" className={styles.sliderButton} aria-label="Следующее фото">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {thumbnails.length > 0 && (
              <div className={styles.thumbnails}>
                {thumbnails.map((thumb, index) => {
                  const isLastThumbnail = index === 2;
                  const showOverlay = isLastThumbnail && remainingImagesCount > 0;

                  return (
                    <div key={index} className={styles.thumbnailWrapper}>
                      <img
                        src={thumb}
                        alt={`Миниатюра ${index + 1}`}
                        className={styles.thumbnailImage}
                      />
                      {showOverlay && <div className={styles.overlay}>+{remainingImagesCount}</div>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
};
