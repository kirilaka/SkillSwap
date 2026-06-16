import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import bookSvg from './BookIcon.svg';

interface BookIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const BookIcon = ({ className }: BookIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={bookSvg} alt="" />
    </IconWrapper>
  );
};
