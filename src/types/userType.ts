export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

// user type
export type TUser = {
  [x: string]: any;
  key: string;
  _id: string;
  name: TUserName;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  age: number;
  gender: string;
  contact: string;
  address: string;
  role: "user" | "admin";
  status: "active" | "blocked";
  profileImgUrl?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
