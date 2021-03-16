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
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Default } from "@components/layout";
import { NextSeo } from "next-seo";
import { fetchGraphQL } from "@lib/api";

function addToBag(productId: string) {
  const bag = JSON.parse(localStorage.getItem("bag")) || [];
  console.log(bag);
  localStorage.setItem("bag", JSON.stringify([productId, ...bag]));
}

export const Product = ({ product }) => {
  return (
    <>
      <NextSeo title="Produkte" />
      <Container maxW="7xl">
        <Grid templateColumns="repeat(2, 1fr)" gap={6} alignItems="center">
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
            <Box
              maxW="sm"
              borderWidth="4px"
              borderRadius="lg"
              overflow="hidden"
              p="4"
            >
              <Heading size="xs">Produkt: {product.title}</Heading>
              <Text fontSize="xl" fontWeight="bold" color="red.500">
                {product.price}€
              </Text>
              <Text fontSize="xl" fontWeight="bold">
                Inhalt: {product.contents}
              </Text>
              <Text fontSize="sm" p="5">
                Lieferzeit: 1 bis 3 Werktage
              </Text>
              <Text fontSize="sm" color="red.500">
                Vorrätig???
              </Text>
              <Text fontSize="sm">Artikelnummer: {product.id} </Text>
              <Text fontSize="sm">Kategorien: </Text>
              <Stack direction="row" spacing={3} pt={2}>
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Anzahl
                  </MenuButton>
                  <MenuList>
                    <MenuItem>1</MenuItem>
                    <MenuItem>2</MenuItem>
                    <MenuItem>3</MenuItem>
                    <MenuItem>4</MenuItem>
                    <MenuItem>5</MenuItem>
                  </MenuList>
                </Menu>
                <Button colorScheme="blue" onClick={() => addToBag(product.id)}>
                  In Warenkorb
                </Button>
              </Stack>
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
              </TabPanel>
              <TabPanel>
                <Text>Inhalt: {product.contents}</Text>
              </TabPanel>
              <TabPanel>
                <Table variant="striped" colorScheme="teal">
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
    <div>
      <p>
        <Link href="/search">
          <a>Zurück zu den Produkten</a>
        </Link>
      </p>

      <Product product={product} />
    </div>
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
    }
  }
  `;
  const { product } = await fetchGraphQL(query, { id: params.productId });

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
