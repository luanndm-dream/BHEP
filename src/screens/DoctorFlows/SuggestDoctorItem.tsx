import { Image, StyleSheet, Text, View,TouchableOpacity } from "react-native";
import React from "react";
import { globalStyle } from "src/constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface SuggestDoctorItemProps {
  name: string;
  specialist: string;
  rate?: number,
  image?: any,
  onPress: (id: any) => void
}
const SuggestDoctorItem: React.FC<SuggestDoctorItemProps> = ({
  name,
  specialist,
  rate,
  image,
  onPress
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
       source={{uri: image}}
        style={{ height: 60, width: 60, borderRadius: 30 }}
        resizeMode="contain"
      />
      <View style={styles.subContainer}>
        <View>
          <Text style={[globalStyle.textNormal, {fontWeight: 'bold'}]}>{name}</Text>
          <Text style={globalStyle.textNormal}>{specialist}</Text>
        </View>
        <View style={styles.rateContainer}>
          <View style={{flexDirection:'row', alignItems: 'center'}}>
          <Text style={globalStyle.textNormal}>{rate}</Text>
          <MaterialCommunityIcons name="star" size={30} color='#ffbe00'/>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SuggestDoctorItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: 'white',
    marginVertical: 8,
    borderRadius: 8,
    padding: 8
  },
  subContainer: {
    marginLeft: 12,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between'
  },
  rateContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end'
  }
});
