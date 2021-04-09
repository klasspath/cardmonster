import { Checkout } from "@components/layout";
import Head from "next/head";
import {
  Button,
  Heading,
  Box,
  Container,
  Stack,
  FormControl,
  Input,
  FormLabel,
  SimpleGrid,
  GridItem,
  Wrap,
  Text,
  useRadio,
  useRadioGroup,
  RadioProps,
  Center,
  Spinner,
  Link as ChakraLink,
  Icon,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { resources } from "coinbase-commerce-node";
import Link from "next/link";
import axios from "axios";
import { Logo } from "@components/core";
import { Formik, Field, Form } from "formik";
import { useRouter } from "next/router";
import { BillingForm } from "@components/checkout";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiLitecoin } from "react-icons/si";

const Crypto = () => {
  const router = useRouter();

  return (
    <Box>
      <Wrap py="5" spacing="5">
        <Icon as={FaBitcoin} color="purple.500" h="8" w="8" />
        <Icon as={FaEthereum} color="purple.500" h="8" w="8" />
        <Icon as={SiLitecoin} color="purple.500" h="8" w="8" />
      </Wrap>
      <BillingForm
        onSubmit={async (values) => {
          const c = await axios.post("/api/charge/create").then((res) => res.data);
          router.push(`/checkout/crypto/${c.id}`);
          window.open(c.hosted_url, "_blank");
        }}
      />
    </Box>
  );
};

Crypto.Layout = Checkout;

export default Crypto;
