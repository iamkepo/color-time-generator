import { MongoClient } from 'mongodb';
import { envConst } from '../../helpers/constants.js';

const uri = envConst.MONGODB_URL;
const client = new MongoClient(uri);

export async function dbConnect() {
  try {
    await client.connect();
    console.log(`⚡️[MongoDB]: Connected ${envConst.MONGODB_NAME} successfully`);
  } catch (error) {
    console.error(error);
    await client.close();
  }
}

export const dbCollection = (table) => client.db(envConst.MONGODB_NAME).collection(table)

