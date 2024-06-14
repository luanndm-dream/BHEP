import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import { Header } from "@/components";

const WebViewScreen = () => {
  return (
    <>
    <Header headerTitle="Thanh toans"/>
    <WebView source={{ uri: "https://reactnative.dev/" }} style={{ height: 200 }} />
    </>
  );
};

export default WebViewScreen;

const styles = StyleSheet.create({});
