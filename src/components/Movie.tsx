import { fetchMovies } from "@/slices/moviesSlice";
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
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";

import React, { useEffect } from "react";
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
const movie = [
  {
    id: 1,
    name: " Lizards are a widespread group of squamate",
    img: "https://cdn.marvel.com/content/1x/spidermannwh_hardcover.jpg",
    description:
      "lorem Ips incorrectly description  of the movie in question and without the author",
  },
  {
    id: 2,
    name: "Movie2",
    img: "https://cdn.marvel.com/content/1x/spidermannwh_hardcover.jpg",
    description:
      "lorem Ips incorrectly description  of the movie in question and without the author",
  },
  {
    id: 3,
    name: "Movie2",
    img: "https://cdn.marvel.com/content/1x/spidermannwh_hardcover.jpg",
    description:
      "lorem Ips incorrectly description  of the movie in question and without the author",
  },
  {
    id: 4,
    name: "Movie2",
    img: "https://cdn.marvel.com/content/1x/spidermannwh_hardcover.jpg",
    description:
      "lorem Ips incorrectly description  of the movie in question and without the author",
  },
  {
    id: 5,
    name: "Movie2",
    img: "https://cdn.marvel.com/content/1x/spidermannwh_hardcover.jpg",
    description:
      "lorem Ips incorrectly description  of the movie in question and without the author",
  },
  {
    id: 6,
    name: "Movie2",
    img: "https://cdn.marvel.com/content/1x/spidermannwh_hardcover.jpg",
    description:
      "lorem Ips incorrectly description  of the movie in question and without the author",
  },
  {
    id: 7,
    name: "Movie2",
    img: "https://cdn.marvel.com/content/1x/spidermannwh_hardcover.jpg",
    description:
      "lorem Ips incorrectly description  of the movie in question and without the author",
  },
];
const Movie = (props: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector((state: RootState) => state.movies.data);
  const loading = useSelector((state: RootState) => state.movies.loading);

  const showDetails = (id: number) => {
    if (!session) {
      return router.replace("/login");
    } else {
      router.push("/movie/" + id);
    }
  };

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (loading === "pending") {
    return <div>Loading...</div>;
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
                  cursor: "pointer",
                  backgroundColor: theme.palette.secondary.main,
                }}
                onClick={() => showDetails(m.id)}
              >
                <CardContent>
                  <CardMedia
                    component="img"
                    width="100%"
                    height="auto"
                    image={m.poster_url}
                    alt="Paella dish"
                  ></CardMedia>
                  <Stack
                    direction="row"
                    spacing={2}
                    mt={1}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      variant="body1"
                      fontWeight="400"
                      color="white"
                      sx={{ opacity: "0.8" }}
                    >
                      {m.title_en}
                    </Typography>
                    <IconButton aria-label="fav">
                      <FavoriteIcon />
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
