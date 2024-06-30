import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React from "react";
import { globalColor } from "src/constants/color";

interface TextInputWithIconProps extends TextInputProps {
  label?: string;
  placeholderText?: string;
  onChangeText?: (text:any) => void,
  isNumber?: boolean;
  isPassword?: boolean, 
  height?: number
}
const TextInputWithIcon: React.FC<TextInputWithIconProps> = ({
  label,
  onChangeText,
  isNumber,
  placeholderText,
  isPassword,
  height,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={{ color: "black" }}>{label}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
        style={{height: height? height : 60, color: 'black'}}
        autoCapitalize="none"
        secureTextEntry={isPassword}
          placeholder={placeholderText}
          keyboardType={isNumber ? "numeric" : "default"}
          onChangeText={onChangeText}
          {...props}
        />
      </View>
    </View>
  );
};

export default TextInputWithIcon;

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  labelContainer: { // Same color as background
    alignSelf: "flex-start", // Have View be same width as Text inside
    paddingHorizontal: 3, // Amount of spacing between border and first/last letter
    marginStart: 10, // How far right do you want the label to start
    zIndex: 1, // Label must overlap border
    elevation: 0.5, // Needed for android
    shadowColor: "white", // Same as background color because elevation: 1 creates a shadow that we don't want
    position: "absolute", // Needed to be able to precisely overlap label with border
    top: -12,
    backgroundColor: globalColor.backgroundColor // Vertical
  },
  inputContainer: {
    borderWidth: 1, // Create border
    borderRadius: 8, // Not needed. Just make it look nicer.
    padding: 8, // Also used to make it look nicer
    zIndex: 0,
    height: 55,
    justifyContent: "center",
  },
});
