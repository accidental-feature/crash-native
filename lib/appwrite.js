import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const appwriteConfig = {
   endpoint: "https://cloud.appwrite.io/v1",
   platform: 'com.lov.crash',
   projectId: '66d5f7550025258a2507',
   databaseId: '66d5f902001424bc9737',
   userCollectionId: '66d5f91b0021b388a403',
   videoCollectionId: '66d5f9340008bf03b493',
   storageId: '66d5fb9f001b1c322128'
}

const client = new Client();

client
   .setEndpoint(appwriteConfig.endpoint)
   .setProject(appwriteConfig.projectId)
   .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
   try {
      // Create the account with email and password
      const newAccount = await account.create(ID.unique(), email, password, username);
      if(!newAccount) throw new Error('Failed to create account');

      const avatarUrl = await avatars.getInitials(username);

      // Sign in the user
      await signIn(email, password);

      // Create the user document in the database
      const newUser = await databases.createDocument(
         appwriteConfig.databaseId,
         appwriteConfig.userCollectionId,
         ID.unique(),
         {
            accountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl
         }
      )
      return newUser;
   } catch (error) {
      console.error('Error in createUser:', error);
   }
}

export async function signIn(email, password) {
   try {
      const session = await account.createEmailPasswordSession(email, password);
      return session;
   } catch (error) {
      throw new Error(error);
   }
}

export async function getCurrentUser() {
   try {
      const currentAccount = await account.get();
      if(!currentAccount) throw Error;

      const currentUser = await databases.listDocuments(
         appwriteConfig.databaseId,
         appwriteConfig.userCollectionId,
         [
            Query.equal('accountId', currentAccount.$id)
         ]
      )

      if(!currentUser) throw Error;
      return currentUser.documents[0];
   } catch (error) {
      throw new Error(error);
   }
}

export const getAllPosts = async () => {
   try {
      const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.videoCollectionId);
      return posts.documents;
   } catch (error) {
      throw new Error(error);
   }
}

export const getLatestPosts = async () => {
   try {
      const posts = await databases.listDocuments(
         appwriteConfig.databaseId, 
         appwriteConfig.videoCollectionId,
         [Query.orderDesc('$createdAt'), Query.limit(7)],
      );
      return posts.documents;
   } catch (error) {
      throw new Error(error);
   }
}