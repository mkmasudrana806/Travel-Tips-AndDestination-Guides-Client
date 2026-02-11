export type TCreatePost = {
  title: string;
  category: string;
  image: string;
  content: string;
  premium: boolean;
  bannerId: string;
  contentIds: string[];
};
