import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import requestSvg from './RequestIcon.svg';

interface RequestIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const RequestIcon = ({ className }: RequestIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={requestSvg} alt="" />
    </IconWrapper>
  );
};
