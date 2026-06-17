import type { Meta, StoryObj } from '@storybook/react-vite';

import { AddIcon } from './AddIcon/AddIcon';
import { ArrowLeftIcon } from './ArrowLeftIcon/ArrowLeftIcon';
import { ArrowSquareIcon } from './ArrowSquareIcon/ArrowSquareIcon';
import { BookIcon } from './BookIcon/BookIcon';
import { BriefcaseIcon } from './BriefcaseIcon/BriefcaseIcon';
import { CalendarIcon } from './CalendarIcon/CalendarIcon';
import { CheckboxDoneIcon } from './CheckboxDoneIcon/CheckboxDoneIcon';
import { CheckboxEmptyIcon } from './CheckboxEmptyIcon/CheckboxEmptyIcon';
import { CheckboxRemoveIcon } from './CheckboxRemoveIcon/CheckboxRemoveIcon';
import { ClockIcon } from './ClockIcon/ClockIcon';
import { CountIcon } from './CountIcon/CountIcon';
import { CrossIcon } from './CrossIcon/CrossIcon';
import { DoneIcon } from './DoneIcon/DoneIcon';
import { EditIcon } from './EditIcon/EditIcon';
import { EyeIcon } from './EyeIcon/EyeIcon';
import { EyeSlashIcon } from './EyeSlashIcon/EyeSlashIcon';
import { FilterSquareIcon } from './FilterSquareIcon/FilterSquareIcon';
import { GalleryAddIcon } from './GalleryAddIcon/GalleryAddIcon';
import { GalleryEditIcon } from './GalleryEditIcon/GalleryEditIcon';
import { GlobalIcon } from './GlobalIcon/GlobalIcon';
import { HomeIcon } from './HomeIcon/HomeIcon';
import { IdeaIcon } from './IdeaIcon/IdeaIcon';
import { LifestyleIcon } from './LifestyleIcon/LifestyleIcon';
import { LikeIcon } from './LikeIcon/LikeIcon';
import { LogOutIcon } from './LogOutIcon/LogOutIcon';
import { MessageTextIcon } from './MessageTextIcon/MessageTextIcon';
import { MoonIcon } from './MoonIcon/MoonIcon';
import { MoreCircleIcon } from './MoreCircleIcon/MoreCircleIcon';
import { NotificationIcon } from './NotificationIcon/NotificationIcon';
import { PaletteIcon } from './PaletteIcon/PaletteIcon';
import { PlusCircleIcon } from './PlusCircleIcon/PlusCircleIcon';
import { RadioButtonIcon } from './RadioButtonIcon/RadioButtonIcon';
import { RequestIcon } from './RequestIcon/RequestIcon';
import { ScrollIcon } from './ScrollIcon/ScrollIcon';
import { ScrollSquareIcon } from './ScrollSquareIcon/ScrollSquareIcon';
import { SearchIcon } from './SearchIcon/SearchIcon';
import { ShareIcon } from './ShareIcon/ShareIcon';
import { SortIcon } from './SortIcon/SortIcon';
import { SunIcon } from './SunIcon/SunIcon';
import { UserCircleIcon } from './UserCircleIcon/UserCircleIcon';
import { UserIcon } from './UserIcon/UserIcon';

const meta = {
  title: 'SHARED/Icons',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Add: Story = { render: () => <AddIcon /> };
export const ArrowLeft: Story = { render: () => <ArrowLeftIcon /> };
export const ArrowSquare: Story = { render: () => <ArrowSquareIcon /> };
export const Book: Story = { render: () => <BookIcon /> };
export const Briefcase: Story = { render: () => <BriefcaseIcon /> };
export const Calendar: Story = { render: () => <CalendarIcon /> };
export const CheckboxDone: Story = { render: () => <CheckboxDoneIcon /> };
export const CheckboxEmpty: Story = { render: () => <CheckboxEmptyIcon /> };
export const CheckboxRemove: Story = { render: () => <CheckboxRemoveIcon /> };
export const Clock: Story = { render: () => <ClockIcon /> };
export const Count: Story = { render: () => <CountIcon /> };
export const Cross: Story = { render: () => <CrossIcon /> };
export const Done: Story = { render: () => <DoneIcon /> };
export const Edit: Story = { render: () => <EditIcon /> };
export const Eye: Story = { render: () => <EyeIcon /> };
export const EyeSlash: Story = { render: () => <EyeSlashIcon /> };
export const FilterSquare: Story = { render: () => <FilterSquareIcon /> };
export const GalleryAdd: Story = { render: () => <GalleryAddIcon /> };
export const GalleryEdit: Story = { render: () => <GalleryEditIcon /> };
export const Global: Story = { render: () => <GlobalIcon /> };
export const Home: Story = { render: () => <HomeIcon /> };
export const Idea: Story = { render: () => <IdeaIcon /> };
export const Lifestyle: Story = { render: () => <LifestyleIcon /> };
export const Like: Story = { render: () => <LikeIcon /> };
export const LogOut: Story = { render: () => <LogOutIcon /> };
export const MessageText: Story = { render: () => <MessageTextIcon /> };
export const Moon: Story = { render: () => <MoonIcon /> };
export const MoreCircle: Story = { render: () => <MoreCircleIcon /> };
export const Notification: Story = { render: () => <NotificationIcon /> };
export const Palette: Story = { render: () => <PaletteIcon /> };
export const PlusCircle: Story = { render: () => <PlusCircleIcon /> };
export const RadioButton: Story = { render: () => <RadioButtonIcon /> };
export const Request: Story = { render: () => <RequestIcon /> };
export const Scroll: Story = { render: () => <ScrollIcon /> };
export const ScrollSquare: Story = { render: () => <ScrollSquareIcon /> };
export const Search: Story = { render: () => <SearchIcon /> };
export const Share: Story = { render: () => <ShareIcon /> };
export const Sort: Story = { render: () => <SortIcon /> };
export const Sun: Story = { render: () => <SunIcon /> };
export const UserCircle: Story = { render: () => <UserCircleIcon /> };
export const User: Story = { render: () => <UserIcon /> };
