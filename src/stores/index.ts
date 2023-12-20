import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../slices/moviesSlice';
import authReducer from '../slices/authSlice';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;