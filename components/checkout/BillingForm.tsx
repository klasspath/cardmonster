import { FC, useState } from "react";
import { Checkout } from "@components/layout";
import Head from "next/head";
import {
  Button,
  Heading,
  Box,
  Container,
  Stack,
  FormControl,
  Input,
  FormLabel,
  SimpleGrid,
  GridItem,
  Wrap,
  Text,
  Link as ChakraLink,
  FormErrorMessage,
} from "@chakra-ui/react";
import Link from "next/link";
import { Formik, Field, Form } from "formik";

type BillingFormValues = {
  email: string;
  firstName: string;
  lastName: string;
  street: string;
  extendedAddress: string;
  city: string;
  state: string;
};

type BillingFormProps = {
  onSubmit: (values: BillingFormValues) => void | Promise<any>;
};

const BillingForm: FC<BillingFormProps> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        email: "",
        firstName: "",
        lastName: "",
        street: "",
        extendedAddress: "",
        city: "",
        state: "",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        await onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Stack spacing="5">
            <Field name="email">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel htmlFor="email">E-Mail-Adresse</FormLabel>
                  <Input {...field} id="email" variant="filled" />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Stack direction="row">
              <Field name="firstName">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.name && form.touched.name}>
                    <FormLabel htmlFor="firstName">Vorname</FormLabel>
                    <Input {...field} id="firstName" variant="filled" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="lastName">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.name && form.touched.name}>
                    <FormLabel htmlFor="lastName">Nachname</FormLabel>
                    <Input {...field} id="lastName" variant="filled" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Stack>
            <Field name="street">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel htmlFor="street">Straße</FormLabel>
                  <Input {...field} id="street" variant="filled" />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="city">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel htmlFor="city">Stadt</FormLabel>
                  <Input {...field} id="city" variant="filled" />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Stack direction="row">
              <Field name="state">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.name && form.touched.name}>
                    <FormLabel htmlFor="state">Bundesland</FormLabel>
                    <Input {...field} id="state" variant="filled" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="postalCode">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.name && form.touched.name}>
                    <FormLabel htmlFor="PostalCode">Postleitzahl</FormLabel>
                    <Input {...field} id="postalCode" variant="filled" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Stack>
          </Stack>
          <Wrap mt="12">
            <Button type="submit" colorScheme="purple" isLoading={isSubmitting}>
              Weiter
            </Button>
            <Link href="/checkout" passHref>
              <Button as="a" type="button">
                Bezahlmethode ändern
              </Button>
            </Link>
          </Wrap>
        </Form>
      )}
    </Formik>
  );
};

export default BillingForm;
