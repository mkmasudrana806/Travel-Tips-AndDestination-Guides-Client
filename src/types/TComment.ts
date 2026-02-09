export type TComment = {
  _id: string;
  postId: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    profilePicture: string;
    isVerified: boolean;
    premiumAccess: boolean;
  };
  comment: string;
  createdAt: string;
  updatedAt: string;
};
