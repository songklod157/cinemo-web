import { createSlice, createAsyncThunk, PayloadAction, createSelector } from "@reduxjs/toolkit";
import api from "../pages/api/services/api";
import { RootState } from "@/stores";

interface Movie {
  id: Number;
  poster_url: string;
  title_en: string;
  synopsis_en: string;
  actor: string;
  genre: string;
  favorite: boolean;
}
interface MoviesState {
  data: Movie[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  isFetched: boolean;
  lastFetched: number;
}
const initialState: MoviesState = {
  data: [],
  loading: "idle",
  error: null,
  isFetched: false,
  lastFetched: 0,
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
export const selectMovies = (state: RootState) => state.movies.data;
export const selectIsFetched = (state: RootState) => state.movies.isFetched;
export const selectLastFetched = (state: RootState) => state.movies.lastFetched;

export const selectFavoriteMovies = createSelector(
  [selectMovies],
  (movies) => movies.filter((movie) => movie.favorite)
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<number>) => {
      const movieId = action.payload;
      const movie = state.data.find((m) => m.id === movieId);

      if (movie) {
        // Set the favorite property
        movie.favorite = !movie.favorite
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(
        fetchMovies.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.loading = "succeeded";
          state.data = action.payload.map((movie) => ({
            ...movie,
            favorite: false,
          }));
          state.isFetched = true;
          state.lastFetched = Date.now();
        }
      )
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "An error occurred.";
      });
  },
});
export const { addFavorite } = moviesSlice.actions;

export default moviesSlice.reducer;
