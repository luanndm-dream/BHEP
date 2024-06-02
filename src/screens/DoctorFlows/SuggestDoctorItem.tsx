import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalStyle } from "src/constants";

interface SuggestDoctorItemProps {
  name: string;
  specialist: string;
}
const SuggestDoctorItem: React.FC<SuggestDoctorItemProps> = ({
  name,
  specialist,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/image/doctor.png")}
        style={{ height: 60, width: 60 }}
        resizeMode="contain"
      />
      <View style={styles.subContainer}>
        <Text style={[globalStyle.textNormal, {fontWeight: 'bold'}]}>{name}</Text>
        <Text style={globalStyle.textNormal}>{specialist}</Text>
      </View>
    </View>
  );
};

export default SuggestDoctorItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: 'white',
    marginVertical: 8,
    borderRadius: 8
  },
  subContainer: {
    marginLeft: 12
  }
});
