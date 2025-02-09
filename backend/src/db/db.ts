
import logger from "@/logger";
import { MONGO_URI } from "@/secrets";
import { MongoClient, ServerApiVersion } from 'mongodb'
const uri =  MONGO_URI;

/**
 * @description db connection
 * @author Shakthi NR
 */

const client = new MongoClient(uri as string, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let dbInstance: any = null;
const dbName = "foodDb";

async function connectDB() {
  try {
    await client.connect();
    dbInstance = client.db(dbName);
    logger.info("Mongo DB Connected ...");
  } catch (error) {
    logger.error("Mongo DB Connection Error:", error);
    process.exit(1);
  }
}

function getCollection(collectionName: string) {
  if (!dbInstance) {
      logger.info("Database is not initialized... intializing now");
      dbInstance = client.db(dbName);
  }
  return dbInstance.collection(collectionName);
}


export { client, connectDB, getCollection };