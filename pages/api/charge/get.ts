import { VercelRequest, VercelResponse } from "@vercel/node";
import * as z from "zod";

import { Client, resources } from "coinbase-commerce-node";

Client.init(process.env.COINBASE_API_KEY || "");

const { Charge } = resources;

const Request = z.string();

export default async (request: VercelRequest, response: VercelResponse) => {
  const id = request.body.id

  const charge = await Charge.retrieve(id);

  response.send(charge);
};
