import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TafsirState {
  selectedTafsirId: string;
}

const initialState: TafsirState = {
  selectedTafsirId: "93",
};

export const tafsirSlice = createSlice({
  name: "tafsir",
  initialState,
  reducers: {
    setSelectedTafsir: (state, action: PayloadAction<string>) => {
      state.selectedTafsirId = action.payload;
    },
  },
});

export const { setSelectedTafsir } = tafsirSlice.actions;
export default tafsirSlice.reducer;
