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
  bannerId: string;
  contentIds: string[];
  upvotes: string[];
  downvotes: string[];
  commentCount: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

// Define this in your postApi.ts or a separate types file
export interface TQueryArgs {
  searchTerm?: string;
  sort?: string;
  limit?: number;
  page?: number;
  premium?: boolean;
  [key: string]: any;
}
