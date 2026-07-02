import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import clsx from 'clsx';
import { GalleryAddIcon } from '@/shared/ui/Icons/GalleryAddIcon/GalleryAddIcon';
import styles from './SkillUploader.module.scss';

export interface SkillUploaderProps {
  /** Доп. классы */
  className?: string;
  /** Коллбек при изменении файлов */
  onFilesChange?: (files: File[]) => void;
}

/** Компонент для загрузки изображений навыка */
export const SkillUploader = ({ className, onFilesChange }: SkillUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (onFilesChange) {
        onFilesChange(acceptedFiles);
      }

      console.log('Accepted files:', acceptedFiles);
    },
    [onFilesChange],
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    },
    maxSize: 2 * 1024 * 1024, // 2MB
    maxFiles: 5,
  });

  const hasErrors = fileRejections.length > 0;

  return (
    <div
      {...getRootProps()}
      className={clsx(
        styles.skillUploader,
        isDragActive && styles.skillUploaderIsDragActive,
        hasErrors && styles.skillUploaderHasErrors,
        className,
      )}
    >
      <input {...getInputProps()} />
      <p className={styles.skillUploaderText}>
        {isDragActive ? 'Отпустите файлы здесь' : 'Перетащите или выберите изображения навыка'}
      </p>
      <div className={styles.skillUploaderAction}>
        <GalleryAddIcon />
        <span>Выбрать изображения</span>
      </div>
      {hasErrors && (
        <p className={styles.skillUploaderError}>
          {fileRejections
            .map(({ file, errors }) => `${file.name}: ${errors.map((e) => e.message).join(', ')}`)
            .join('; ')}
        </p>
      )}
    </div>
  );
};
