import { VercelRequest, VercelResponse } from "@vercel/node";
import * as z from "zod";
import { client } from "@api/db";
import { Get, Match, Index } from "faunadb";
import { sign } from "jsonwebtoken";

const credentialsVal = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    const data = credentialsVal.parse(request.body);
    const res = await client.query<any>(Get(Match(Index("user_by_email"), data.email)));
    const jwt = sign({ id: res.ref }, "asuid");
    response.status(200).send(jwt);
  } catch (error) {
    response.status(500).send(error);
  }
};
