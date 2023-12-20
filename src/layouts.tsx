'use client'
import { theme } from "@/theme";
import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";

export const OverFlowContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
`;
export const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const LayoutContainer = styled("div")`
  display: flex;
  flex-direction: row;
  background: #ffffff;
  min-height: 100vh;
`;
export const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background: #f7f7fa;
  overflow: auto;
`;
export const ContainerMain = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  background: "#f7f7fa",
}));

export const ContainerContent = styled("div")(({ theme }) => ({
  display: "flex",
  width: "80%",
  flexDirection: "column",
  background: "#f7f7fa",
}));
export const ContainerSide = styled("div")(({ theme }) => ({
  display: "flex",
  width: "20%",
  flexDirection: "column",
  alignItems: "center",
}));
export const ContentWrapper = styled(Box)(({ theme }) => ({
  padding: "20px 36px",
  overflow: "auto",
}));
export const HeadContent = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
}));
export const BannerContent = styled(Box)(({ theme }) => ({
  marginTop: "40px",
  display: "flex",
  width: "100%",
  height: "auto",
  justifyContent: "center",
}));
export const CategoryContent = styled(Box)(({ theme }) => ({
  marginTop: "40px",
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
}));
export const CategoryContentText = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
}));
export const GameContent = styled(Box)(({ theme }) => ({
  marginTop: "40px",
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
}));
export const BtnCate = styled(Button)(() => ({
  color: "grey",
  width: "250px",
  height: "70px",
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "transparent",
  borderColor: "grey",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
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
    borderColor: "white",
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    color: theme.palette.primary.main,
  },
}));
export const BtnLogin = styled(Button)(() => ({
  color: "white",
  width: "100%",
  height: "50px",
  boxShadow: "none",
  textTransform: "none",
  fontSize: 18,
  padding: "6px 12px",
  lineHeight: 1.5,
  backgroundColor: theme.palette.primary.light,
  fontWeight: "bold",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "transparent",
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    border: "1px solid",
  },
  "&:active": {
    boxShadow: "white",
    backgroundColor: "#0062cc",
    borderColor: "none",
  },
  "&:focus": {
    borderColor: "white",
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    color: theme.palette.primary.main,
  },
}));
