"use client";

import BannerContentComponent from "@/components/Banner";
import Movie from "@/components/Movie";
import {
  BtnCate,
  CategoryContent,
  CategoryContentText,
  ContainerContent,
  ContainerMain,
  ContainerSide,
  ContentWrapper,
  GameContent,
  HeadContent,
} from "@/layouts";
import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect} from "react";

export const BannerContent = styled(Box)(() => ({
  marginTop: "40px",
  display: "flex",
  width: "100%",
  height: "auto",
  justifyContent: "center",
}));
type Props = {};

const Home = (props: Props) => {
  const { data: session } = useSession();
  const router = useRouter();


  useEffect(() => {
    if (!session) router.replace("/login");
  }, [session]);

  // useEffect(() => {
  //   if (status === "unauthenticated") router.replace("/login");
  // }, [status]);
  return (
    <ContainerMain>
      <BannerContentComponent />
      <Movie />
    </ContainerMain>
  );
};
export default Home;
