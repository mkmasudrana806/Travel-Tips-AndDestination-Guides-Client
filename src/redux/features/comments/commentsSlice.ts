import { createSlice } from "@reduxjs/toolkit";

interface CommentState {
  editCommentData: {
    _id: string;
    postId: string;
    comment: string;
  } | null;
}

const initialState: CommentState = {
  editCommentData: null,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    // set edit comment data to state
    setEditCommentData: (state, action) => {
      state.editCommentData = action.payload;
    },

    // clear edit comment data from state
    clearEditCommentData: (state) => {
      state.editCommentData = null;
    },
  },
});

export const { setEditCommentData, clearEditCommentData } =
  commentSlice.actions;
export default commentSlice.reducer;
