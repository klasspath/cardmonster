import { Box, Container, Heading, Button, SimpleGrid, GridItem } from "@chakra-ui/react";
import { FC } from "react";
import { Logo } from "@components/core";
import Link from "next/link";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const clientId = process.env.PAYPAL_CLIENT_ID || "";

const Checkout: FC = ({ children }) => {
  return (
    <PayPalScriptProvider options={{ "client-id": clientId }}>
      <Box py="8">
        <Container maxW="7xl">
          <Logo color="purple.500" boxSize="12" mb="8" />
          <Heading mb="2">Deine Bestellung</Heading>
          <Link href="/" passHref>
            <Button variant="link" as="a" leftIcon={<ArrowBackIcon />}>
              Zurück zum Store
            </Button>
          </Link>
          <SimpleGrid columns={2} columnGap="6" mt="16">
            <GridItem>{children}</GridItem>
            <GridItem></GridItem>
          </SimpleGrid>
        </Container>
      </Box>
    </PayPalScriptProvider>
  );
};

export default Checkout;
