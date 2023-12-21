"use client";

import { theme } from "@/theme";
import {
  Box,
  Button,
  CardMedia,
  Grid,
  Paper,
  Rating,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";

export const BtnWatch = styled(Button)(({ theme }) => ({
  color: "white",
  width: "200px",
  height: "55px",
  boxShadow: "initial",
  textTransform: "none",
  fontSize: 18,
  padding: "6px 12px",
  lineHeight: 1.5,
  borderRadius: "8px",
  fontWeight: "600",
  backgroundColor: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    borderColor: theme.palette.primary.dark,
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "white",
    backgroundColor: "#0062cc",
    borderColor: "none",
  },
  "&:focus": {
    borderColor: theme.palette.primary.light,
    color: "white",
  },
}));
const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: theme.palette.primary.light,
  },
  "& .MuiRating-iconHover": {
    color: theme.palette.primary.light,
  },
});
const BoxContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  backgroundColor: theme.palette.secondary.dark,
  width: "100%",
  flexDirection: "column",
}));
const BoxContent = styled(Box)(({ theme }) => ({
  display: "flex",
  backgroundColor: theme.palette.secondary.dark,
  width: "100%",
  flexDirection: "column",
  padding: "4%",
}));
const MovieDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const movies = useSelector((state: RootState) => state.movies.data);
  const movie = movies.find((m) => m.id === Number(id));

  useEffect(() => {
    if (!id) return;
  }, [id]);

  useEffect(() => {
    if (!session) router.replace("/login");
  }, [session]);
  return (
    <BoxContainer>
      <BoxContent>
        <Grid container sx={{ height: "100vh" }}>
          <Grid item xs={6}>
            <CardMedia
              sx={{ height: "100vh", width: "100%" }}
              image={movie?.poster_url}
              title="movie details"
            />
          </Grid>
          <Grid item xs={6}>
            <Stack
              direction="column"
              spacing={3}
              color={theme.palette.secondary.dark}
              p={2}
            >
              <Typography
                variant="h4"
                fontWeight="600"
                color="white"
                sx={{ opacity: "0.8" }}
              >
                {movie?.title_en}
              </Typography>
              <StyledRating
                disabled
                name="customized-color"
                defaultValue={4}
                precision={4}
                icon={<StarIcon fontSize="large" />}
                emptyIcon={<StarIcon fontSize="large" />}
              />
              <BtnWatch>Watch Now</BtnWatch>
              <Typography variant="body2" color="white" sx={{ opacity: "0.8" }}>
                {movie?.synopsis_en}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </BoxContent>
      <BoxContent>
        <Stack
          direction="row"
          spacing={3}
          color={theme.palette.secondary.dark}
          p={2}
        >
          <Typography
            variant="body1"
            fontWeight="600"
            color="white"
            sx={{ opacity: "0.8" }}
          >
            Genre:
          </Typography>
          <Typography
            variant="body1"
            fontWeight="200"
            color="white"
            sx={{ opacity: "0.8" }}
          >
            {movie?.genre}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={3}
          color={theme.palette.secondary.dark}
          p={2}
        >
          <Typography
            variant="body1"
            fontWeight="600"
            color="white"
            sx={{ opacity: "0.8" }}
          >
            Actor:
          </Typography>
          <Typography
            variant="body1"
            fontWeight="200"
            color="white"
            sx={{ opacity: "0.8" }}
          >
            {movie?.actor}
          </Typography>
        </Stack>
      </BoxContent>
    </BoxContainer>
  );
};

export default MovieDetail;
