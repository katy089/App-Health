import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  fullname: "",
  email: "",
  sex: "",
  profile_image: "",
  role: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action) => {
      const {
        id_patient,
        id_doctor,
        fullname,
        email,
        sex,
        profile_image,
        role,
      } = action.payload;

      if (id_patient) state.id = id_patient;
      if (id_doctor) state.id = id_doctor;
      state.fullname = fullname;
      state.email = email;
      state.sex = sex;
      state.profile_image = profile_image;
      state.role = role;
    },
    logOut: (state) => {
      state.id = "";
      state.fullname = "";
      state.email = "";
      state.sex = "";
      state.profile_image = "";
      state.role = "";
    },
  },
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
