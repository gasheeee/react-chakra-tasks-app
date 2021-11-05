interface ClientType {
  googleAuthInstance?: gapi.auth2.GoogleAuth;
  isSignedIn?: boolean;
}

type resType = { isSignedIn?: boolean };

export const client: ClientType = {};

export const authorization = async (): Promise<resType> => {
  const res: resType = await new Promise(async (resolve, reject) => {
    await gapi.load('client:auth2', async () => {
      await gapi.client
        .init({
          apiKey: import.meta.env.SNOWPACK_PUBLIC_API_KEY,
          clientId: import.meta.env.SNOWPACK_PUBLIC_CLIENT_ID,
          discoveryDocs: import.meta.env.DISCOVERY_DOCS,
          scope: import.meta.env.SCOPES,
        })
        .then(() => {
          client.googleAuthInstance = gapi.auth2.getAuthInstance();
          client.googleAuthInstance.isSignedIn.listen((isSignedIn: boolean) => {
            client.isSignedIn = isSignedIn;
          });
          client.isSignedIn = client.googleAuthInstance.isSignedIn.get();
          resolve({ isSignedIn: client.isSignedIn });
        })
        .catch((error) => {
          reject(error);
          throw new Error(error);
        });
    });
  });
  return res;
};
