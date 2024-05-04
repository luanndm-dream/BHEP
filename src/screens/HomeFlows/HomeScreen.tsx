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
import React from "react";
import { globalColor } from "src/constants/color";
import { globalStyle } from "src/constants";
import { OutstandingFunciton } from "@/data";
import { useNavigation } from "@react-navigation/native";
import { IconFeature } from "@/components";
import { useAppSelector } from "@/redux";
import useLoading from "src/hook/useLoading";

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const userData = useAppSelector((state) => state.user);
  const { showLoading, hideLoading } = useLoading();

  const onPressIconHandle = (name: string) => {
    switch (name) {
      case "Đối tác": {
        navigation.navigate("PartnerScreen", {
          // data: dataStation
        });
        break;
      }
      case "Bác sĩ gần chổ tôi": {
        navigation.navigate("FindLocationScreen" as never);
        break;
      }
      case "Kiểm tra sức khoẻ": {
        navigation.navigate("TrackingHealthScreen", {
          // dataOffice: dataOffice
        });
        break;
      }
    }
  };
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
            { marginTop: Platform.OS === "android" ? 20 : 0 },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 18, color: "black" }}>Xin chào </Text>
            <Text style={styles.welcomeText}>{userData.userData.fullName}</Text>
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
          <View style={styles.featureContainer}>
            <FlatList
          
              data={OutstandingFunciton}
              numColumns={3}
              renderItem={({ item }) => (
                <IconFeature
                  name={item.name}
                  imgUrl={item.imgName}
                  onPress={() => onPressIconHandle(item.name)}
                 
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
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  hello: {
    color: "#424242",
  },
});
