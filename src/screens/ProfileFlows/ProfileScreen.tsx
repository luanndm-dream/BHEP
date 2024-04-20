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
import React from "react";
import { FeatureCard, Header, StatsBox } from "@/components";
import { useAppSelector } from "@/redux";
import { globalFontSize } from "src/constants/fontSize";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { globalStyle } from "src/constants";
import { getFeatureProfileData } from "src/data/featureProfileData";


const ProfileScreen = () => {
  const userData = useAppSelector((state) => state.user.userData);
  const navigation = useNavigation<any>();
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
      case "Bác sĩ gần đây": {
        navigation.navigate("FindLocationScreen" as never);
        break;
      }
      case "Văn phòng gần đây": {
        navigation.navigate("OfficeMapViewScreen", {
          // dataOffice: dataOffice
        });
        break;
      }
    }
  };

  // Lấy dữ liệu từ hàm getFeatureProfileData
  const FeatureProfileData = getFeatureProfileData();

  return (
    <ScrollView style={{ flex: 1 }}>
      <StatusBar translucent barStyle={"light-content"} />
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.logOutIcon}>
          <MaterialCommunityIcons name="logout" size={40} color={"white"} />
        </TouchableOpacity>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: `data:image/jpeg;base64,${userData.avatar}` }}
            style={styles.avatar}
          />
          <View style={styles.nameBox}>
            <Text style={styles.name}>{userData.fullName}</Text>
            <Text style={styles.description}>{userData.description}</Text>
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
          data={FeatureProfileData}
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
