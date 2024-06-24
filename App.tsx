/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import type { PropsWithChildren } from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigation from "./src/navigation/RootNavigation";
import { globalStyle } from "./src/constants/";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import { useAppSelector } from "@/redux";
import { LoadingOverlay } from "./src/components";
import { globalColor } from "./src/constants/color";
import DeviceInfo from "react-native-device-info";
import Toast from "react-native-toast-message";
const RootApp = () => {
  const isLoading = useAppSelector((state) => state.app.loading);
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="transparent"
          barStyle={"dark-content"}
          translucent
        />
        <SafeAreaProvider>
          <RootNavigation />
          <Toast />
          {isLoading && <LoadingOverlay />}
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </>
  );
};

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={"transparent"} barStyle={"dark-content"} />
      <RootApp />
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
