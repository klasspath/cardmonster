import { FC } from "react";
import {
  Center,
  Box,
  Input,
  FormControl,
  Stack,
  Button,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useGlobalState } from "@components/core";
import { Logo } from "@components/core";

const SignUpView: FC = () => {
  const { setModalView } = useGlobalState();

  return (
    <Box py={10} px={4}>
      <Center mb={14}>
        <Logo boxSize={20} color="purple.500" />
      </Center>
      <Stack spacing={4}>
        <FormControl>
          <Input type="text" name="firstName" placeholder="Vorname" />
        </FormControl>
        <FormControl>
          <Input type="text" name="lastName" placeholder="Nachname" />
        </FormControl>
        <FormControl>
          <Input type="text" name="email" placeholder="E-Mail" />
        </FormControl>
        <FormControl>
          <Input type="password" name="password" placeholder="Passwort" />
        </FormControl>
        <Alert status="info" size="sm">
          <AlertIcon />
          <AlertDescription fontSize="sm">
            <b>Info:</b> Das Passwort muss mindestens 7 Zeichen lang sein und Nummern enthalten.
          </AlertDescription>
        </Alert>
        <Button type="submit" isFullWidth colorScheme="purple">
          Registrieren
        </Button>
        <Text align="center" fontSize="sm">
          Du hast bereits einen Account?{" "}
          <Button variant="link" fontSize="sm" onClick={() => setModalView("LOGIN")}>
            Log-in
          </Button>
        </Text>
      </Stack>
    </Box>
  );
};

export default SignUpView;
