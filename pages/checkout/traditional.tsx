import { Checkout } from "@components/layout";
import Head from "next/head";
import {
  Stat,
  Box,
  Heading,
  Link as ChakraLink,
  Text,
  StatLabel,
  StatNumber,
  Button,
  Wrap,
  Icon,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { resources } from "coinbase-commerce-node";
import Link from "next/link";
import axios from "axios";
import { Logo } from "@components/core";
import { Checkout as CheckoutLayout } from "@components/layout";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { BillingForm } from "@components/checkout";
import { useRouter } from "next/router";
import { FaCreditCard, FaPaypal } from "react-icons/fa";

const Traditional = () => {
  const router = useRouter();

  const purchase_units = [
    {
      amount: {
        value: (5.0).toString(),
      },
      description: "Glumanda",
    },
  ];

  return (
    <Box>
      <Wrap py="5" spacing="5">
        <Icon as={FaPaypal} color="purple.500" h="8" w="8" />
        <Icon as={FaCreditCard} color="purple.500" h="8" w="8" />
      </Wrap>
      <BillingForm
        onSubmit={async (values) => {
          router.push("/checkout/traditional/1");
        }}
      />
    </Box>
  );
};

Traditional.Layout = Checkout;

export default Traditional;
