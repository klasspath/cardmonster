import { FC } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ChakraProvider } from "@chakra-ui/react";
import { Head, GlobalProvider } from "@components/core";

import { GraphQLClient, ClientContext } from "graphql-hooks";
import theme from "@styles/theme";
import "typeface-inter";

const client = new GraphQLClient({
  url: process.env.API_URL || "",
});

const Noop: FC = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const Layout: FC = (Component as any).Layout || Noop;

  return (
    <>
      <Head />
      <ChakraProvider theme={theme}>
        <ClientContext.Provider value={client}>
          <GlobalProvider>
            <Layout>
              <Component {...pageProps} key={router.route} />
            </Layout>
          </GlobalProvider>
        </ClientContext.Provider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
