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

const RootApp = () => {
  return (
    <>
    
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar backgroundColor={"transparent"} />
        <SafeAreaProvider>
          <RootNavigation />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </>
  );
};

function App(): JSX.Element {
  return (
      <RootApp />
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default App;
