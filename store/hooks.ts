import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"; // Import hooks from react-redux
import type { RootState, AppDispatch } from "./index"; // Import types for the Redux store

// Create a typed version of useDispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

// Create a typed version of useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
