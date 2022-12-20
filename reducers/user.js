import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { token: null, username: null, markers: [], otherUsers: [] },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token; // NE PAS OUBLIER DE MODIFIER PUSH PAR =
      state.value.username = action.payload.username;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
    },
    addAllMarkers: (state, action) => {
      state.value.markers = action.payload;
    },
    removeAllMarkers: (state) => {
      state.value.markers = []
    },
    addOtherUsers : (state,action) => {
      state.value.markers.push(action.payload)
    }
    
  },
});

export const { login, logout, addAllMarkers, removeAllMarkers, addOtherUsers } = userSlice.actions;
export default userSlice.reducer;
