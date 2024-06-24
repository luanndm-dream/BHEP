import { Image, StyleSheet, Text, View,TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { globalStyle } from "src/constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { apiGetSpecialist } from "src/api/api_get_Specialist";

interface SuggestDoctorItemProps {
  name: string;
  specialistId: number;
  rate?: number,
  image?: any,
  onPress: (id: any) => void
}
const SuggestDoctorItem: React.FC<SuggestDoctorItemProps> = ({
  name,
  specialistId,
  rate,
  image,
  onPress
}) => {
  const [specialist, setSpecialist] = useState<any[]>([]);

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
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
       source={{uri: image}}
        style={{ height: 60, width: 60, borderRadius: 30 }}
        resizeMode="contain"
      />
      <View style={styles.subContainer}>
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <Text style={[globalStyle.textNormal, {fontWeight: 'bold'}]}>{name}</Text>
          <Text style={[globalStyle.textNormal,styles.specialist]}>Chuyên khoa: {getSpecialistName(specialistId)}</Text>
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
  },
  specialist: {
    fontWeight: "400",
    color: "grey",
    marginTop: 4,
    fontSize: 14,
    paddingTop: 6
  },
});
