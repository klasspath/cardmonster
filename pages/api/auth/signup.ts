import { VercelRequest, VercelResponse } from "@vercel/node";
import * as z from "zod";
import { client } from "@api/db";
import { Create, Collection } from "faunadb";

const userVal = z.object({
  firstName: z.string().max(32),
  lastName: z.string().max(32),
  email: z.string().email().max(64),
  password: z.string().min(8).max(64),
});

export default async (request: VercelRequest, response: VercelResponse) => {
  const data = userVal.parse(request.body);
  const user = await client.query(Create(Collection("users"), { data }));
  response.status(200).send(user);
};
