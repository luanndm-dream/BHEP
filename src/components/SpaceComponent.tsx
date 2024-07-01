import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface SpaceComponentProps {
  height: number;
}
const SpaceComponent: React.FC<SpaceComponentProps> = ({ height }) => {
  return <View style={{ height, flex: 1 }} />;
};

export default SpaceComponent;

const styles = StyleSheet.create({});