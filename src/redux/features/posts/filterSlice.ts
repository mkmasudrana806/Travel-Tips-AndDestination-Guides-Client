import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  searchTerm: string;
  sort: string;
  sortBy: string;
  limit: number;
  page: number;
}

const initialState: FilterState = {
  searchTerm: "",
  sort: "",
  sortBy: "",
  limit: 5,
  page: 1,
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
  },
});

export const {
  searchPosts,
  setSort,
  setSortBy,
  setLimit,
  setPage,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
