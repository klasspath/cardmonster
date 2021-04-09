import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import { resources } from "coinbase-commerce-node";

export default async function (req: VercelRequest, res: VercelResponse) {
  const { event } = req.body

  if (!process.env.API_URL) return res.send(500)

  switch (event.type) {
    case "charge:confirmed":
      await axios.post(process.env.API_URL, {
        query: `
          mutation UpdateOrder($id: ID!) {
            updateOrder(where: { id: $id}, data: {
              isPaid: true
            }) {
              id
            }
          }
        `,
        variables: {
          id: event.data.metadata.id || "ckn54o75clzng0b07lg8kvin9"
        }
      }, {
        headers: {
          'Authorization': 'Bearer ' + process.env.GRAPHCMS_SERVER_KEY
        }
      }).then(res => res.data.data.order)
  }

  res.status(200).end()
}