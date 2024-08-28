import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './articleSlice'; // Ensure the path is correct

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
