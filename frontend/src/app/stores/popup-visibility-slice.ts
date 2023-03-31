import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visible: false,
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    showPopup: state => {
      state.visible = true;
    },
    hidePopup: state => {
      state.visible = false;
    },
  },
});

export const { showPopup, hidePopup } = popupSlice.actions;

export default popupSlice.reducer;
