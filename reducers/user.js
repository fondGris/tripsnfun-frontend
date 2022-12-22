import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    userInfos: null,
    markers: [],
    otherUsers: [],
tokenUserScreen : null,
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
      state.value.userInfos.avatar = action.payload;
    },
    addTokenUserScreen : (state,action) => {
      state.value.tokenUserScreen = action.payload
    },
    removeTokenUserScreen : (state,action) => {
      state.value.tokenUserScreen = null
    },

  },
});

export const { login, logout, addAllMarkers, removeAllMarkers, addOtherUsers, removeAllOtherUsers, addAvatar, addTokenUserScreen, removeTokenUserScreen} = userSlice.actions;
export default userSlice.reducer;
