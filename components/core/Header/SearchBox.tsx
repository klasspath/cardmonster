import { Box, Input, FormControl } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC } from "react";
import { useForm } from "react-hook-form";

const SearchBox: FC = () => {
  const router = useRouter();
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => router.push(`/search?q=${data.term}`);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box width="full">
        <Input
          type="text"
          variant="filled"
          placeholder="Nach Produkten suchen..."
          rounded="none"
          ref={register}
          name="term"
          size="md"
          width="full"
        />
      </Box>
    </form>
  );
};

export default SearchBox;
