import { FC } from "react";
import { Box, Stack, Link as ChakraLink } from "@chakra-ui/react";
import useSWR from "swr";
import { fetchGraphQL } from "@lib/api";
import Link from "next/link";
import { useQuery } from "graphql-hooks";

const query = `
query {
  categories {
    id
    title
  }
}
`;

const Navigation: FC = () => {
  const { data, error } = useQuery(query);

  if (data) {
    return (
      <Stack direction="row" spacing={5}>
        {data.categories.map((category) => (
          <Link
            passHref
            href={`/search?category=${category.id}`}
            key={category.id}
          >
            <ChakraLink fontWeight="bold" color="gray.500">
              {category.title}
            </ChakraLink>
          </Link>
        ))}
      </Stack>
    );
  } else if (error) {
    return <Box>Error</Box>;
  } else {
    return <Box>Loading</Box>;
  }
};

export default Navigation;
