import React, { useEffect, useRef } from "react";
import { Animated, Easing, Image, StyleSheet, View } from "react-native";
import { globalColor } from "src/constants/color";

interface PulseIndicatorProps {
  isDataNew?: boolean;
}

const PulseIndicator: React.FC<PulseIndicatorProps> = ({ isDataNew }) => {
  const scale1 = useRef(new Animated.Value(1)).current;
  const opacity1 = useRef(new Animated.Value(1)).current;
  const scale2 = useRef(new Animated.Value(1)).current;
  const opacity2 = useRef(new Animated.Value(1)).current;

  const pulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale1, {
            toValue: 1.4,
            duration: 1250,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacity1, {
            toValue: 0,
            duration: 1250,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scale2, {
            toValue: 1.4,
            duration: 1250,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacity2, {
            toValue: 0,
            duration: 1250,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  };

  useEffect(() => {
    if (isDataNew) {
      // Reset animation values before starting new animation
      scale1.setValue(1);
      opacity1.setValue(1);
      scale2.setValue(1);
      opacity2.setValue(1);
      pulseAnimation();
    } else {
      // Stop the animation when isDataNew becomes false
      scale1.stopAnimation();
      opacity1.stopAnimation();
      scale2.stopAnimation();
      opacity2.stopAnimation();
    }
  }, [isDataNew]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circle,
          { transform: [{ scale: scale1 }], opacity: opacity1 },
        ]}
      />
      <Animated.View
        style={[
          styles.circle,
          { transform: [{ scale: scale2 }], opacity: opacity2 },
        ]}
      />
      <Image
        source={require("../../assets/image/logo.png")}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: globalColor.secondaryColor,
    position: "absolute",
  },
  image: {
    position: "absolute",
    width: 50,
    height: 50,
    zIndex: 1, // Make sure image is above the circles
  },
});

export default PulseIndicator;
