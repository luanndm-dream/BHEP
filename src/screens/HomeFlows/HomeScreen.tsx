import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { globalColor } from "src/constants/color";
import { globalStyle, STACK_NAVIGATOR_SCREENS } from "src/constants";
import { OutstandingFunciton } from "@/data";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ButtonText, CircleComponent, IconFeature } from "@/components";
import { useAppSelector } from "@/redux";
import useLoading from "src/hook/useLoading";
import { apiGetUserById } from "src/api/api_getUserById";
import Toast from "react-native-toast-message";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import firestore from "@react-native-firebase/firestore";

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const userData = useAppSelector((state) => state.user);
  const { showLoading, hideLoading } = useLoading();
  const [user, setUser] = useState<any>();
  const [unReadNotifications, setUnReadNotifications] = useState([]);

  const onPressIconHandle = (screen: string) => {
    navigation.navigate(screen);
  };

  useFocusEffect(
    useCallback(() => {
      showLoading();
      apiGetUserById(Number(userData.userData.id)).then((res: any) => {
        if (res.statusCode === 200) {
          setUser(res.data);
          hideLoading();
        }
        hideLoading();
      });

      const unsubscribe = firestore()
        .collection("notification")
        .where("isRead", "==", false)
        .where("uid", "==", userData.userData.id)
        .onSnapshot((snap) => {
          if (snap.empty) {
            setUnReadNotifications([]);
          } else {
            const items: any = [];
            snap.forEach((item) =>
              items.push({
                id: item.id,
                ...item.data(),
              })
            );
            setUnReadNotifications(items);
          }
        });

      return () => unsubscribe();
    }, [userData])
  );
  console.log(unReadNotifications);

  const onPressNotification = () => {
    navigation.navigate(STACK_NAVIGATOR_SCREENS.NOTIFICATIONSCREEN);
  };
  return (
    <SafeAreaView style={globalStyle.droidSafeArea}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle={"dark-content"}
      />
      <ScrollView style={styles.container}>
        <View
          style={[
            styles.header,
            { marginTop: Platform.OS === "android" ? 0 : 0 },
          ]}
        >
          <View style={styles.titleContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 18, color: "black" }}>Xin chào </Text>
              <Text style={styles.welcomeText}>{user?.fullName}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.balanceContainer}>
                <Image
                  source={require("../../assets/image/bhepCoin.png")}
                  style={styles.bhepCoin}
                />
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {user?.balance ? user?.balance : 0}
                </Text>
              </View>
              <View style={styles.notificationIconContainer}>
                <CircleComponent
                  size={40}
                  backgroundColor={globalColor.secondaryColor}
                  onPress={onPressNotification}
                >
                  <MaterialCommunityIcons
                    name="bell-outline"
                    size={30}
                    color="#efefefdd"
                  />
                </CircleComponent>
                {unReadNotifications.length > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {unReadNotifications.length}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          <Text style={styles.hello}>Hôm nay của bạn thế nào?</Text>
        </View>
        <View>
          <Image
            source={require("../../assets/image/bannerHome.jpg")}
            style={styles.bannerImage}
          />
        </View>
        <View style={styles.bodyContainer}>
          <Text style={globalStyle.titleText}>Tính năng nổi bật</Text>
          <View>
            <FlatList
              scrollEnabled={false}
              data={OutstandingFunciton}
              keyExtractor={(item) => item.id.toString()}
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
          <Text style={globalStyle.titleText}>Vùng sức khoẻ</Text>
          <View style={styles.bhepZoneContainer}>
            <View style={styles.inforContainer}>
              <View style={styles.labelContainer}>
                <View
                  style={[
                    { backgroundColor: globalColor.greenBhep },
                    styles.colorContainer,
                  ]}
                />
                <Text style={styles.labelText}>
                  Vùng thoải mái: Sức khỏe tốt
                </Text>
              </View>
              <View style={styles.labelContainer}>
                <View
                  style={[
                    { backgroundColor: globalColor.yellowBhep },
                    styles.colorContainer,
                  ]}
                />
                <Text style={styles.labelText}>
                  Vùng cảnh giác: Cần tư vấn từ bác sĩ
                </Text>
              </View>
              <View style={styles.labelContainer}>
                <View
                  style={[
                    { backgroundColor: globalColor.redBhep },
                    styles.colorContainer,
                  ]}
                />
                <Text style={styles.labelText}>
                  Vùng khẩn cấp: Cần đến bệnh viện ngay
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                }}
                onPress={() => {
                  navigation.navigate(
                    STACK_NAVIGATOR_SCREENS.TRACKINGHEALTHSCREEN
                  );
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: globalColor.primaryColor,
                    fontSize: 18,
                  }}
                >
                  Xem chi tiết
                </Text>
              </TouchableOpacity>
              {/* <ButtonText
                onPress={() => {
                  navigation.navigate(
                    STACK_NAVIGATOR_SCREENS.TRACKINGHEALTHSCREEN
                  );
                }}
                text="Xem chi tiết"
                styleText={{ fontWeight: "bold", color: globalColor.primaryColor }}
                styleContainer={styles.buttonContainer}
              /> */}
            </View>
            <View style={styles.bhepZoneImageContainer}>
              <Image
                source={require("../../assets/image/bhepZone.png")}
                style={styles.bhepZoneImage}
              />
              <Text style={styles.bhepText}>Vùng sức khoẻ BHEP</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
    paddingHorizontal: 8,
    marginRight: 8,
  },
  titleContainer: {
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
    marginRight: 6,
  },
  bhepZoneContainer: {
    height: 200,
    backgroundColor: "white",
    borderRadius: 12,
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 58,
  },
  bhepZoneImage: {
    height: 150,
    width: 150,
    alignSelf: "center",
  },
  colorContainer: {
    height: 25,
    width: 60,
  },
  inforContainer: {
    width: "80%",

  },
  labelContainer: {
    flexDirection: "row",
    width: "80%",
    alignItems: "center",
    marginTop: 12,
    marginLeft: 12
  },
  labelText: {
    marginLeft: 5,
    maxWidth: "80%",
    color: "black",
  },
  bhepText: {
    color: globalColor.primaryColor,
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    // backgroundColor: globalColor.primaryColor,
    borderRadius: 12,
    height: 45,
    width: "80%",
    marginTop: 12,
    // alignSelf: "center",
  },
  bhepZoneImageContainer: {
    alignSelf: "center",
  },
  notificationIconContainer: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "red",
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
