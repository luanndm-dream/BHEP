import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { TextInputProps } from "react-native-paper";

interface TextInputNoIconProps extends TextInputProps {
  onChangeText: (text: string) => void;
  placeholderText?: string;
  isPassword?: boolean;
}
const TextInputNoIcon: React.FC<TextInputNoIconProps> = ({
  onChangeText,
  placeholderText,
  isPassword,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholderText}
        {...props}
        style={styles.input}
        placeholderTextColor={"#f8f8f8dd"}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default TextInputNoIcon;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    height: 45,
    borderColor: "white",
  },
  input: {
    flex: 1,
    padding: 10,
    color: "white",
  },
});
