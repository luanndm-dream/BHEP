import { SafeAreaView, StyleSheet, Text, View, FlatList,TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Header } from "@/components";
import { apiGetCoinTransactionByUserId } from "src/api/api_get_coinTransactionByUserId";
import { useAppSelector } from "@/redux";
import useLoading from "src/hook/useLoading";
import { globalColor } from "src/constants/color";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { STACK_NAVIGATOR_SCREENS } from "src/constants";

const HistoryTransactionScreen = () => {
  const userId = useAppSelector((state) => state.user.userData.id);
  const navigation = useNavigation<any>()
  const [transactions, setTransactions] = useState([]);
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    showLoading();
    apiGetCoinTransactionByUserId(userId).then((res: any) => {
      console.log(res.data.items[0]);
      if (res.statusCode === 200) {
        setTransactions(res.data.items);
        hideLoading();
      } else {
        hideLoading();
      }
    });
  }, []);

  const handleItemPress = (item: any) => {
    navigation.navigate(STACK_NAVIGATOR_SCREENS.COINTRANSACTIONDETAIL, {
      data: item
    })
  }

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.card} onPress={()=>handleItemPress(item)}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="wallet" size={40} color={"white"} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>{item.createdDate}</Text>
        </View>
      </View>
      <View>
        <Text style={[styles.amount, { color: item.isMinus ? "red" : "green" }]}>
          {item.isMinus ? "-" : "+"}{item.amount}đ
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Header headerTitle="Lịch sử giao dịch" />
      <SafeAreaView style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={transactions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      </SafeAreaView>
    </>
  );
};

export default HistoryTransactionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  listContent: {
    paddingBottom: 16,
  },
  iconContainer: {
    backgroundColor: globalColor.primaryColor,
    height: 60,
    width: 60,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
  },
  card: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    padding: 16,
    margin: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  amount: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#4caf50", // Màu xanh cho số dương
  },
  date: {
    fontSize: 12,
    color: "#888",
    marginTop: 6
  },
});
