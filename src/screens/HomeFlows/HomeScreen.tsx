import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalColor } from "src/constants/color";
import { globalStyle } from "src/constants";
import { OutstandingFunciton } from "@/data";
import { useNavigation } from "@react-navigation/native";
import { IconFeature } from "@/components";

const HomeScreen = () => {
  const navigation = useNavigation<any>()
  const onPressIconHandle = (name: string)=>{
          switch(name){
            case 'Đối tác' :{
              navigation.navigate('PartnerScreen', {
                // data: dataStation
              })
              break;
            }
            case'Tìm Đường' : {
              navigation.navigate('MapScreen' as never)
              break;
            }
            case'Bác sĩ gần đây' : {
              navigation.navigate('FindLocationScreen' as never)
              break;
            }
            case 'Văn phòng gần đây' :{
              navigation.navigate('OfficeMapViewScreen', {
                // dataOffice: dataOffice
              })
              break;
            }
          }
  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Xin Chào</Text>
          <Text style={styles.hello}>Hôm nay của bạn thế nào?</Text>
        </View>
        <View style={{}}>
          <Image
            source={require("../../assets/image/banner.png")}
            style={styles.bannerImage}
          />
        </View>
        <View style={styles.bodyContainer}>
          <Text style={globalStyle.titleText}>Tính năng nổi bật</Text>
          <View style={styles.featureContainer}>
            <FlatList
              data={OutstandingFunciton}
              numColumns={3}
              renderItem={({ item }) => {
                return <IconFeature name={item.name} imgUrl={item.imgName} onPress={()=>onPressIconHandle(item.name)}/>;
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
  },
  header: {
    marginBottom: 8,
  },
  bodyContainer: {
    marginVertical: 12,
  },
  featureContainer: {
    // justifyContent: "center",
    // alignItems: "center",
    // margin: 8,
  },
  bannerImage: {
    height: 173,
    width: "100%",
    borderRadius: 24,
  },
  welcomeText: {
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
  },
  hello: {
    color: "#424242",
  },
});
