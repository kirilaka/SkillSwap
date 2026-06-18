import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { GalleryAddIcon } from '@/shared/ui/Icons/GalleryAddIcon/GalleryAddIcon';
import styles from './SkillUploader.module.scss';

export interface SkillUploaderProps {
  /** Доп. классы */
  className?: string;
}

/** Компонент для загрузки изображений навыка */
export const SkillUploader = ({ className = '' }: SkillUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Файлы пока не сохраняем никуда

    console.log('Accepted files:', acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 5,
  });

  const hasErrors = fileRejections.length > 0;

  return (
    <div
      {...getRootProps()}
      className={`${styles.skillUploader} ${isDragActive ? styles.skillUploaderIsDragActive : ''} ${hasErrors ? styles.skillUploaderHasErrors : ''} ${className}`}
    >
      <input {...getInputProps()} />
      <p className={styles.skillUploaderText}>
        {isDragActive ? 'Отпустите файлы здесь' : 'Перетащите или выберите изображения навыка'}
      </p>
      <div className={styles.skillUploaderAction}>
        <GalleryAddIcon className={styles.skillUploaderIcon} />
        <span className={styles.skillUploaderActionText}>Выбрать изображения</span>
      </div>
      {hasErrors && (
        <ul className={styles.skillUploaderErrors}>
          {fileRejections.map(({ file, errors }, index) => (
            <li key={`${file.name}-${index}`} className={styles.skillUploaderError}>
              {file.name}: {errors.map((e) => e.message).join(', ')}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
