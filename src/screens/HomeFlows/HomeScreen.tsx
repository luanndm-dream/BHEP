import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { globalColor } from "src/constants/color";
import { globalStyle, STACK_NAVIGATOR_SCREENS } from "src/constants";
import { OutstandingFunciton } from "@/data";
import { useNavigation } from "@react-navigation/native";
import { IconFeature } from "@/components";
import { useAppSelector } from "@/redux";
import useLoading from "src/hook/useLoading";
import { apiGetUserById } from "src/api/api_getUserById";
import Toast from "react-native-toast-message";

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const userData = useAppSelector((state) => state.user);
  const { showLoading, hideLoading } = useLoading();
  const [user, setUser] = useState<any>();
  const onPressIconHandle = (screen: string) => {
    navigation.navigate(screen);
  };

  useEffect(() => {
    showLoading();
    apiGetUserById(userData.userData.id).then((res: any) => {
      console.log(res)
      if (res.statusCode === 200) {
        setUser(res.data);
        hideLoading();
      }
    });
  }, [userData]);

  return (
    <SafeAreaView style={globalStyle.droidSafeArea}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle={"dark-content"}
      />
      <View style={styles.container}>
        <View
          style={[
            styles.header,
            { marginTop: Platform.OS === "android" ? 0 : 0 },
          ]}
        >
          <View style={styles.titleContaier}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 18, color: "black" }}>Xin chào </Text>
              <Text style={styles.welcomeText}>
                {userData.userData.fullName}
              </Text>
            </View>
            <View style={styles.balanceContainer}>
              <Image
                source={require("../../assets/image/bhepCoin.png")}
                style={styles.bhepCoin}
              />
              <Text style={{color: 'white', fontWeight: '500'}}>{user?.balance}</Text>
            </View>
          </View>
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
          <View>
            <FlatList
            scrollEnabled={false}
              data={OutstandingFunciton}
              keyExtractor={(item)=>item.id.toString()}
              numColumns={4}
              columnWrapperStyle={{
                justifyContent: "space-between",
                flex: 1,
                alignItems: "center",
              }}
              renderItem={({ item }) => (
                <IconFeature
                  name={item.name}
                  imgUrl={item.imgName}
                  onPress={() => onPressIconHandle(item.screen)}
                />
              )}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
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
  balanceContainer: {
    flexDirection: "row",
    height: 40,
    borderRadius: 24,
    backgroundColor: globalColor.secondaryColor,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8
  },
  titleContaier: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bannerImage: {
    height: 173,
    width: "100%",
    borderRadius: 24,
  },
  welcomeText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  hello: {
    color: "#424242",
  },
  bhepCoin: {
    width: 30,
    height: 30,
    alignSelf: "flex-start",
    marginTop: 4,
    marginRight: 6
  },
});
