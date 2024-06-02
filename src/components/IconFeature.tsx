import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

interface IconFeatureProps {
  name: string;
  imgUrl: any;
  onPress?: () => void;
}

const IconFeature: React.FC<IconFeatureProps> = ({ name, imgUrl, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Image source={imgUrl} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

export default IconFeature;

const styles = StyleSheet.create({
  container: {

    alignItems: "center",
    width:80,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
   
    paddingHorizontal: 4, // Add padding for better text wrap
  },
});
