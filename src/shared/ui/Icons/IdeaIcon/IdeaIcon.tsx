import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import ideaSvg from './IdeaIcon.svg';

interface IdeaIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const IdeaIcon = ({ className }: IdeaIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={ideaSvg} alt="" />
    </IconWrapper>
  );
};
