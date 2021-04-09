import { FC } from "react";
import {
  Box,
  Stack,
  Link as CLink,
  VStack,
  StackDivider,
  Container,
  Heading,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import InstagramIcon from "@components/icons/Instagra";
import DHLIcon from "@components/icons/DHL";

const Footer: FC = () => {
  return (
    <Box bg="purple.700" p={4} color="white" as="footer" py={10}>
      <Container maxW="120rem">
        <Stack direction={["column", "row"]} justify="space-between">
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
            //shadow="md"
            borderRadius="md"
          >
            <Heading fontWeight="bold" size="sm">
              INFORMATIONEN
            </Heading>
            <Link href={`/versand/`}>
              <CLink>Versand</CLink>
            </Link>
            <Link href={`/impressum/`}>
              <CLink>Impressum</CLink>
            </Link>
            <Link href={`/kontakt/`}>
              <CLink>Kontakt</CLink>
            </Link>
            <Link href={`/agb/`}>
              <CLink>AGB</CLink>
            </Link>
          </VStack>
          <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
            <Heading size="sm" fontWeight="bold">
              ANDERE PLATTFORMEN
            </Heading>
            <CLink href="https://www.cardmarket.com/de/Pokemon/Users/25-ms">
              <Image src="/badge.jpg" alt="Image of Cardmarket" width={100} height={100} />
            </CLink>
          </VStack>
          <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
            <Heading size="sm" fontWeight="bold">
              FOLGE UNS AUF
            </Heading>
            <CLink href="https://www.youtube.com/c/spacemonkedits">
              <Image src="/yt.png" alt="Image of Cardmarket" width={100} height={100} />
            </CLink>
            <CLink variant="unstyled" href="https://www.instagram.com/cardmonster.de/">
              <InstagramIcon boxSize={20} color="black" />
            </CLink>
          </VStack>
          <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
            <Heading size="sm" fontWeight="bold">
              VERSAND
            </Heading>
            <Link href="/versand/">
              <CLink variant="unstyled">
                <DHLIcon boxSize={200} color="black" />
              </CLink>
            </Link>
          </VStack>
        </Stack>
        <Box bg="purple.700" mt="10" shadow="md">
          {" "}
          © 2021 Cardmonster.de
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
