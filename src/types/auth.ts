export interface FormValues {
  email: string;
  nickname?: string;
  password: string;
  passwordConfirm?: string;
}
export interface ProfileFormValues {
  email?: string;
  nickname: string;
  password?: string;
  newPassword?: string;
  passwordConfirm?: string;
  profileImageUrl?: string | null;
}
export type GetUserData = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  ceatedAt: string;
};
