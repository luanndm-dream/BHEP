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

const RootApp = () => {
  return (
    <>
    
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar backgroundColor={"transparent"} />
        <SafeAreaProvider >
          <RootNavigation />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </>
  );
};

function App(): JSX.Element {
  return (
    <SafeAreaView style={globalStyle.droidSafeArea}>
      <RootApp />
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  
});

export default App;
