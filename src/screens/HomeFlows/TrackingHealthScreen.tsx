import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Header, OnPendingScreen } from "@/components";

const TrackingHealthScreen = () => {
  return (
    <>
      <Header headerTitle="Kiểm tra sức khoẻ" />
      <OnPendingScreen />
    </>
  );
};

export default TrackingHealthScreen;

const styles = StyleSheet.create({});
