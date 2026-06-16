import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import messageTextSvg from './MessageTextIcon.svg';

interface MessageTextIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const MessageTextIcon = ({ className }: MessageTextIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={messageTextSvg} alt="" />
    </IconWrapper>
  );
};
