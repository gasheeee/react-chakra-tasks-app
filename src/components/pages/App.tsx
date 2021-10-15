import React, { FC, useEffect, useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { Header } from '../molecules/Header';

export const App: FC = () => {
  const [isSignedIn, setIsSignedIn] = useState<Boolean>(false);

  const initClient = () => {
    gapi.client
      .init({
        apiKey: import.meta.env.SNOWPACK_PUBLIC_API_KEY,
        clientId: import.meta.env.SNOWPACK_PUBLIC_CLIENT_ID,
        discoveryDocs: import.meta.env.DISCOVERY_DOCS,
        scope: import.meta.env.SCOPES,
      })
      .then(() => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignedInStatus);
        updateSignedInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateSignedInStatus = (isSignedIn: Boolean) => {
    setIsSignedIn(isSignedIn);
  };

  const handleSignedIn = () => {
    gapi.load('client:auth2', initClient);
  };
  useEffect(() => {
    if (!gapi) return;
  }, [isSignedIn, gapi.load]);

  return (
    <Box>
      <Header isSignedIn={isSignedIn} handleSignedIn={handleSignedIn}></Header>
    </Box>
  );
};
