// user type
export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  age: number;
  gender: "male" | "female" | "others";
  contact: string;
  address: string;
  role: "user" | "admin";
  status: "active" | "blocked";
  profilePicture?: string;
  isVerified?: boolean;
  premiumAccess?: boolean;
  followers?: string[];
  following?: string[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
