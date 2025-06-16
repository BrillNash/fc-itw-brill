import dotenv from 'dotenv'
import { Datastore } from "@google-cloud/datastore";
dotenv.config()

export const datastore = process.env.NODE_ENV === 'production'
? new Datastore({
    databaseId: process.env.GOOGLE_DATABASE_ID
})
: new Datastore({
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    databaseId: process.env.GOOGLE_DATABASE_ID
  });
