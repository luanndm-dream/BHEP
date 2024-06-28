import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

interface CircleComponentProps {
  size: number;
  onPress?: () => void;
  backgroundColor?: any;
  children?: React.ReactNode;  // Thêm thuộc tính children vào interface
}

const CircleComponent: React.FC<CircleComponentProps> = ({
  backgroundColor,
  size,
  onPress,
  children,  // Thêm children vào destructuring
}) => {
  let borderRadius = size / 2;
  return (
    <TouchableOpacity
      style={{
        height: size,
        width: size,
        borderRadius: borderRadius,
        backgroundColor: backgroundColor ? backgroundColor : "white",
        justifyContent: 'center', // Đảm bảo children được căn giữa
        alignItems: 'center',
      }}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

export default CircleComponent;

const styles = StyleSheet.create({});
