import {
  Button,
  Heading,
  Box,
  Stack,
  Wrap,
  Text,
  useRadio,
  useRadioGroup,
  RadioProps,
  Icon,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import Link from "next/link";
import { Checkout as CheckoutLayout } from "@components/layout";
import { FaBitcoin, FaCreditCard } from "react-icons/fa";
import { IconType } from "react-icons";

type PaymentSelectionCardProps = {
  title: string;
  description: string;
  icon: IconType;
} & RadioProps;

const PaymentSelectionCard: FC<PaymentSelectionCardProps> = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="3px"
        _checked={{
          borderColor: "purple.500",
          bg: "gray.100",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        p="5"
        textAlign="center"
        w="full"
      >
        <Icon as={props.icon} mb="2" h="6" w="6" />
        <Heading size="md" mb="2">
          {props.title}
        </Heading>
        <Text>{props.description}</Text>
      </Box>
    </Box>
  );
};

type PaymentMethod = "traditional" | "crypto";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("traditional");

  const { getRadioProps } = useRadioGroup({
    name: "paymentMethod",
    defaultValue: paymentMethod,
    onChange: (v) => setPaymentMethod(v.toString() as PaymentMethod),
  });

  const options = [
    {
      title: "Standard",
      value: "traditional",
      description: "Lastschrift, Sofort, Kreditkarte & PayPal",
      icon: FaCreditCard,
    },
    {
      title: "Kryptowährung",
      value: "crypto",
      description: "Bitcoin, Ethereum, Litecoin & Dai",
      icon: FaBitcoin,
    },
  ];

  return (
    <Box>
      <Box>
        <Heading size="lg" mb="1">
          Bitte wähle Deine Zahlungsmethode
        </Heading>
        <Text>Du kannst Dich hier über das Bezahlen mit Kryptowährungen schlau machen.</Text>
      </Box>
      <Box pt="10">
        <Stack direction="row">
          {options.map(({ value, title, description, icon }) => {
            const radio = getRadioProps({ value });
            return (
              <PaymentSelectionCard
                key={value}
                title={title}
                description={description}
                {...radio}
                icon={icon}
              >
                {value}
              </PaymentSelectionCard>
            );
          })}
        </Stack>
      </Box>
      <Wrap pt="10">
        <Link href={`/checkout/${paymentMethod}`} passHref>
          <Button colorScheme="purple" as="a">
            Weiter
          </Button>
        </Link>
      </Wrap>
    </Box>
  );
};

Checkout.Layout = CheckoutLayout;

export default Checkout;
