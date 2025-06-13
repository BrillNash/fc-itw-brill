import dotenv from 'dotenv'
import { Datastore } from "@google-cloud/datastore";
dotenv.config()

export const datastore = new Datastore({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  databaseId: 'test-database'
})
