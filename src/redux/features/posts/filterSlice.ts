import { TPost } from "@/types/postType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  searchTerm: string;
  sort: string;
  sortBy: string;
  limit: number;
  page: number;
  editPostData: TPost | null;
}

const initialState: FilterState = {
  searchTerm: "",
  sort: "",
  sortBy: "",
  limit: 5,
  page: 1,
  editPostData: null,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    searchPosts: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    resetFilters: (state) => {
      state.searchTerm = initialState.searchTerm;
      state.sort = initialState.sort;
      state.limit = initialState.limit;
      state.page = initialState.page;
    },
    // edit a user
    setEditPostData: (state, action) => {
      state.editPostData = action.payload;
    },
    // clear edit Post
    clearEditPostData: (state) => {
      state.editPostData = null;
    },
  },
});

export const {
  searchPosts,
  setSort,
  setSortBy,
  setLimit,
  setPage,
  resetFilters,
  setEditPostData,
  clearEditPostData,
} = filterSlice.actions;

export default filterSlice.reducer;
