import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalFontSize } from "src/constants/fontSize";
import { globalColor } from "src/constants/color";
interface NearByDoctorProps {
  fullName: string;
  major: string;
  imgBase64?: string;
  lat?: string;
  lng?: string;
}
const NearByDoctorCard: React.FC<NearByDoctorProps> = ({
  fullName,
  major,
  imgBase64,
  lat,
  lng,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/image/doctor.png")}
        style={styles.img}
      />
      <View style={styles.valueContainer}>
        <Text style={styles.textName}>{fullName}</Text>
        <Text style={styles.textMajor}>{major}</Text>
        <View style={styles.footerContainer}>
          <Text>{lat}</Text>
          <Text>{lng}</Text>
        </View>
      </View>
    </View>
  );
};

export default NearByDoctorCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 12,
    height: 90,
    alignItems: "center"
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  footerContainer: {
    flexDirection: "row",
  },
  textName:{
    fontSize: globalFontSize.lableFont,
    fontWeight: 'bold',
    color: 'black'
  },
  textMajor: {
    fontSize: globalFontSize.description,
    color: globalColor.grey
  },
  valueContainer:{
    paddingHorizontal: 15
  },
  footer: {
    marginTop: 100
  }
});
