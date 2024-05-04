import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { FeatureCard, Header, MessagePopup, StatsBox } from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux";
import { globalFontSize } from "src/constants/fontSize";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { globalStyle } from "src/constants";
import { getFeatureProfileData } from "src/data/featureProfileData";
import { apiGetUserById } from "src/api/api_getUserById";
import { globalColor } from "src/constants/color";
import { resetUserInfo, setUserInfo } from "src/redux/slice";
import Toast from "react-native-toast-message";

const ProfileScreen = () => {
  const userData = useAppSelector((state) => state.user.userData);
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [featureProfileData,setFeatureProfileData] = useState<any>(getFeatureProfileData())
  const onPressIconHandle = (name: string) => {
    switch (name) {
      case "Thông Tin Cá Nhân": {
        navigation.navigate("InformationScreen", {
          data: userData,
        });
        break;
      }
      case "Làm Việc": {
        navigation.navigate("WorkSpaceDoctorScreen");
        break;
      }
      case "Sức khoẻ của tôi": {
        navigation.navigate("MyHealthScreen");
        break;
      }
      // case "Văn phòng gần đây": {
      //   navigation.navigate("OfficeMapViewScreen", {
      //     // dataOffice: dataOffice
      //   });
      //   break;
      // }
    }
  };
  useFocusEffect(
    useCallback(() => {
      console.log('API');
      apiGetUserById(Number(userData.id)).then((res) => {
        console.log(res);
        setData(res?.data);
        // if(res?.data?.roleName === 'Employee'){
        //   setFeatureProfileData((prevData:any) => [
        //     ...prevData,
        //     {
        //       id: 2,
        //       name: 'Làm Việc',
        //       iconName: "calendar-check",
        //       color: '#01b585',
        //     }
        //   ]);
        // }
      });
    }, [])
  );
  // useEffect(()=>{
      const resultData = getFeatureProfileData()
  //   setFeatureProfileData(resultData)
  // },[data])
  console.log(featureProfileData)

  const onPressConfirm = () => {
    setIsVisible(false);
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreen" }],
    });
    dispatch(resetUserInfo());
    setTimeout(() => {
      Toast.show({
        type: "success",
        text1: "Đăng xuất",
        text2: "Chúc bạn sức khoẻ và hẹn gặp lại!",
        visibilityTime: 3000,
      });
    }, 1000);
  };

  // Lấy dữ liệu từ hàm getFeatureProfileData


  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.logOutIcon}
            onPress={() => setIsVisible(!isVisible)}
          >
            <MaterialCommunityIcons name="logout" size={40} color={"white"} />
          </TouchableOpacity>
          <View style={styles.avatarContainer}>
            {data?.avatar ? (
              <Image
                source={{ uri: `data:image/jpeg;base64,${data?.avatar}` }}
                style={styles.avatar}
              />
            ) : data?.gender === 1 ? (
              <Image
                source={require("../../assets/image/manAvatar.png")}
                style={styles.avatar}
              />
            ) : (
              <Image
                source={require("../../assets/image/womanAvatar.png")}
                style={styles.avatar}
              />
            )}

            <View style={styles.nameBox}>
              <Text style={styles.name}>{data?.fullName}</Text>
              <Text style={styles.description}>{data?.description}</Text>
            </View>
          </View>
          <Image
            source={require("../../assets/image/background.jpg")}
            style={styles.image}
          />
        </View>
        <StatsBox valueOfPosts={12} valueOfRank={1} valueOfOrders={100} />
        <View style={styles.featureContainer}>
          <FlatList
            data={resultData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
            
              return (
                
                <FeatureCard
                  featureName={item.name}
                  iconName={item.iconName}
                  backgroundIconColor={item.color}
                  onPress={() => onPressIconHandle(item.name)}
                />
              );
            }}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
      {isVisible && (
        <MessagePopup
          isVisible
          title="Đăng xuất"
          iconName="help-circle"
          content="Hãy chắc chắn rằng muốn đăng xuất?"
          iconColor={globalColor.primaryColor}
          onPressCancel={() => setIsVisible(false)}
          confirmText="Đăng xuất"
          onPressConfirm={onPressConfirm}
        />
      )}
    </>
  );
};

export default ProfileScreen;

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
