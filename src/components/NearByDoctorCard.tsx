import { Image, StyleSheet, Text, View,TouchableOpacity } from "react-native";
import React from "react";
import { globalFontSize } from "src/constants/fontSize";
import { globalColor } from "src/constants/color";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface NearByDoctorProps {
  fullName: string;
  major: string;
  imgBase64?: string;
  roleId?: number
  lat?: string;
  lng?: string;
  onPress: () => void
}
const NearByDoctorCard: React.FC<NearByDoctorProps> = ({
  fullName,
  major,
  imgBase64,
  lat,
  lng,
  roleId,
  onPress
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={require("../assets/image/doctor.png")}
        style={styles.img}
      />
      <View style={styles.valueContainer}>
        <View style={styles.tagContainer}>
          <MaterialCommunityIcons name="check-decagram" color={'blue'} size={15}/>
          <Text style={{color: globalColor.blue}}> Đã xác thực</Text>
        </View>
        <Text style={styles.textName}>{fullName}</Text>
        <Text style={styles.textMajor}>{major}</Text>
        <View style={styles.footerContainer}>
          <Text style={{fontSize: globalFontSize.tag, color: globalColor.grey}}>{lat}</Text>
          <Text style={{fontSize: globalFontSize.tag, color: globalColor.grey}}> {lng}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NearByDoctorCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e3e1e1",
    flexDirection: "row",
    borderRadius: 12,
    height: 100,
    alignItems: "center",
    paddingHorizontal: 12,
  },
  tagContainer:{
    backgroundColor: globalColor.backgroundTag,
    borderRadius: 10,
    height: 20,
    width: '90%',
    flexDirection: "row",
    paddingHorizontal: 12,
    // justifyContent: 'space-between',
    alignItems: "center"
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  footerContainer: {
    flexDirection: "row",
    marginTop:5
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
    paddingHorizontal: 15,
    justifyContent: "center"
  },
});
