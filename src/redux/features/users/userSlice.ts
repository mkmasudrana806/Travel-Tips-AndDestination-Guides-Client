import { TUser } from "@/types/userType";
import { createSlice } from "@reduxjs/toolkit";

type TProfile = {
  profile: TUser | null;
  users: TUser[];
  editUserData: TUser | null;
  showUserData: TUser | null;
};

const initialState: TProfile = {
  profile: null,
  users: [],
  editUserData: null,
  showUserData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // set my profile data
    loadUserProfile: (state, action) => {
      state.profile = action.payload;
    },

    // --------- set all users to store
    loadAllUsers: (state, action) => {
      state.users = action.payload;
    },

    // ------------ delete a user
    deleteUserFromStore: (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    },

    // update user into store
    updateSingleUser: (state, action) => {
      state.users = state?.users?.map((user) => {
        if (user._id === action?.payload?.userId) {
          return { ...user, ...action?.payload?.user };
        } else {
          return user;
        }
      });
    },

    // edit a user
    setEditUserData: (state, action) => {
      state.editUserData = action.payload;
    },
    // clear edit User
    clearEditUserData: (state) => {
      state.editUserData = null;
    },

    // show a User data
    setShowUserData: (state, action) => {
      state.showUserData = action.payload;
    },
    // clear show User
    clearShowUserData: (state) => {
      state.showUserData = null;
    },
  },
});

export const {
  loadUserProfile,
  loadAllUsers,
  clearShowUserData,
  setShowUserData,
  clearEditUserData,
  setEditUserData,
  updateSingleUser,
  deleteUserFromStore,
} = userSlice.actions;

export default userSlice.reducer;
