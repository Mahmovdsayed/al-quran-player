import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the Reciter state
interface ReciterState {
  selectedReciterId: string; // Store the selected reciter's ID
}

// Set the initial state with a default Reciter ID
const initialState: ReciterState = {
  selectedReciterId: "ar.alafasy", // Default to a sample Reciter ID, which can be changed later
};

// Create the reciter slice
export const reciterSlice = createSlice({
  name: "reciter", // Name of the slice
  initialState, // Initial state defined above
  reducers: {
    // Reducer to set the selected reciter ID
    setSelectedReciter: (state, action: PayloadAction<string>) => {
      state.selectedReciterId = action.payload; // Update state with the new ID from the action payload
    },
  },
});

// Export the action and reducer for use in the application
export const { setSelectedReciter } = reciterSlice.actions;
export default reciterSlice.reducer;
