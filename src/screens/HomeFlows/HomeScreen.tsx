import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { globalColor } from "src/constants/color";
import { globalStyle, STACK_NAVIGATOR_SCREENS } from "src/constants";
import { OutstandingFunciton } from "@/data";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ButtonText, IconFeature } from "@/components";
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

  useFocusEffect(
    useCallback(() => {
      // showLoading();
      apiGetUserById(Number(userData.userData.id)).then((res: any) => {
        if (res.statusCode === 200) {
          setUser(res.data);
          hideLoading();
        }
        hideLoading();
      });
    }, [userData])
  );

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
              <Text style={styles.welcomeText}>
                {userData.userData.fullName}
              </Text>
            </View>
            <View style={styles.balanceContainer}>
              <Image
                source={require("../../assets/image/bhepCoin.png")}
                style={styles.bhepCoin}
              />
              <Text style={{ color: "white", fontWeight: "500" }}>
                {user?.balance}
              </Text>
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
              <ButtonText
                onPress={() => {navigation.navigate(STACK_NAVIGATOR_SCREENS.TRACKINGHEALTHSCREEN)}}
                text="Xem chi tiết"
                styleContainer={{
                  backgroundColor: globalColor.primaryColor,
                  borderRadius: 12,
                  height: 45,
                  width: '80%',
                  marginTop: 5
                }}
              />
            </View>
            <View style={{alignSelf: 'center'}}>
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
    marginVertical: 6,
  },
  labelText: {
    marginLeft: 5,
    maxWidth: "80%",
    color: 'black'
  },
  bhepText: {
    color : globalColor.primaryColor,
    fontSize: 16,
    fontWeight: 'bold'
  }
});
