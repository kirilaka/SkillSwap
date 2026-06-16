import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import calendarSvg from './CalendarIcon.svg';

interface CalendarIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const CalendarIcon = ({ className }: CalendarIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={calendarSvg} alt="" />
    </IconWrapper>
  );
};
