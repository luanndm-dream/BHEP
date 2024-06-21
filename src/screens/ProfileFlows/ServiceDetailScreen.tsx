import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { ButtonText, Header } from "@/components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ImageBackground } from "react-native";
import { globalStyle } from "src/constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { globalColor } from "src/constants/color";
import { apiPostCoinTransaction } from "src/api/api_post_coinTransaction";
import { useAppSelector } from "@/redux";
import Toast from "react-native-toast-message";

const ServiceDetailScreen = () => {
  const route = useRoute<any>();
  const navigate = useNavigation<any>()
  const userId = Number(useAppSelector((state) => state.user.userData.id));
  const data = route?.params.data;
  const type = route?.params.type;
  const [selectedItem, setSelectedItem] = useState<any>();
  const description = data[1]?.description
    ?.split(".")
    .filter((item: any) => item.trim() !== "");
  console.log(data);
  const onPressItem = (item: any) => {
    setSelectedItem(item);
    console.log(item);
  };
  const onConfirm = () => {
    apiPostCoinTransaction({
      userId,
      amount: selectedItem?.price,
      isMinus: true,
      title: selectedItem?.name,
      description: selectedItem?.name,
      isGenerateCode: type === 1 ? false : true,
      services: [data.id],
    }).then((res: any) => {
      console.log("res mua hàng", res);
      if (res.statusCode === 200) {
        Toast.show({
          type: "success",
          text1: "Mua dịch vụ thành công",
          text2: "BHEP chúc bạn thật nhiều sức khoẻ!",
        });
        navigate.goBack()
      } else {
        Toast.show({
          type: "error",
          text1: "Mua gói thất bại",
          text2: ` Xảy ra lỗi khi mua hàng ${res.message}`,
        });
      }
    });
  };
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };
  return (
    <>
      <ImageBackground
        source={require("../../assets/image/backgroundService.png")}
        style={styles.backgroundImage}
      >
        <TouchableOpacity style={styles.buttonContainer} onPress={()=>{navigate.goBack()}}>
          <MaterialCommunityIcons name="chevron-left" size={40} color="black" />
        </TouchableOpacity>
      </ImageBackground>
      {/* <Header headerTitle={data.data[0]?.name}/> */}
      <View style={styles.container}>
        <ScrollView
          style={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={globalStyle.titleText}>{data[0]?.name}</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            numColumns={2}
            data={description}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.featureContainer}>
                  <MaterialCommunityIcons
                    name="check"
                    size={18}
                    color={globalColor.primaryColor}
                  />
                  <Text style={styles.featureName}>{item.trim()}</Text>
                </View>
              );
            }}
          />
          <View style={styles.dashedLine} />

          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            {data?.map((item: any, index: any) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.itemContainer,
                  {
                    backgroundColor:
                      selectedItem === item ? "#3FD69F" : "#a6a6a6",
                  },
                ]}
                onPress={() => onPressItem(item)}
              >
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>
                    {formatPrice(item.price)}đ/ {item.duration} Tháng
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </ScrollView>
        <ButtonText
          text="Mua gói"
          onPress={onConfirm}
          disabled={!selectedItem}
          styleContainer={{
            marginHorizontal: 12,
            backgroundColor: globalColor.primaryColor,
            marginBottom: 12,
            height: 60,
            borderRadius: 12,
          }}
          styleText={{ fontWeight: "bold" }}
        />
      </View>
    </>
  );
};

export default ServiceDetailScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    height: 240,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 6,
    marginTop: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  contentContainer: {
    padding: 6,
    marginBottom: 6,
  },
  featureContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 8,
  },
  dashedLine: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "black",
    margin: -2,
    marginVertical: 20,
  },
  featureName: {
    fontSize: 12,
    marginVertical: 6,
    color: "black",
    fontWeight: "500",
  },
  itemContainer: {
    padding: 10,
    height: 90,
    marginVertical: 8,
    borderRadius: 12,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  itemDescription: {
    marginVertical: 5,
  },
  itemPrice: {
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 12,
    color: "black",
  },
  buttonContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "white",
    marginTop: 40,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
