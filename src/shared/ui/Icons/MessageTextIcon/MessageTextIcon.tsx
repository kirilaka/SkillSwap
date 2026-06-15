import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import messageTextSvg from './MessageTextIcon.svg';
import styles from './MessageTextIcon.module.scss';

interface MessageTextIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const MessageTextIcon = ({ className }: MessageTextIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={messageTextSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
