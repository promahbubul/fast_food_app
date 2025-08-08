import { CreateUserPrams, SignInParams } from "@/type";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const appWriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  platform: "com.combosoft.fastfood",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: "688f708b0005cb62efa7",
  userCollectionId: "688f70c40023a46a6600",
};

export const client = new Client();
client
  .setEndpoint(appWriteConfig.endpoint)
  .setProject(appWriteConfig.projectId)
  .setPlatform(appWriteConfig.platform);

const account = new Account(client);
const databases = new Databases(client);
const avatar = new Avatars(client);

export const createUser = async ({
  email,
  password,
  name,
}: CreateUserPrams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw Error;
    await signIn({ email, password });

    const avatarUrl = avatar.getInitialsURL(name);

    return await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        name,
        avatar: avatarUrl,
      }
    );
  } catch (error) {
    throw new Error(error as string);
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    throw new Error(error as string);
  }
};
