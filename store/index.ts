import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import surahReducer from "./slices/surahSlice";
import reciterReducer from "./slices/reciterSlice";
import surahTranslationReducer from "./slices/surahTranslationSlice";
import TafsirReducer from "./slices/TafsirSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  surahh: surahReducer,
  surahTranslation: surahTranslationReducer,
  reciter: reciterReducer,
  TafsirID: TafsirReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
