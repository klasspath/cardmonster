import { Center, Box, Input, FormControl, Stack, Button, Text } from "@chakra-ui/react";
import { useGlobalState } from "@components/core";
import { Logo } from "@components/core";
import { FC } from "react";

const LoginView: FC = () => {
  const { setModalView } = useGlobalState();

  return (
    <Box py={10} px={4}>
      <Center mb={14}>
        <Logo boxSize={20} color="purple.500" />
      </Center>
      <Stack spacing={4}>
        <FormControl>
          <Input type="text" name="email" placeholder="E-Mail" />
        </FormControl>
        <FormControl>
          <Input type="password" name="password" placeholder="Passwort" />
        </FormControl>
        <Button type="submit" isFullWidth colorScheme="purple">
          Log-in
        </Button>
        <Text align="center" fontSize="sm">
          Du hast noch keinen Account?{" "}
          <Button variant="link" fontSize="sm" onClick={() => setModalView("SIGNUP")}>
            Registrieren
          </Button>
        </Text>
      </Stack>
    </Box>
  );
};

export default LoginView;
