import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    userInfos: null,
    markers: [],
    otherUsers: [],
tokenUserScreen : null,
avatarOther : null,
usernameOther: null
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: { 
    login: (state, action) => {
      state.value.token = action.payload.token; // NE PAS OUBLIER DE MODIFIER PUSH PAR =
      state.value.userInfos = action.payload;
      state.value.username = action.payload.username;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.userInfos = null;
      state.value.username = null ;
    },
    addAllMarkers: (state, action) => {
      state.value.markers = action.payload;
    },
    removeAllMarkers: (state) => {
      state.value.markers = []
    },
    addOtherUsers : (state,action) => {
      state.value.otherUsers.push(action.payload)
    },
    removeAllOtherUsers: (state) => {
    state.value.otherUsers = []
    },
    addAvatar: (state, action) => {
      state.value.userInfos.userInfos.avatar = action.payload;
    },
    delAvatar: (state) => {
      state.value.userInfos = null
    },

    addTokenUserScreen : (state,action) => {
      state.value.tokenUserScreen = action.payload
    },
    removeTokenUserScreen : (state,action) => {
      state.value.tokenUserScreen = null
    },
    addAvatarOther : (state,action) => {
      state.value.avatarOther = action.payload
    },
    removeAvatarOther : (state,action) => {
      state.value.tokenUserScreen = null
    },
    addUsernameOther : (state,action) => {
      state.value.usernameOther = action.payload
    },
    removeUsernameOther : (state) => {
      state.value.userOther = null
    },

  },
});

export const { login, logout, addAllMarkers, removeAllMarkers, addOtherUsers, removeAllOtherUsers, addAvatar, addTokenUserScreen, removeTokenUserScreen , addAvatarOther, removeAvatarOther, delAvatar, addUsernameOther, removeUsernameOther} = userSlice.actions;
export default userSlice.reducer;
