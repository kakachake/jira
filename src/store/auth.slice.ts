import { User } from "../screens/project-list/search-panel";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from ".";
import * as auth from "../auth-provider";
import { bootstrapUser } from "../context/auth-context";
interface AuthForm {
  username: string;
  password: string;
}
interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      console.log(action);

      state.user = action.payload;
    },
  },
  extraReducers: {},
});

const { setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth;

export const login = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.login(form).then((user) => dispatch(setUser(user)));
export const register = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.register(form).then((user) => dispatch(setUser(user)));
export const logout = () => (dispatch: AppDispatch) =>
  auth.logout().then(() => dispatch(setUser(null)));
export const bootstrap = () => (dispatch: AppDispatch) =>
  bootstrapUser().then((user) => dispatch(setUser(user)));
