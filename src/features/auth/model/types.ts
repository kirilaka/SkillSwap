export interface DualRoleData {
  teach: string | null;
  learn: string | null;
}
export interface ProfileFormData {
  name: string;
  birthDate: Date | undefined;
  genderId: string | null;
  cityId: string | null;
  categoryId: DualRoleData;
  subcategoryId: DualRoleData;
  avatar: File | null;
  skillTitle: string;
  skillDescription: string;
  skillImageUrl: string[] | null;
}
