import { MessageTextIcon } from '@/shared/ui/Icons/MessageTextIcon/MessageTextIcon';
import { RequestIcon } from '@/shared/ui/Icons/RequestIcon/RequestIcon';
import { LikeIcon } from '@/shared/ui/Icons/LikeIcon/LikeIcon';
import { IdeaIcon } from '@/shared/ui/Icons/IdeaIcon/IdeaIcon';
import { UserIcon } from '@/shared/ui/Icons/UserIcon/UserIcon';
import { SidebarItemProps } from './types';
import { ROUTES } from '@/shared/lib/constants';

export const SidebarItems: SidebarItemProps[] = [
  { label: 'Заявки', path: ROUTES.PROFILE_APPLICATIONS, Icon: RequestIcon },
  { label: 'Мои обмены', path: ROUTES.PROFILE_MY_SWAPS, Icon: MessageTextIcon },
  { label: 'Избранное', path: ROUTES.PROFILE_FAVORITES, Icon: LikeIcon },
  { label: 'Мои навыки', path: ROUTES.PROFILE_MY_SKILLS, Icon: IdeaIcon },
  { label: 'Личные данные', path: ROUTES.PROFILE_PERSONAL_INFO, Icon: UserIcon },
];
