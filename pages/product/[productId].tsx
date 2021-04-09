import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Container,
  Heading,
  Text,
  Grid,
  GridItem,
  Box,
  AspectRatio,
  MenuButton,
  Menu,
  MenuItem,
  MenuList,
  Button,
  Tab,
  TabList,
  Tabs,
  TabPanels,
  TabPanel,
  Table,
  Tr,
  Tbody,
  Td,
  Stack,
  useRadio,
  useRadioGroup,
  Wrap,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Default } from "@components/layout";
import { NextSeo } from "next-seo";
import { fetchGraphQL } from "@lib/api";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { useGlobalState } from "@components/core";
import { useState } from "react";

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderColor="purple.500"
        rounded="full"
        _checked={{
          bg: "purple.500",
          color: "white",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export const Product = ({ product }) => {
  const { isFallback } = useRouter();
  const { openSidebar, addCartItem } = useGlobalState();

  if (isFallback) return <ErrorPage statusCode={404} />;

  let options = [1, 2, 3, 4, 5].map((_, i) => i + 1);

  const [count, setCount] = useState(0)

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "count",
    onChange: (val) => setCount(Number.parseInt(val))
  })

  const group = getRootProps()

  return (
    <>
      <NextSeo title="Produkte" />
      <Container maxW="7xl">
        <Grid templateColumns="repeat(2, 1fr)" gap={6} alignItems="center" py="24">
          <GridItem colSpan={1}>
            <AspectRatio ratio={4 / 3}>
              <Image
                src={product.image[0].url}
                layout="fill"
                objectFit="cover"
                sizes="300"
                quality={30}
              />
            </AspectRatio>
          </GridItem>
          <GridItem colSpan={1}>
            <Box p="5">
              <Heading size="lg"> {product.title}</Heading>
              <Text py="10" fontSize="xl" fontWeight="bold">
                {product.price}EUR
              </Text>

              <Box py="5">
                <Wrap {...group}>
                  {options.map((value) => {
                    const radio = getRadioProps({ value })
                    return (
                      <RadioCard key={value} {...radio}>
                        {value}
                      </RadioCard>
                    )
                  })}
                </Wrap>
              </Box>
              <Box>
                <Button
                  colorScheme="purple"
                  size="lg"
                  disabled={count == 0}
                  onClick={() => {
                    addCartItem(product.id, count)
                    openSidebar();
                  }}
                >
                  In den Warenkorb
                </Button>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Container>
      <Box py={20} borderWidth="4px" borderRadius="lg" overflow="hidden">
        <Container maxW="7xl">
          <Tabs>
            <TabList>
              <Tab>Beschreibung</Tab>
              <Tab>Inhalt</Tab>
              <Tab>Zusätzliche Informationen</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Text>{product.description}</Text>
                <Text fontSize="sm">Artikelnummer: {product.id} </Text>
                <Text fontSize="sm">Kategorien: </Text>
              </TabPanel>
              <TabPanel>
                <Text>Inhalt: {product.contents}</Text>
              </TabPanel>
              <TabPanel>
                <Table variant="striped" colorScheme="purple">
                  <Tbody>
                    <Tr>
                      <Td>Lizenz</Td>
                      <Td>
                        <Text>{product.license}</Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Altersempfehlung</Td>
                      <Td>{product.ageRecommendation}</Td>
                    </Tr>
                    <Tr>
                      <Td>Inhalt</Td>
                      <Td>{product.contents}</Td>
                    </Tr>
                    <Tr>
                      <Td>Erscheinungsdatum</Td>
                      <Td>{product.releaseDate}</Td>
                    </Tr>
                    <Tr>
                      <Td>Sprache</Td>
                      <Td>{product.language}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Box>
    </>
  );
};

const ShowProductPage = ({ product }) => {
  return (
    <Product product={product} />
  );
};

ShowProductPage.Layout = Default;

export default ShowProductPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
  query GetProduct($id: ID!) {
    product(where: { id: $id }) {
      id
      title
      price
      image {
        url
      }
      ageRecommendation
      contents
      license
      releaseDate
      language
      description
      stock
    }
  }
  `;
  const { product } = await fetchGraphQL(query, { id: params?.productId });

  return {
    props: {
      product,
    },
    revalidate: 300,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `
  query {
    products {
      id
    }
  }
  `;
  const data = await fetchGraphQL(query);

  return {
    paths:
      data.products.map((product) => {
        return {
          params: {
            productId: product.id,
          },
        };
      }) || [],
    fallback: true,
  };
};
