export type TPost = {
  _id: string;
  author: {
    _id: string;
    name: string;
    email: string;
    profilePicture: string;
    isVerified: boolean;
    premiumAccess: boolean;
  };
  title: string;
  content: string;
  category: string;
  image: string;
  premium: boolean;
  upvotes: string[];
  downvotes: string[];
  isDeleted: boolean;
};
