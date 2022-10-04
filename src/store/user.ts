import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'models/user';

interface IUserState {
  user: IUser | null;
}

const initialState: IUserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { logout, setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
