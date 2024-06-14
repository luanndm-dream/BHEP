import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Header } from "@/components";
import { useRoute } from "@react-navigation/native";
import { globalStyle } from "src/constants";
import { useAppSelector } from "@/redux";

const AppointmentDetailScreen = () => {
  const route = useRoute<any>();
  const appoinmentId = route?.params?.id;
  const userRoleId = useAppSelector((state) => state.user.userData.roleId);
  const appoinmentData = route?.params?.data;
  console.log(appoinmentData);
  return (
    <>
      <Header headerTitle="Chi tiết lịch hẹn" />
      <SafeAreaView style={styles.container}>
        <View style={styles.labelContainer}>
          <Text style={[globalStyle.titleText, { color: "grey" }]}>
            {userRoleId === 2 ? "Bác sĩ" : "Người dùng"}
          </Text>
          <Text style={globalStyle.titleText}>
            {userRoleId === 2
              ? appoinmentData?.employeeName
              : userRoleId === 3 && appoinmentData?.customerName}
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default AppointmentDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
});
