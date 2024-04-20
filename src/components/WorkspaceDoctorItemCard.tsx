import { Image, StyleSheet, Text, TouchableOpacity,View } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { globalFontSize } from "src/constants/fontSize";

interface DoctorWorkspaceItemCardProps {
  imgUrl?: any;
  label?: string;
  iconLastName?: any;
}
const WorkspaceDoctorItemCard: React.FC<DoctorWorkspaceItemCardProps> = ({
    imgUrl,
  label,
  iconLastName,
}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.titleContainer}>
      <Image source={imgUrl} style={styles.image}/>
      <Text style={styles.label}>{label}</Text>
      </View>
      <MaterialCommunityIcons name={iconLastName} size={30} />
    </TouchableOpacity>
  );
};

export default WorkspaceDoctorItemCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 10,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: "center",
    paddingHorizontal: 12,
    height: 70,
    borderRadius: 12
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: "center"
  },
  image: {
    height: 40,
    width: 40,
    marginRight: 20
  },
  label: {
    fontSize: globalFontSize.lableFont,
    fontWeight: '500',
    color:"black"
  }
});
