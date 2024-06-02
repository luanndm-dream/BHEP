import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { CARD_DOCTOR_LENGTH, SIDECARD_LENGTH, SPACING } from "src/constants/size";
import Animated, {
  interpolate,
  Extrapolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface ItemDoctorProps {
  imgUrl: any;
  index: number;
  scrollX: Animated.SharedValue<number>;
}

const ItemDoctor: React.FC<ItemDoctorProps> = ({ imgUrl, index, scrollX }) => {
  const inputRange = [
    (index - 1) * CARD_DOCTOR_LENGTH,
    index * CARD_DOCTOR_LENGTH,
    (index + 1) * CARD_DOCTOR_LENGTH,
  ];

  const cardStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.8, 1, 0.8],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ scaleY: scale }],
    };
  });

  return (
    <Animated.View
      style={[
        styles.card,
        cardStyle,
        {
          width: CARD_DOCTOR_LENGTH,
          marginLeft: index === 0 ? SIDECARD_LENGTH : SPACING,
          marginRight: index === 4 ? SIDECARD_LENGTH : SPACING,
        },
      ]}
    >
      <Image source={imgUrl} style={styles.image} resizeMode="contain" />
    </Animated.View>
  );
};

export default ItemDoctor;

const styles = StyleSheet.create({
  card: {
    height: 150,
    overflow: "hidden",
    borderRadius: 10,
    backgroundColor: 'white'
  },
  image: {
    height: "95%",
    width: "95%",
  },
});
