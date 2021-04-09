import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
  Link as StyledLink,
  Wrap,
} from "@chakra-ui/react";
import { Default } from "@components/layout";
import { ProductCard } from "@components/product";
import { useQuery } from "graphql-hooks";
import { useRouter } from "next/router";
import Link from "next/link";

const allQuery = `
  query GetProductsByCategory($orderBy: ProductOrderByInput = releaseDate_DESC) {
    products(orderBy: $orderBy) {
      id
      title
      price
      image {
      url
      }
      releaseDate
    }
  }
`;

const categoriesQuery = `
  query GetProductsByCategory($category: ID, $orderBy: ProductOrderByInput = price_DESC) {
    products(where: {categories_some: {id: $category}}, orderBy: $orderBy) {
      id
      title
      price
      image {
      url
      }
      releaseDate
    }
  }
`;

const searchQuery = `
  query SearchForProducct($term: String) {
    products(where: { title_contains: $term }) { 
      id
      title
      price
      image {
        url
      }
    }
  }
`;

const qs = (params: Record<string, unknown>) =>
  Object.keys(params)
    .filter((key) => params[key])
    .map((key) => `${key}=${params[key]}`)
    .join("&");

const SearchPage = () => {
  const { query } = useRouter();
  const { sort, q, category } = query;

  const dataQ = q ? searchQuery : category ? categoriesQuery : allQuery;
  const { data } = useQuery(dataQ, {
    variables: {
      category,
      term: q,
      orderBy: sort,
    },
  });

  return (
    <Box mt={2}>
      <Container maxW="120rem">
        <Grid templateColumns="repeat(12, 1fr)" columnGap={6}>
          <GridItem colSpan={2}>
            <Box p={4}>
              <Heading size="md">Alle Kategorien</Heading>
            </Box>
          </GridItem>
          <GridItem colSpan={8}>
            {data && (
              <Text color="gray.700" mb={8}>
                {data.products.length} Artikel werden angezeigt
              </Text>
            )}
            <SimpleGrid columns={3} spacing={10}>
              {data &&
                data.products.map((product) => (
                  <ProductCard
                    id={product.id}
                    title={product.title}
                    imageUrl={product.image[0].url}
                    price={product.price}
                    key={product.id}
                  />
                ))}
            </SimpleGrid>
          </GridItem>
          <GridItem colSpan={2}>
            <Box p={4}>
              <Heading size="md" mb={5}>
                Sortieren
              </Heading>
              <Wrap>
                <Link href={`/search?${qs({ sort: "releaseDate_DESC", category })}`} passHref>
                  <StyledLink>Erscheinungsdatum</StyledLink>
                </Link>
                <Link href={`/search?${qs({ sort: "price_DESC", category })}`} passHref>
                  <StyledLink>Preis absteigend</StyledLink>
                </Link>
                <Link href={`/search?${qs({ sort: "price_ASC", category })}`} passHref>
                  <StyledLink>Preis aufsteigend</StyledLink>
                </Link>
              </Wrap>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default SearchPage;

SearchPage.Layout = Default;
