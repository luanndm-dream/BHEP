import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Header } from "@/components";
import { apiGetService } from "src/api/api_get_Service";
import { useNavigation } from "@react-navigation/native";
import { STACK_NAVIGATOR_SCREENS } from "src/constants";
import useLoading from "src/hook/useLoading";

const ServiceScreen = () => {
  const navigate = useNavigation<any>();
  const [personalPackages, setPersonalPackages] = useState([]);
  const [familyPackages, setFamilyPackages] = useState([]);
  const {showLoading, hideLoading} = useLoading()
  useEffect(() => {
    showLoading()
    apiGetService()
      .then((res: any) => {
        const services = res.data.items;

        // Tạo mảng riêng cho gói dịch vụ cá nhân và gia đình
        const personal = services.filter(
          (item: any) => item.name === "Gói dịch vụ cá nhân"
        );
        const family = services.filter(
          (item: any) => item.name === "Gói dịch vụ gia đình"
        );

        setPersonalPackages(personal);
        setFamilyPackages(family);
        hideLoading();
      })
      .catch((error) => {
        hideLoading();
        console.error("Failed to fetch services:", error);
      });
  }, []);

  const onPressItem = (type: number) => {
    navigate.navigate(STACK_NAVIGATOR_SCREENS.SERVICEDETAILSCREEN, {
      data: type === 1 ? personalPackages : familyPackages,
      type: type
    });
  };

  return (
    <>
      <Header headerTitle="Mua gói dịch vụ" />
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.section} onPress={() => onPressItem(1)}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/image/bannerPersonal.png")}
              style={styles.image}
              // resizeMode="contain"
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>Gói dịch vụ cá nhân</Text>
              <Text style={styles.description}>
                Hãy đăng ký ngay để chăm sóc sức khỏe của bạn ngay bây giờ.
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.section} onPress={() => onPressItem(2)}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/image/bannerFamily.png")}
              style={styles.image}
              // resizeMode="contain"
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>Gói dịch vụ gia đình</Text>
              <Text style={styles.description}>
                Hãy đăng ký ngay để chăm sóc sức khỏe của bạn và gia đình ngay bây
                giờ.
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default ServiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  section: {
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
  },
  imageContainer: {
    paddingHorizontal: 12,
    width: "100%",
    height: 170,
    marginBottom: 12,
    position: 'relative',
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  textContainer: {
    position: 'absolute',
    left: 24,
    top: 16,
    width: '60%',
  },
  title: {
    fontSize: 23,
    fontWeight: "700",
    color: "#0C0047",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "black",
  },
});