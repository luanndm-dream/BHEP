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
const RootApp = () => {
  const isLoading = useAppSelector((state) => state.app.loading);
  return (
    <>
     {Platform.OS === "ios" && (
        <View
          style={{
            width: "100%",
            height: 80, // For all devices, even X, XS Max
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: globalColor.primaryColor,
          }}
        />
      )}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar backgroundColor={"transparent"} barStyle={"dark-content"}/>
        <SafeAreaProvider>
          <RootNavigation />
          {isLoading && <LoadingOverlay />}
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

const styles = StyleSheet.create({});

export default App;
