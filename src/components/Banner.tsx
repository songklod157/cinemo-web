"use client";
import {
  Box,
  Button,
  CardMedia,
  Grid,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";

const BoxContent = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.palette.secondary.dark,
  width: "100%",
  height: "40vh",
}));
const BoxOpaLeft = styled(Box)(({ theme }) => ({
  width: "20%",
  height: "40vh",
  backgroundImage:
    "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 100%)",
  position: "absolute",
  opacity: "0.6",
}));
const BoxOpaRight = styled(Box)(() => ({
  right: 0,
  width: "20%",
  height: "40vh",
  backgroundImage:
    "linear-gradient(90deg,  rgba(255,255,255,0) 0%,rgba(0,0,0,1) 100%)",
  position: "absolute",
  opacity: "0.6",
}));
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
const BannerContentComponent = () => {
  return (
    <Paper>
      <BoxContent>
        <BoxOpaLeft />
        <BoxOpaRight />
        <CardMedia
          sx={{ height: "40vh", width: "100%" }}
          image="https://images6.alphacoders.com/130/1307795.jpg"
          title="green iguana"
        >
          <BoxOpaLeft />
          <BoxOpaRight />
          <Stack direction="column" spacing={2} sx={{ padding: "7%" }}>
            <Typography
              variant="h4"
              fontWeight="600"
              color="white"
              sx={{ opacity: "0.8" }}
            >
              Avatar: The Way of Water
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
                  voluptates. Temporibus eum, exercitationem dolorem ipsum
                  facilis alias deserunt cumque ea quis harum enim.
                </Typography>
              </Grid>
            </Grid>
            <BtnWatch>Watch Now</BtnWatch>
          </Stack>
        </CardMedia>
      </BoxContent>
    </Paper>
  );
};

export default BannerContentComponent;
