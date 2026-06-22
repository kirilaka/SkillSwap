import { MessageTextIcon } from '@/shared/ui/Icons/MessageTextIcon/MessageTextIcon';
import { RequestIcon } from '@/shared/ui/Icons/RequestIcon/RequestIcon';
import { LikeIcon } from '@/shared/ui/Icons/LikeIcon/LikeIcon';
import { IdeaIcon } from '@/shared/ui/Icons/IdeaIcon/IdeaIcon';
import { UserIcon } from '@/shared/ui/Icons/UserIcon/UserIcon';
import { SidebarItemProps } from './types';

export const SidebarItems: SidebarItemProps[] = [
  { label: 'Заявки', path: '/profile/applications', Icon: RequestIcon },
  { label: 'Мои обмены', path: '/profile/my-swaps', Icon: MessageTextIcon },
  { label: 'Избранное', path: '/profile/favorites', Icon: LikeIcon },
  { label: 'Мои навыки', path: '/profile/my-skills', Icon: IdeaIcon },
  { label: 'Личные данные', path: '/profile/personal-info', Icon: UserIcon },
];
