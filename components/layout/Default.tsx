import { FC } from "react";
import { Header, useGlobalState, Footer } from "@components/core";
import { LoginView, SignupView } from "@components/auth";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  Button,
} from "@chakra-ui/react";
import { Bag } from "@components/core";

const Layout: FC = ({ children }) => {
  const { displayModal, closeModal, modalView } = useGlobalState();

  return (
    <>
      <Header />
      <Box as="main">{children}</Box>
      <Bag />
      <Modal isOpen={displayModal} onClose={closeModal} motionPreset="none" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {modalView === "LOGIN" && <LoginView />}
            {modalView === "SIGNUP" && <SignupView />}
            {modalView === "FORGOT" && <LoginView />}
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
