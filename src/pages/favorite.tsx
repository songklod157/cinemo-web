'use client'
import { theme } from '@/theme';
import { Box, Card, CardContent, CardMedia, Grid, IconButton, Stack, Typography, styled } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'


const BoxContent = styled(Box)(({ theme }) => ({
  display: "flex",
  backgroundColor: theme.palette.secondary.dark,
  width: "100%",
  height: "100%",
  flexDirection: "column",
  paddingBottom: "5%",
}));
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
type Props = {}

const Favorite = (props: Props) => {

  const { data: session } = useSession();
  const router = useRouter();

  const showDetails = (id: number) => {
    if (!session) {
      return router.replace("/login");
    } else {
      router.push("/movie/" + id);
    }
  };
  
  useEffect(() => {
    if (!session) router.replace("/login");
  }, [session]);
  
  return (
    <BoxContent>
    <Stack direction="column" margin="30px 30px 30px 30px">
      <Typography variant="h5" fontWeight="600" color="white">
        Your Favorite Movies
      </Typography>
    </Stack>
    <Stack direction="column" margin="0px 30px 0px 30px">
      <Grid container spacing={{ xs: 1, md: 2 }} columns={{ md: 12 }}>
        {movie?.map((m: any, index: number) => (
          <Grid item md={2} key={index}>
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
                  image={m.img}
                  alt="Paella dish"
                ></CardMedia>
                <Stack direction="row" spacing={2} mt={1} justifyContent="space-between" alignItems="center">
                  <Typography
                    variant="body1"
                    fontWeight="400"
                    color="white"
                    sx={{ opacity: "0.8" }}
                  >
                    {m.name}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  </BoxContent>
  )
}
export default Favorite;