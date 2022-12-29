import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null, // Token du user qui se connecte
    userInfos: null, // Information du user qui se connecte
    markers: [], // Récupère tout les markers des autres users connectés en base de donnée
    otherUsers: [], // Récupère toutes les informations des autres users connectés en base de donnée
tokenUserScreen : null,  // Récupère le token du user cliquer sur la MapScreen
avatarOther : null, // Récupère l'image de l'user cliquer sur la MapScreen
usernameOther: null // Récupère l'username de l'user cliquer sur la MapScreen
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: { 
    login: (state, action) => {
      state.value.token = action.payload.token; 
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
    removeTokenUserScreen : (state) => {
      state.value.tokenUserScreen = null
    },
    addAvatarOther : (state,action) => {
      state.value.avatarOther = action.payload
    },
    removeAvatarOther : (state) => {
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
