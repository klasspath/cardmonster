import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Heading,
  Stack,
  Box,
  Square,
  VStack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { useLocalStorage } from "@lib/storage";
import { FC, useEffect, useState } from "react";
import useSWR from "swr";
import { useQuery } from "graphql-hooks";
import { useGlobalState } from "@components/core";

import axios from "axios";
import Link from "next/link";

const query = `
query GetBagItems($productIds: [ID!]) {
  products(where: { id_in: $productIds }) {
    price
    id
    title
    image {
      url
    }
  }
}
`;

const Bag: FC = () => {
  const { displaySidebar, closeSidebar } = useGlobalState();
  const { cartItems: items } = useGlobalState()

  return (
    <Drawer isOpen={displaySidebar} placement="right" onClose={closeSidebar} size="md">
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Warenkorb</DrawerHeader>

          <DrawerBody>
            <VStack spacing={5}>
              {items.map((item, i) => (
                <Stack direction="row" justify="space-between" align="center" w="full" key={i}>
                  <Text>{item.productId}</Text>
                  <Text>{item.count}</Text>
                </Stack>
              ))}
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <VStack w="full">
              <Box></Box>
              <Link href="/checkout" passHref>
                <Button colorScheme="purple" isFullWidth size="lg" as="a">
                  Zum Bezahlvorgang
                </Button>
              </Link>
            </VStack>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default Bag;
