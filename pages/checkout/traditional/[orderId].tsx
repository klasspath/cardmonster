import { Checkout } from "@components/layout";
import { PayPalButtons } from "@paypal/react-paypal-js";

const Order = () => {
  return <PayPalButtons />;
};

Order.Layout = Checkout;

export default Order;
