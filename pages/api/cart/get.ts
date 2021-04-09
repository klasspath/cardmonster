import db from "@api/db";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { Collection, Get, Ref, Update } from "faunadb";
import * as z from "zod";

const requestValidator = z.object({
  cartId: z.string(),
});

export default async (req: VercelRequest, res: VercelResponse) => {
  const data = requestValidator.parse(req.body)

  const cart = await db.query<Record<string, unknown>>(Get(Ref(Collection("carts"), data.cartId)))

  res.status(200).json(cart.data)
};
