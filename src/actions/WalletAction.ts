import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface ModeState {
    walletAddress: string;
}

const initialState: ModeState = {
  walletAddress: '',
};


export const walletAddres = createSlice({
  name: 'walletAddres',
  initialState,
  reducers: {
    setWalletAddress: (state, action) => {
      state.walletAddress = action.payload;
    }
  },
  
});

export const { setWalletAddress } = walletAddres.actions;

export const getWalletAddress = (state: RootState) => state.walletAddres.walletAddress;


export default walletAddres.reducer;
