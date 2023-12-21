"use client";

import BannerContentComponent from "@/components/Banner";
import Movie from "@/components/Movie";
import { ContainerMain } from "@/layouts";
import { clearUser, setUser } from "@/slices/authSlice";
import { AppDispatch, RootState } from "@/stores";
import { Box, styled } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!session) {
      dispatch(clearUser());
      router.replace("/login");
    }
  }, [session, dispatch]);
  return (
    <ContainerMain>
      <BannerContentComponent />
      <Movie />
    </ContainerMain>
  );
};
export default Home;
