import React, { FC, useEffect, useState } from 'react';
import { Box, Button, useRadio } from '@chakra-ui/react';
import { Header } from '../molecules/Header';

export const App: FC = () => {
  //生成したgapi.auth2インスタンス
  const [googleAuthInstance, setGoogleAuthInstance] = useState<gapi.auth2.GoogleAuth>();
  //サインイン状態かどうか
  const [isSignedIn, setIsSignedIn] = useState<Boolean>(false);

  const initClient = () => {
    //APIリクエストを行うために使用するgapi.client objectを初期化
    gapi.client
      .init({
        apiKey: import.meta.env.SNOWPACK_PUBLIC_API_KEY,
        clientId: import.meta.env.SNOWPACK_PUBLIC_CLIENT_ID,
        discoveryDocs: import.meta.env.DISCOVERY_DOCS,
        scope: import.meta.env.SCOPES,
      })
      .then(() => {
        setGoogleAuthInstance(gapi.auth2.getAuthInstance());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateSignInStatus = (isSignedIn: Boolean) => {
    setIsSignedIn(isSignedIn);
  };

  const handleSignedIn = () => {
    googleAuthInstance?.signIn();
  };

  const handleSignOut = () => {
    googleAuthInstance?.signOut();
  };

  useEffect(() => {
    if (!gapi) return;
    //初期インスタンス生成
    gapi.load('client:auth2', initClient);
  }, [gapi]);

  useEffect(() => {
    if (!googleAuthInstance) return;
    googleAuthInstance.isSignedIn.listen(updateSignInStatus);
    updateSignInStatus(googleAuthInstance.isSignedIn.get());
  }, [googleAuthInstance, isSignedIn]);

  return (
    <Box>
      <Header isSignedIn={isSignedIn} onAuthorizationClick={isSignedIn ? handleSignOut : handleSignedIn}></Header>
    </Box>
  );
};
