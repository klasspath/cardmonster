import db from "@api/db";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { Collection, Create, Ref } from "faunadb";
import * as z from "zod";

const requestValidator = z.object({
  productIds: z.array(z.string()).optional()
});

export default async (req: VercelRequest, res: VercelResponse) => {
  const data = requestValidator.parse(req.body)

  const cart = await db.query<Record<string, unknown>>(Create(Collection("carts"), {
    data: {
      data
    }
  }))

  res.status(200).json(cart.data);
};
