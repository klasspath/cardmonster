import { Checkout } from "@components/layout";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { resources } from "coinbase-commerce-node";
import axios from "axios";
import {
  Box,
  Spinner,
  Heading,
  Text,
  Badge,
  Stack,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Button,
  Link as ChakraLink,
} from "@chakra-ui/react";
import useSWR, { mutate } from "swr";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiLitecoin } from "react-icons/si";
import { IconType } from "react-icons";
import Link from "next/link";

const getCharge = async (id: string) =>
  axios.post("/api/charge/get", { id }).then((res) => res.data);

type CurrencyBoxProps = {
  amount: string;
  icon: IconType;
  name: string;
};

const CurrencyBox: FC<CurrencyBoxProps> = ({ amount, icon, name }) => {
  return (
    <Box p="4" shadow="base">
      <Stack direction="row" align="center" mb="2">
        <Icon as={icon} color="purple.500" w="7" h="7" />
        <Text>{name}</Text>
      </Stack>
      <Heading size="lg">{amount}</Heading>
    </Box>
  );
};

const Charge = () => {
  const router = useRouter();
  const { chargeId } = router.query;

  const { data: charge } = useSWR([chargeId], getCharge);

  useEffect(() => {
    setInterval(() => mutate(chargeId as any), 5000);
  }, []);

  return (
    <Box>
      {charge ? (
        <Box>
          <Heading mb="5" size="lg">
            {charge.name}
          </Heading>
          <Text mb="20">
            Bitte zahle diesen Betrag über den Tab, der sich geöffnet hat. Sollte es Schwierigkeiten
            geben, kannst du die Zahlungsseite{" "}
            <ChakraLink href={charge.hosted_url} isExternal color="purple.500">
              hier
            </ChakraLink>{" "}
            aufrufen.
          </Text>
          <Stat>
            <StatLabel fontSize="xl">Gesamtbetrag</StatLabel>
            <StatNumber fontSize="4xl">
              {charge.pricing.local.amount} {charge.pricing.local.currency}
            </StatNumber>
          </Stat>
          <Heading mb="8"> </Heading>
          <Stack direction="row" spacing="5" mb="10">
            <CurrencyBox amount={charge.pricing.bitcoin.amount} name="Bitcoin" icon={FaBitcoin} />
            <CurrencyBox
              amount={charge.pricing.ethereum.amount}
              name="Ethereum"
              icon={FaEthereum}
            />
            <CurrencyBox
              amount={charge.pricing.litecoin.amount}
              name="Litecoin"
              icon={SiLitecoin}
            />
          </Stack>
          <Link href="/checkout" passHref>
            <Button as="a">Zahlung abbrechen</Button>
          </Link>
        </Box>
      ) : (
        <Spinner />
      )}
    </Box>
  );
};

Charge.Layout = Checkout;

export default Charge;
