import { configureStore } from "@reduxjs/toolkit";
import artworkReducer from './slices/artworkSlice'
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

/**
 * Setting up simple store
 */
export const store = configureStore({
  reducer: {
    artworks: artworkReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;