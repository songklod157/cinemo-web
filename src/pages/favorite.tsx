"use client";
import { theme } from "@/theme";
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
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, selectFavoriteMovies } from "../slices/moviesSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AppDispatch } from "@/stores";

const BoxContent = styled(Box)(({ theme }) => ({
  display: "flex",
  backgroundColor: theme.palette.secondary.dark,
  width: "100%",
  height: "100%",
  flexDirection: "column",
  paddingBottom: "5%",
}));
const BoxContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  backgroundColor: theme.palette.secondary.dark,
  width: "100%",
  height: "100vh",
  flexDirection: "column",
}));

type Props = {};

const Favorite = (props: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const favoriteMovies = useSelector(selectFavoriteMovies);
  const dispatch = useDispatch<AppDispatch>();
  


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

  useEffect(() => {
    if (!session) router.replace("/login");
  }, [session]);

  return (
    <BoxContainer>
      <BoxContent>
        <Stack direction="column" margin="30px 30px 30px 30px">
          <Typography variant="h5" fontWeight="600" color="white">
            Your Favorite Movies
          </Typography>
        </Stack>
        <Stack direction="column" margin="0px 30px 0px 30px">
          <Grid container spacing={{ xs: 1, md: 2 }} columns={{ md: 12 }}>
            {favoriteMovies.length > 0 ? favoriteMovies?.map((m: any, index: number) => (
              <Grid item md={2} key={index}>
                <Card
                  sx={{
                    maxWidth: 345,
                    backgroundColor: theme.palette.secondary.main,
                  }}
                >
                  <CardContent>
                    <div  onClick={() => showDetails(m.id)}>
                    <CardMedia
                      component="img"
                      width="100%"
                      height="auto"
                      image={m.poster_url}
                      alt="Paella dish"
                      sx={{ cursor: "pointer"}}
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
            )): <Typography ml="30px" variant="body1" color='white'>You have no favorite movie...</Typography>}
          </Grid>
        </Stack>
      </BoxContent>
    </BoxContainer>
  );
};
export default Favorite;
