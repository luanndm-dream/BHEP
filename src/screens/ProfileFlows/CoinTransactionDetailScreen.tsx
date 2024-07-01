import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ButtonText, Header } from "@/components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { apiGetCoinTransactionById } from "src/api/api_get_CoinTransactionById";
import useLoading from "src/hook/useLoading";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { globalColor } from "src/constants/color";
import { STACK_NAVIGATOR_SCREENS } from "src/constants";

const CoinTransactionDetailScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>()
  const transactionId = route.params.data.id;
  const { showLoading, hideLoading } = useLoading();
  const [transaction, setTransaction] = useState<any>();

  useEffect(() => {
    showLoading();
    apiGetCoinTransactionById(transactionId).then((res: any) => {
      console.log(res);
      if (res.statusCode === 200) {
        setTransaction(res.data);
        hideLoading();
      } else {
        hideLoading();
      }
    });
  }, []);

  const handleRating = () => {
    navigation.navigate(STACK_NAVIGATOR_SCREENS.RATINGSCREEN, {
      data: transaction
    })
  }

  return (
    <>
      <Header headerTitle="Chi tiết giao dịch" />
      <SafeAreaView style={styles.container}>
        <View style={styles.detailsContainer}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="check-circle" size={50} color="#4CAF50" />
          </View>
          <Text style={styles.title}>{transaction?.title}</Text>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Số tiền:</Text>
            <Text style={styles.value}>{transaction?.amount} VNĐ</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Ngày tạo:</Text>
            <Text style={styles.value}>{transaction?.createdDate}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Mô tả:</Text>
            <Text style={styles.value}>{transaction?.description}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Loại giao dịch:</Text>
            <Text style={styles.value}>
              {transaction?.isMinus ? "Trừ tiền" : "Nạp tiền"}
            </Text>
          </View>
        </View>
        <View style={{flex: 1}}/>
        {/* <ButtonText onPress={handleRating}
        text="Đánh giá" 
        styleContainer={{
            backgroundColor: globalColor.secondaryColor,
            height: 60,
            marginBottom: 12,
            borderRadius: 8,
            marginHorizontal: 8
          }}
          styleText={{ color: 'white', fontWeight: 'bold'}}
        /> */}
      </SafeAreaView>
    </>
  );
};

export default CoinTransactionDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  detailsContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginVertical: 20,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#666",
  },
});
