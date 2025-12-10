export type CreateUserType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type UserType = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
};
