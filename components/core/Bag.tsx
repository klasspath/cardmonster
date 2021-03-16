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
} from "@chakra-ui/react";
import Image from "next/image";
import { useLocalStorage } from "@lib/storage";
import { FC, useEffect, useState } from "react";
import useSWR from "swr";
import { useQuery } from "graphql-hooks";

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

const useBag = () => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem("bag") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("bag", JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

const Bag: FC<any> = (props) => {
  const { isOpen, onClose, onOpen } = props;
  const [productIds, setProductIds] = useLocalStorage("bag", ["testchen"]);
  const { data, error } = useQuery(query, { variables: { productIds } });

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Warenkorb</DrawerHeader>

          <DrawerBody>
            <VStack spacing={5}>
              {data &&
                data.products.map((product) => (
                  <Stack
                    key={product.id}
                    direction="row"
                    spacing={5}
                    align="center"
                  >
                    <Square size={20} pos="relative">
                      <Image
                        src={product.image[0].url}
                        layout="fill"
                        objectFit="cover"
                        sizes="100"
                        quality={25}
                      />
                    </Square>
                    <Heading size="sm">
                      {product.title} {product.image.url}
                    </Heading>
                  </Stack>
                ))}
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <VStack w="full">
              <Box></Box>
              <Button color="purple" isFullWidth size="lg">
                Zum Bezahlvorgang
              </Button>
            </VStack>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default Bag;
