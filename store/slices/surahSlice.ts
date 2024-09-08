import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // Importing functions to create a slice and asynchronous thunk
import { RootState } from "../index"; // Importing RootState type from the Redux store index
import { surahData } from "@/context/surahContext"; // Importing surahData function from a context file

// Define the Surah interface to type-check Surah data
interface Surah {
  id: number; // Unique identifier for each verse
  verse_key: string; // Key that represents the verse
  text_indopak: string; // Text of the verse in Indopak script
}

// Define the state structure for Surah data
interface SurahState {
  surahh: Surah[]; // Array of Surah objects
  loading: boolean; // Loading state to manage asynchronous data fetching
  error: string | null; // Error state to handle any errors during data fetching
}

// Initial state for the Surah slice
const initialState: SurahState = {
  surahh: [], // Initialize with an empty array
  loading: false, // Initially not loading
  error: null, // Initially no error
};

// Async thunk to fetch Surah data
export const fetchSurahData = createAsyncThunk(
  "surahh/fetchSurahData", // Action type
  async (nub: string) => {
    // Asynchronous function to fetch data
    const response = await surahData(nub); // Fetch Surah data using the provided function
    return response.verses as Surah[]; // Return the verses as an array of Surah objects
  }
);

// Create a slice of the Redux store for managing Surah data
const SurahSlice = createSlice({
  name: "surahh", // Name of the slice
  initialState, // Initial state defined above
  reducers: {}, // No synchronous reducers needed, only async logic handled here
  extraReducers: (builder) => {
    // Handling asynchronous actions from the thunk
    builder
      .addCase(fetchSurahData.pending, (state) => {
        // When the fetchSurahData action is pending
        state.loading = true; // Set loading to true
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchSurahData.fulfilled, (state, action) => {
        // When the fetchSurahData action is fulfilled
        state.surahh = action.payload; // Update the Surah data with the fetched data
        state.loading = false; // Set loading to false
      })
      .addCase(fetchSurahData.rejected, (state, action) => {
        // When the fetchSurahData action is rejected
        state.loading = false; // Set loading to false
        state.error = action.error.message || "Failed to fetch surah"; // Set error message
      });
  },
});

// Selector to access the Surah state in components
export const selectSurah = (state: RootState) => state.surahh;
export default SurahSlice.reducer; // Export the reducer to be included in the Redux store
