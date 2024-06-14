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
import ImagePicker from "react-native-image-crop-picker";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { globalStyle, STACK_NAVIGATOR_SCREENS } from "src/constants";
import { getFeatureProfileData } from "src/data/featureProfileData";
import { apiGetUserById } from "src/api/api_getUserById";
import { globalColor } from "src/constants/color";
import { resetUserInfo, setUserInfo } from "src/redux/slice";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiPostImage } from "src/api/api_post_image";
import mime from "mime";

const ProfileScreen = () => {
  const userData = useAppSelector((state) => state.user.userData);
  const navigation = useNavigation<any>();
  const form = new FormData();
  const os = Platform.OS;
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [featureProfileData, setFeatureProfileData] = useState<any>(
    getFeatureProfileData()
  );
  const onPressIconHandle = (screen: string) => {
    navigation.navigate(screen);
  };
  useFocusEffect(
    useCallback(() => {
      apiGetUserById(Number(userData.id)).then((res) => {
        setData(res?.data);
      });
    }, [])
  );
  const resultData = getFeatureProfileData();


  const onPressConfirm = async () => {
    setIsVisible(false);
    dispatch(resetUserInfo());
    await AsyncStorage.removeItem("auth");
    setTimeout(() => {
      Toast.show({
        type: "success",
        text1: "Đăng xuất",
        text2: "Chúc bạn sức khoẻ và hẹn gặp lại!",
        visibilityTime: 3000,
      });
    }, 1000);
  };

  const handleChangeAvatar = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image: any) => {
      console.log("uri", image.path);
      const form = new FormData();
      form.append("file", {
        // uri: Platform.OS === 'android'? image?.path: image?.path.replace('file://',''),
        uri: image?.path,
        type: "image/jpg",
        name: "image.jpg",
      });

      apiPostImage("luan111111", form).then((res) => {
        console.log("form", res);
      });
    });
  };
  https: return (
    <>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.logOutIcon}
            onPress={() => setIsVisible(!isVisible)}
          >
            <MaterialCommunityIcons name="logout" size={40} color={"white"} />
          </TouchableOpacity>
          <View style={styles.avatarContainer}>
            <TouchableOpacity onPress={handleChangeAvatar}>
              <Image
                source={require("../../assets/image/womanAvatar.png")}
                style={styles.avatar}
              />
              <View style={styles.camera}>
                <MaterialCommunityIcons
                  name="camera"
                  size={30}
                  color={"white"}
                />
              </View>

              {/* Logic nguyên bản */}
              {/* {data?.avatar ? (
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
            )} */}
            </TouchableOpacity>
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
                  onPress={() => onPressIconHandle(item.screen)}
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
  camera: {
    position: "absolute",
    right: 12,
    bottom: 1,
  },
});
