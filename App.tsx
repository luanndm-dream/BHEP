/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import type { PropsWithChildren } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigation from "./src/navigation/RootNavigation";
import { globalStyle } from './src/constants/'
import {store} from './src/redux/store'
import { Provider } from 'react-redux';
import { useAppSelector } from '@/redux'
import { LoadingOverlay } from "./src/components";
const RootApp = () => {
  const isLoading = useAppSelector((state)=>state.app.loading)
  return (
    <>
    
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar backgroundColor={"transparent"} />
        <SafeAreaProvider >
          <RootNavigation />
          {isLoading&&<LoadingOverlay/>}
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </>
  );
};

function App(): JSX.Element {
  return (
    <Provider store={store}>
    <SafeAreaView style={globalStyle.droidSafeArea}>
      <RootApp />
    </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  
});

export default App;
