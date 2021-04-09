import FaunaDB from "faunadb";

const secret = process.env.DATABASE_SECRET as string;

export default new FaunaDB.Client({ secret, keepAlive: false });
