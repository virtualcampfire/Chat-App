import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function testDBConnection() {
  try {
    await client.connect();
    await client.db(dbName).command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } 
  catch (error){
    console.log(`Something went wrong: ${error}`);
  }
  finally {
    await client.close();
  }
}

export async function returnAllCollections() {
  try {
    await client.connect();
    const collections = await client.db(dbName).listCollections().toArray();
    console.log("Collections:");
    console.log(collections);
  } 
  catch (error){
    console.log(`Something went wrong: ${error}`);
  }
  finally {
    await client.close();
  }
}

export async function addUserToDB(username, password) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const users = db.collection("users");
    const user = { username: username, password: password };
    const result = await users.insertOne(user);
    console.log(`New user created with the following id: ${result.insertedId}`);
  } 
  catch (error){
    console.log(`Something went wrong: ${error}`);
  }
  finally {
    await client.close();
  }
}

export async function findUserbyIdinDB(id) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const users = db.collection("users");
    const query = { _id: id };
    const user = await users.findOne(query);
    console.log(user);
  } 
  catch (error){
    console.log(`Something went wrong: ${error}`);
  }
  finally {
    await client.close();
  }
}