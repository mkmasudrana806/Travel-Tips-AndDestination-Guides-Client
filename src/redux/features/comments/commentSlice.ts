import { TPost } from "@/types/postType";
import { createSlice } from "@reduxjs/toolkit";

// type
export type TPosts = {
  items: TPost[];
  editPostData: TPost | null;
  showPostData: TPost | null;
  compareList: TPost[];
};

// initialState
const initialState: TPosts = {
  items: [],
  editPostData: null,
  showPostData: null,
  compareList: [],
};

// Posts slice
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // --------- set all posts to store
    loadAllPosts: (state, action) => {
      state.items = action.payload;
    },

    // ------------ delete a post
    deletePostFromStore: (state, action) => {
      state.items = state.items.filter((post) => post._id !== action.payload);
    },

    // update post into store
    updateSinglePost: (state, action) => {
      state.items = state?.items?.map((post) => {
        if (post._id === action?.payload?.postId) {
          return { ...post, ...action?.payload?.post };
        } else {
          return post;
        }
      });
    },

    // edit a post
    setEditPostData: (state, action) => {
      state.editPostData = action.payload;
    },
    // clear edit Post
    clearEditPostData: (state) => {
      state.editPostData = null;
    },

    // show a Post data
    setShowPostData: (state, action) => {
      state.showPostData = action.payload;
    },
    // clear show Post
    clearShowPostData: (state) => {
      state.showPostData = null;
    },
    // toggle compare lists
    toggleCompare: (state, action) => {
      const post = action.payload;
      // Check if the post is already in the compare list
      const isPostInCompare = state.compareList.some(
        (item) => item._id === post._id
      );

      if (isPostInCompare) {
        // If post is in the compare list, remove it
        state.compareList = state.compareList.filter(
          (item) => item._id !== post._id
        );
      } else if (state.compareList.length < 3) {
        state.compareList.push(post);
      }
    },
    // clear compare lists
    clearCompareList: (state) => {
      state.compareList = [];
    },
  },
});

export const {
  loadAllPosts,
  deletePostFromStore,
  updateSinglePost,
  setEditPostData,
  clearEditPostData,
  setShowPostData,
  clearShowPostData,
  toggleCompare,
  clearCompareList,
} = postsSlice.actions;

export default postsSlice.reducer;
