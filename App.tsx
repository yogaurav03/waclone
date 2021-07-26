import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

// import Auth from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';

// import Amplify from 'aws-amplify'
import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import config from './src/aws-exports';
Amplify.configure(config)



function App() {

  // run this only when app is first mounted
useEffect(() => {
  const fetchUser = async () => {
    const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });
    console.log('userInfo', userInfo);
  }
  fetchUser();
}, [])

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);