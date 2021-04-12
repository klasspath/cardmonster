import { VercelRequest, VercelResponse } from "@vercel/node";
import * as z from "zod";

import { Client, resources } from "coinbase-commerce-node";
import db from "@api/db";
import { Create } from "faunadb";
import axios from "axios";
Client.init(process.env.COINBASE_API_KEY || "");

const { Charge } = resources;

const ProductIds = z.array(z.string());

const Shipping = z.object({
  firstName: z.string(),
  lastName: z.string(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  state: z.string(),
  postalCode: z.string(),
});

const Request = z.object({
  productIds: ProductIds,
  email: z.string().email(),
  shipping: Shipping,
});

interface ProductsResponse {
  id: string;
  title: string;
  stock: number;
  price: number;
}

export default async (request: VercelRequest, response: VercelResponse) => {

  if (!process.env.API_URL) return response.send(500)

  const products: ProductsResponse[] = await axios.post(process.env.API_URL, {
    query: `
      query {
        products(where: {id_in: ["ckmatieuwv3770a632jwzfdae", "ckmar4p7k30tq0b10sdwg5ujt"]}) {
          id
          title
          stock
          price
        }
      }
    `
  }).then(res => res.data.data.products)

  const price = products.reduce((acc, product) => acc + product.price, 0)

  const order = await axios.post(process.env.API_URL, {
    query: `
      mutation CreateOrder($data: OrderCreateInput!) {
        order: createOrder(data: $data) {
          id
          price
        }
      }
    `,
    variables: {
      data: {
        firstName: "Kevin",
        lastName: "Hoppe",
        street: "Pastor-Moritz-Straße 1a",
        city: "Potsdam",
        postalCode: "14476",
        email: "hoppe-businnes@web.de",
        isPaid: false,
        price,
      }
    }
  }, {
    headers: {
      'Authorization': 'Bearer ' + process.env.GRAPHCMS_SERVER_KEY
    }
  }).then(res => res.data.data.order)

  const charge = await Charge.create({
    name: "Glumanda",
    description: "A useless but sweat Pokemon",
    local_price: {
      amount: "10.00",
      currency: "EUR",
    },
    pricing_type: "fixed_price",
    metadata: {
      id: order.id
    },
  });

  response.send(charge);
};
