import { FC } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ChakraProvider } from "@chakra-ui/react";
import { Head } from "@components/core";

import { GraphQLClient, ClientContext } from "graphql-hooks";

const client = new GraphQLClient({
  url: process.env.API_URL,
});

const Noop: FC = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const Layout: FC = (Component as any).Layout || Noop;

  return (
    <>
      <Head />
      <ChakraProvider>
        <ClientContext.Provider value={client}>
          <Layout>
            <Component {...pageProps} key={router.route} />
          </Layout>
        </ClientContext.Provider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
