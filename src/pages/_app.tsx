import { Provider } from "react-redux";
import store from "../stores/index";
import { SessionProvider, useSession } from "next-auth/react";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import {
  HomePageContainer,
  LayoutContainer,
  OverFlowContainer,
} from "@/layouts";
import { theme } from "@/theme";
import SideBar from "../components/Sidebar";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <OverFlowContainer>
          <HomePageContainer>
            <LayoutContainer>
              <SessionProvider session={session}>
                <SideBar />
                <Component {...pageProps} />
              </SessionProvider>
            </LayoutContainer>
          </HomePageContainer>
        </OverFlowContainer>
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
