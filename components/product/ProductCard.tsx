import { AspectRatio, Box, Heading, VStack, Text } from "@chakra-ui/react";
import { FC } from "react";
import Image from "next/image";
import { MotionBox } from "@components/motion";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
}

const ProductCard: FC<ProductCardProps> = (props) => {
  const { id, title, imageUrl, price } = props;

  return (
    <Link href={`/product/${id}`}>
      <MotionBox whileHover={{ scale: 1.025 }} _hover={{ cursor: "pointer" }}>
        <AspectRatio ratio={1 / 1}>
          <Box>
            <Box bg="black" pos="absolute" w="full" h="full" opacity="0.05" />
            <Box pos="relative" w="full" h="full">
              <Image
                src={imageUrl}
                objectFit="cover"
                sizes="200"
                quality={25}
                layout="fill"
              />
            </Box>
            <Box pos="absolute" left={0} top={0}>
              <Box>
                <Box bg="gray.50" maxW="75%" p={4}>
                  <Heading size="sm">{title}</Heading>
                </Box>
                <Box bg="gray.50" p={4} d="inline-block">
                  <Text>{price} EUR</Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </AspectRatio>
      </MotionBox>
    </Link>
  );
};

export default ProductCard;
