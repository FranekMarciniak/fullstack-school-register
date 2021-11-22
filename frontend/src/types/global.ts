export interface IUser {
  id: number | null;
  username: string;
  password: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
  group_id: number;
}
export interface IGlobalState {
  loading: boolean;
  errors: string;
  user: IUser;
}
export interface ILoginForm {
  username: string;
  password: string;
}
