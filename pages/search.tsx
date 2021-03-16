import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Default } from "@components/layout";
import { ProductCard } from "@components/product";
import { useQuery } from "graphql-hooks";
import { useRouter } from "next/router";

const allQuery = `
  query GetAllProducts {
    products {
      id
      title
      price
      image {
        url
      }
    }
  }
`;

const categoriesQuery = `
  query GetProductsByCategory($category: ID) {
    products(where: { categories_some: { id: $category } }) {
      id
      title
      price
      image {
        url
      }
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

const SearchPage = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(
    router.query.q
      ? searchQuery
      : router.query.category
        ? categoriesQuery
        : allQuery,
    {
      variables: {
        category: router.query.category,
        term: router.query.q,
      },
    }
  );

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
              <Heading size="md">Sortieren</Heading>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default SearchPage;

SearchPage.Layout = Default;
