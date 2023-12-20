import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../pages/api/services/api";

interface Movie {
  id: Number;
  poster_url: string;
  title_en: string;
}
interface MoviesState {
  data: Movie[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}
const initialState: MoviesState = {
  data: [],
  loading: "idle",
  error: null,
};
export const fetchMovies = createAsyncThunk<Movie[], void>(
  "movies/fetchMovies",
  async () => {
    try {
      const response = await api.get("/get_movie_avaiable");
      return response.data.movies;
    } catch (error) {
      throw error;
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(
        fetchMovies.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.loading = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default moviesSlice.reducer;
