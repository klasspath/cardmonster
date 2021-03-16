import { FC } from "react";
import {
  Box,
  Stack,
  Link as CLink,
  VStack,
  StackDivider,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import InstagramIcon from "@components/icons/Instagra";
import DHLIcon from "@components/icons/DHL";

const Footer: FC = () => {
  return (
    <Box bg="#7828ff" w="100%" p={4} color="white">
      <Stack
        direction={["column", "row"]}
        spacing="50px"
        justify="space-between"
      >
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
          fontWeight="bold"
          //shadow="md"
          borderRadius="md"
        >
          <h1>INFORMATIONEN</h1>
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
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          <h2>ANDERE PLATTFORMEN</h2>
          <CLink href="https://www.cardmarket.com/de/Pokemon/Users/25-ms">
            <Image
              src="/badge.jpg"
              alt="Image of Cardmarket"
              width={100}
              height={100}
            />
          </CLink>
        </VStack>
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          <h2>FOLGE UNS AUF</h2>
          <CLink href="https://www.youtube.com/c/spacemonkedits">
            <Image
              src="/yt.png"
              alt="Image of Cardmarket"
              width={100}
              height={100}
            />
          </CLink>
          <CLink
            variant="unstyled"
            href="https://www.instagram.com/cardmonster.de/"
          >
            <InstagramIcon boxSize={20} color="black" />
          </CLink>
        </VStack>
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          <h2>VERSAND</h2>
          <Link href="/versand/">
            <CLink variant="unstyled">
              <DHLIcon boxSize={200} color="black" />
            </CLink>
          </Link>
        </VStack>
      </Stack>
      <Box bg="#7828ff" mt="10" shadow="md">
        {" "}
        © 2021 Cardmonster.de
      </Box>
    </Box>
  );
};

export default Footer;
