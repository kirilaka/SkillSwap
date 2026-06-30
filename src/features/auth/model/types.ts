export interface ProfileFormData {
  name: string;
  birthData: Date | undefined;
  genderId: string | null;
  citiId: string | null;
  categoryId: string | null;
  subcategoryId: string | null;
  avatar: File | null;
}
