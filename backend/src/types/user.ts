enum Roles {
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin',
}

export interface IUser {
  id: number;
  username: string;
  password: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: Roles.ADMIN | Roles.TEACHER | Roles.STUDENT;
  createdAt: string;
  updatedAt: string;
  group_id?: number;
}
