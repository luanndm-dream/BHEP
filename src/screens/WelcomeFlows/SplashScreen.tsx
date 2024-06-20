import { ActivityIndicator, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";
import { ImageBackground } from "react-native";
import { globalColor } from "src/constants/color";

const SplashScreen = () => {
    const {width, height} = useWindowDimensions();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/slides/Onboarding1.png")}
        style={{ flex: 1 }}
      />
      <ActivityIndicator color='white' size={"large"} style={{ position: 'absolute', left: '50%', marginLeft: -22, top: '70%'}} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
