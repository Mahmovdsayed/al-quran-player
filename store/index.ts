import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import surahReducer from "./slices/surahSlice";
import reciterReducer from "./slices/reciterSlice";

// Configuration for redux-persist
const persistConfig = {
  key: "root", // Key for the persisted state
  storage, // Storage mechanism (local storage)
};

// Combine reducers into a root reducer
const rootReducer = combineReducers({
  surahh: surahReducer,
  reciter: reciterReducer,
});

// Wrap root reducer with persistReducer to enable state persistence
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist compatibility
    }),
});

// Create a persistor to handle rehydration of the state
const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>; // Type for the entire state
export type AppDispatch = typeof store.dispatch; // Type for dispatch function
