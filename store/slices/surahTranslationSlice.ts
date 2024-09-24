import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../index"; // Import RootState type from the Redux store index
import { surahDataTranslation } from "@/context/surahContext";
// Define the Surah Translation interface to type-check Surah translation data
interface SurahTranslation {
  verse_number: number; // Verse number in Surah
  text: string; // Translated text of the verse
}

// Define the state structure for Surah Translation data
interface SurahTranslationState {
  translations: SurahTranslation[]; // Array of SurahTranslation objects
  loading: boolean; // Loading state to manage asynchronous data fetching
  error: string | null; // Error state to handle any errors during data fetching
}

// Initial state for the Surah Translation slice
const initialState: SurahTranslationState = {
  translations: [], // Initialize with an empty array
  loading: false, // Initially not loading
  error: null, // Initially no error
};

// Async thunk to fetch Surah translation data
export const fetchSurahTranslationData = createAsyncThunk(
  "surahTranslation/fetchSurahTranslationData",
  async (surahID: string) => {
    const response = await surahDataTranslation(surahID);
    return response.translations as SurahTranslation[];
  }
);

// Create a slice of the Redux store for managing Surah translation data
const SurahTranslationSlice = createSlice({
  name: "surahTranslation", // Name of the slice
  initialState, // Initial state defined above
  reducers: {}, // No synchronous reducers needed, only async logic handled here
  extraReducers: (builder) => {
    // Handling asynchronous actions from the thunk
    builder
      .addCase(fetchSurahTranslationData.pending, (state) => {
        // When the fetchSurahTranslationData action is pending
        state.loading = true; // Set loading to true
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchSurahTranslationData.fulfilled, (state, action) => {
        // When the fetchSurahTranslationData action is fulfilled
        state.translations = action.payload; // Update the Surah translation data with the fetched data
        state.loading = false; // Set loading to false
      })
      .addCase(fetchSurahTranslationData.rejected, (state, action) => {
        // When the fetchSurahTranslationData action is rejected
        state.loading = false; // Set loading to false
        state.error =
          action.error.message || "Failed to fetch surah translation"; // Set error message
      });
  },
});

// Selector to access the Surah Translation state in components
export const selectSurahTranslation = (state: RootState) =>
  state.surahTranslation;
export default SurahTranslationSlice.reducer; // Export the reducer to be included in the Redux store
