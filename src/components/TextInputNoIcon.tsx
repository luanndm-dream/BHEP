import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { TextInputProps } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

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
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholderText}
        secureTextEntry={isPassword && !isPasswordVisible}
        {...props}
        style={styles.input}
        placeholderTextColor={"#f8f8f8dd"}
        onChangeText={onChangeText}
      />
      {isPassword && (
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <MaterialCommunityIcons
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={24}
            color="white"
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
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
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 10,
    color: "white",
  },
  icon: {
    padding: 10,
  },
});
