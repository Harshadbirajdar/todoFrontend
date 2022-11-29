import { Client } from 'appwrite';
import { AppWrite } from '../config';
const appwrite = new Client()
    .setEndpoint(AppWrite.ENDPOINT) // Your API Endpoint
    .setProject(AppWrite.PROJECTID);               // Your project ID

export default appwrite