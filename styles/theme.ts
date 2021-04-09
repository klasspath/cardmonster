import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: (props) => ({
    body: {
      color: mode("purple.900", "white")(props),
      background: mode("white", "purple.900")(props),
    },
  }),
};

const components = {
  Heading: {
    baseStyle: {
      fontWeight: "bold",
    },
    variants: {
      uppercase: {
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "0.18em",
        fontFamily: "body",
      },
    },
  },
  Button: {
    baseStyle: {
      fontWeight: "normal",
      rounded: "none",
    },
  },
  Text: {},
  Link: {},
  Input: {
    defaultProps: {
      size: "lg",
    },
  },
};

const colors = {
  brand: {},
};

const radii = {};

const shadows = {
  outline: "0 0 0 3px rgba(47, 133, 90, 0.6)",
};

const fonts = {
  body: "'Inter', sans-serif",
  heading: "'Inter', serif",
};

const overrides = {
  colors,
  fonts,
  radii,
  shadows,
  components,
  styles,
};

export default extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  ...overrides,
});
