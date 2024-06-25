import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  CARD_DOCTOR_LENGTH,
  SIDECARD_LENGTH,
  SPACING,
} from "src/constants/size";
import Animated, {
  interpolate,
  Extrapolation,
  useAnimatedStyle,
} from "react-native-reanimated";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Text } from "react-native";
import { globalStyle } from "src/constants";
import { apiGetSpecialist } from "src/api/api_get_Specialist";

interface ItemDoctorProps {
  imgUrl: any;
  onPress: () => void;
  index: number;
  scrollX: Animated.SharedValue<number>;
  rate?: number;
  fullName: string;
  specialistId: number;
}

const ItemDoctor: React.FC<ItemDoctorProps> = ({
  imgUrl,
  index,
  scrollX,
  onPress,
  rate,
  fullName,
  specialistId,
}) => {
  const [specialist, setSpecialist] = useState<any[]>([]);
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
      Extrapolation.CLAMP
    );
    return {
      transform: [{ scaleY: scale }],
    };
  });

  useEffect(() => {
    apiGetSpecialist().then((res:any)=>{
      if (res.statusCode === 200) {
        setSpecialist(res.data.items);
      }
    })
  }, []);

  const getSpecialistName = (id: number): string => {
    const foundSpecialist = specialist.find((item) => item.id === id);
    return foundSpecialist ? foundSpecialist.name : "Không xác định";
  };

  return (
    <TouchableOpacity onPress={onPress}>
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
        <View style={styles.rateContainer}>
          <MaterialCommunityIcons name="star" size={20} color="#266deb" />
          <Text style={[globalStyle.textNormal, { marginLeft: 6 }]}>
            {rate}
          </Text>
        </View>

        <Image
          source={{ uri: imgUrl }}
          style={styles.image}
          resizeMode="stretch"
        />
        <View style={styles.inforContainer}>
          <Text style={[globalStyle.textNormal, styles.fullName]}>
            Bác sĩ. {fullName}
          </Text>
          <Text style={[globalStyle.textNormal, styles.specialist]}>
            Chuyên khoa: {getSpecialistName(specialistId)}
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ItemDoctor;

const styles = StyleSheet.create({
  card: {
    height: 280,
    overflow: "hidden",
    borderRadius: 12,
    backgroundColor: "#EFF9FB",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8
  },
  image: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    padding: 8,
    borderRadius: 12,
    flex: 1 // Add padding here
  },
  rateContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 3,
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 2,
    flexDirection: "row",
  },
  inforContainer: {
    alignSelf: "flex-start",
    padding: 8,
    marginLeft: 12,
  },
  fullName: {
    fontWeight: "700",
    fontSize: 16,
  },
  specialist: {
    fontWeight: "400",
    color: "grey",
    marginTop: 4,
    fontSize: 14,
  },
});
