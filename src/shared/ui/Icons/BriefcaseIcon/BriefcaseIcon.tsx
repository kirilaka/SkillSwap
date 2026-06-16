import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import briefcaseSvg from './BriefcaseIcon.svg';

interface BriefcaseIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const BriefcaseIcon = ({ className }: BriefcaseIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={briefcaseSvg} alt="" />
    </IconWrapper>
  );
};
