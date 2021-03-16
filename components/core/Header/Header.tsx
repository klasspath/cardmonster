import { FC } from "react";
import { Box, Container, Stack, Avatar, Button } from "@chakra-ui/react";
import Logo from "../Logo";
import Navigation from "./Navigation";
import SearchBox from "./SearchBox";
import { BagIcon, HeartIcon } from "@components/icons";

interface HeaderProps {
  onOpenBag: () => void;
}

const Header: FC<HeaderProps> = ({ onOpenBag }) => {
  return (
    <>
      <Box w="full" height="10" bg="purple.700"></Box>
      <Box as="header" py={6} px={6}>
        <Container maxW="120rem">
          <Stack direction="row" justify="space-between" align="center">
            <Stack direction="row" align="center" spacing={7}>
              <Logo boxSize={10} color="purple.700" />
              <Navigation />
            </Stack>
            <SearchBox />
            <Stack direction="row" align="center" spacing={7}>
              <HeartIcon boxSize={6} />
              <Button variant="unstyled" onClick={onOpenBag}>
                <BagIcon boxSize={6} />
              </Button>
              <Avatar size="sm" />
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Header;
