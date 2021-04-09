import {
  AspectRatio,
  Box,
  Heading,
  VStack,
  Text,
  Link as StyledLink,
  Flex,
  Button,
  Square,
} from "@chakra-ui/react";
import { FC } from "react";
import Image from "next/image";
import { MotionBox } from "@components/motion";
import Link from "next/link";
import { HeartIcon } from "@components/icons";

interface ProductCardProps {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
}

const ProductCard: FC<ProductCardProps> = (props) => {
  const { id, title, imageUrl, price } = props;

  return (
    <Link href={`/product/${id}`} passHref>
      <StyledLink overflow="hidden" pos="relative" w="full" h="full">
        <Box pos="absolute" top={0} left={0} right={0} bottom={0} bg="purple.500" />
        <Box opacity="0.8">
          <Image src={imageUrl} width={540} height={540} layout="responsive" quality={50}></Image>
        </Box>
        <Flex justify="space-between" w="full" pos="absolute" top={0}>
          <Box pr={5}>
            <Heading size="md" p={5} bg="white">
              {title}
            </Heading>
            <Text as="span" p={5} bg="white" fontWeight="bold">
              {price} EUR
            </Text>
          </Box>
          <Square bg="white" size={10}>
            <HeartIcon />
          </Square>
        </Flex>
      </StyledLink>
    </Link>
  );
};

export default ProductCard;
