import { StyleSheet, Text, View, Image,ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { globalFontSize } from "src/constants/fontSize";
import { Header } from "@/components";
import FastImage from 'react-native-fast-image'

const DoctorDetailScreen = () => {
  const route = useRoute<any>();
  const userId = route.params.userId;
  const userIdFake = 8;
  const [userData, setUserData] = useState<any>()
  const [imgUrl, setImgUrl]=useState<string>("")
  useEffect(() => {
    axios
      .get(`https://bhepdemoapi.azurewebsites.net/Api/V1/User/${userIdFake}`)
      .then((res:any) => {
        setUserData(res.data.data)
        setImgUrl(res?.data?.data.avatar)
        console.log(imgUrl+"IMG")
      });
  }, []);
  return (
    <>
     
          <View style={styles.headerContainer}>
        {/* <TouchableOpacity style={styles.logOutIcon}>
          <MaterialCommunityIcons name="logout" size={40} color={"white"} />
        </TouchableOpacity> */}
        <View style={styles.avatarContainer}>
        <Image
            source={{ uri: `data:image/jpeg;base64,${imgUrl}` }}
            style={styles.avatar}
          />
          <View style={styles.nameBox}>
            <Text style={styles.name}>{userData?.fullName}</Text>
            <Text style={styles.description}>{userData?.description}</Text>
          </View>
        </View>
        <Image
          source={require("../../assets/image/doctorBackground.jpg")}
          style={styles.image}
        />
      </View>
    </>
    
  );
};

export default DoctorDetailScreen;

const styles = StyleSheet.create({
    headerContainer: {
        // height: 200
        justifyContent: "center",
        alignItems: "center",
      },
      image: {
        borderBottomLeftRadius: 180,
        borderBottomRightRadius: 180,
        height: 300,
        width: "150%",
        zIndex: 1,
      },
      avatarContainer: {
        zIndex: 2,
        position: "absolute",
        top: "25%",
      },
      avatar: {
        width: 100,
        height: 100,
        borderWidth: 2,
        borderRadius: 50,
        borderColor: "white",
        alignSelf: "center",
      },
      name: {
        fontSize: globalFontSize.name,
        fontWeight: "bold",
        color: "white",
      },
      nameBox: {
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
      },
      featureContainer: {
        margin: 16,
        backgroundColor: "white",
        borderRadius: 16,
      },
      logOutIcon: {
        position: "absolute",
        zIndex: 3,
        top: 50,
        right: 20,
      },
      description: {
        fontSize: globalFontSize.labelName,
        color: "white",
        marginTop: 5,
      },
});
