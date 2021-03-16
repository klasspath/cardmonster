import { FC } from "react";
import { Header, Footer } from "@components/core";
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Heading,
  Button,
} from "@chakra-ui/react";
import { Bag } from "@components/core";

const Layout: FC = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Header onOpenBag={onOpen} />
      <Box as="main">{children}</Box>
      <Bag isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
