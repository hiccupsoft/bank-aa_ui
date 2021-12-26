import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import toggleMode from '../actions/ToggleMode';
import walletAddres from "../actions/WalletAction"

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    mode: toggleMode,
    walletAddres: walletAddres
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
