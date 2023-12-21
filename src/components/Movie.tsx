import {
  addFavorite,
  fetchMovies,
  selectIsFetched,
  selectLastFetched,
} from "@/slices/moviesSlice";
import { AppDispatch, RootState } from "@/stores";
import { theme } from "@/theme";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Movie {
  id: string;
  poster_url: string;
  title_en: string;
}

const BoxContent = styled(Box)(({ theme }) => ({
  display: "flex",
  backgroundColor: theme.palette.secondary.dark,
  width: "100%",
  height: "100%",
  flexDirection: "column",
  paddingBottom: "20px",
}));

type Props = {};

const Movie = (props: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector((state: RootState) => state.movies.data);
  const loading = useSelector((state: RootState) => state.movies.loading);
  const isFetched = useSelector(selectIsFetched);
  const lastFetched = useSelector(selectLastFetched);

  const showDetails = (id: number) => {
    if (!session) {
      return router.replace("/login");
    } else {
      router.push("/movie/" + id);
    }
  };
  const handleAddFavorite = (movieId: number) => {
    dispatch(addFavorite(movieId));
  };

  const fetchMoviesCallback = useCallback(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    // Fetch movies only if they haven't been fetched or if it's been more than a certain time interval
    const fetchInterval = 60000; //1 min
    const shouldFetchMovies =
      !isFetched || Date.now() - lastFetched > fetchInterval;

    if (shouldFetchMovies) {
      fetchMoviesCallback();
    }
  }, [fetchMoviesCallback, isFetched, lastFetched]);

  if (!isFetched) {
    return (
      <BoxContent>
        <Typography variant="body1" fontWeight="2x00" color="white">
          Loading...
        </Typography>
      </BoxContent>
    );
  }

  if (loading === "pending") {
    return (
      <BoxContent>
        <Typography variant="body1" fontWeight="2x00" color="white">
          Loading...
        </Typography>
      </BoxContent>
    );
  }

  return (
    <BoxContent>
      <Stack direction="column" margin="30px 30px 30px 30px">
        <Typography variant="h5" fontWeight="600" color="white">
          Trending Movies
        </Typography>
      </Stack>
      <Stack direction="column" margin="0px 30px 0px 30px">
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ md: 12 }}>
          {movies.map((m: any) => (
            <Grid item md={2} key={m.id}>
              <Card
                sx={{
                  maxWidth: 345,
                  backgroundColor: theme.palette.secondary.main,
                }}
              >
                <CardContent>
                  <div onClick={() => showDetails(m.id)}>
                    <CardMedia
                      component="img"
                      width="100%"
                      height="auto"
                      image={m.poster_url}
                      alt="Paella dish"
                      sx={{ cursor: "pointer" }}
                    ></CardMedia>
                  </div>
                  <Stack
                    direction="row"
                    spacing={2}
                    mt={1}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      component="span"
                      variant="body1"
                      fontWeight="400"
                      color="white"
                      sx={{ opacity: "0.8" }}
                    >
                      {m.title_en}
                    </Typography>
                    <IconButton
                      aria-label="fav"
                      onClick={() => handleAddFavorite(m.id)}
                    >
                      <FavoriteIcon
                        sx={{ color: m.favorite === true ? "pink" : "primary" }}
                      />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </BoxContent>
  );
};
export default Movie;
