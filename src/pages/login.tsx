"use client";
import { BtnLogin } from "@/layouts";
import { clearUser, setUser } from "@/slices/authSlice";
import { AppDispatch } from "@/stores";
import { theme } from "@/theme";
import {
  Box,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEventHandler, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const Container = styled("div")(({theme}) => ({
  backgroundColor: theme.palette.secondary.light,
  width: "100%",
}));
export const LoginLayout = styled(Box)(() => ({
  width: "100%",
  justifyContent: "center",
}));
export const LoginBox = styled(Box)(({theme}) => ({
  padding: "10%",
  justifyContent: "center",
}));
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: "auto",
  bgcolor: "white",
  border: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
};
type Props = {};

const Login = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [login, setLogin] = useState({ email: "", password: "" });
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e: any) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email: login.email,
      password: login.password,
    });
    console.log(res);
    if (res?.status === 200) {
        dispatch(setUser({ isLogin: true }));
        router.push("/");
    }
  };

  dispatch(clearUser())
  return (
    <Container>
      <LoginLayout>
        <LoginBox>
          <form onSubmit={onSubmit}>
            <Paper elevation={3}>
              <Box sx={style}>
                <Stack sx={{ alignItems: "center", marginBottom: "20px" }}>
                  <Typography
                    id="modal-modal-title"
                    variant="h5"
                    component="h2"
                    fontWeight="600"
                    color={theme.palette.primary.dark}
                  >
                    Sign In
                  </Typography>
                </Stack>
                <Divider />
                <Stack direction="column" spacing={4}>
                  <TextField
                    id="outlined-basic"
                    type="text"
                    label="Username"
                    variant="outlined"
                    value={login.email}
                    onChange={({ target }) =>
                      setLogin({ ...login, email: target.value })
                    }
                  />
                  <TextField
                    id="outlined-basic"
                    type="password"
                    label="Password"
                    variant="outlined"
                    value={login.password}
                    onChange={({ target }) =>
                      setLogin({ ...login, password: target.value })
                    }
                  />
                </Stack>
                <Stack alignItems="center" mt={4}>
                  <BtnLogin type="submit">Log in</BtnLogin>
                </Stack>
              </Box>
            </Paper>
          </form>
        </LoginBox>
      </LoginLayout>
    </Container>
  );
};
export default Login;
