import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

interface IconFeatureProps {
  name: string;
  imgUrl?: any;
  onPress?: () => void;
}


const getIconSource = (name:string) => {
  switch (name.trim()) {
    case "Xương khớp":
      return require('../assets/icons/joint.png');
    case "Tim mạch":
      return require('../assets/icons/cardiology.png');
    case "Thần kinh":
      return require('../assets/icons/neurology.png');
    case "Tai Mũi Họng":
      return require('../assets/icons/ent.png');
    case "Răng Hàm Mặt":
      return require('../assets/icons/dentistry.png');
    case "Phụ sản":
      return require('../assets/icons/obstetrics.png');
    case "Nội khoa":
      return require('../assets/icons/internal.png');
    case "Ký sinh trùng":
      return require('../assets/icons/parasite.png');
    case "Hô hấp":
      return require('../assets/icons/respiratory.png');
    case "Dinh dưỡng":
      return require('../assets/icons/nutrition.png');
    default:
      return require('../assets/icons/default.png');
  }
};


const IconFeature: React.FC<IconFeatureProps> = ({ name, imgUrl, onPress }) => {

  const img = getIconSource(name);



  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Image source={imgUrl?imgUrl:img} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

export default IconFeature;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width:90,
    marginVertical: 8
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius:30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: "80%",
    height: "80%",
  },
  name: {
    fontSize: 12,
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 4, // Add padding for better text wrap
  },
});
