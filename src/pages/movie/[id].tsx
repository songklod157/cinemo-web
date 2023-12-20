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

const MovieDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const movies = useSelector((state: RootState) => state.movies.data);
  const movie = movies.find((m) => m.id === Number(id));
  console.log(movie);

  useEffect(() => {
    if (!id) return;
  }, [id]);

  useEffect(() => {
    if (!session) router.replace("/login");
  }, [session]);
  return (
    <Box width="100%" height="100vh" bgcolor={theme.palette.secondary.dark}>
      <Stack
        direction="row"
        spacing={12}
        justifyContent="space-between"
        mt={8}
        ml={8}
      >
        <CardMedia
          sx={{ height: "50vh", width: "450px" }}
          image={movie?.poster_url}
          title="movie details"
        />
        <Stack direction="column" spacing={2}>
          <StyledRating
            disabled
            name="customized-color"
            defaultValue={4}
            precision={4}
            icon={<StarIcon fontSize="large" />}
            emptyIcon={<StarIcon fontSize="large" />}
          />
          <BtnWatch>Watch Now</BtnWatch>
          <Typography
            variant="h4"
            fontWeight="600"
            color="white"
            sx={{ opacity: "0.8" }}
          >
            {movie?.title_en}
          </Typography>
          <Grid container>
            <Grid item xs={7}>
              <Typography
                fontWeight="100"
                color="white"
                sx={{ opacity: "0.6" }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                sed soluta recusandae expedita, numquam tempore pariatur
                voluptates. Temporibus eum, exercitationem dolorem ipsum facilis
                alias deserunt cumque ea quis harum enim.
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
};

export default MovieDetail;
