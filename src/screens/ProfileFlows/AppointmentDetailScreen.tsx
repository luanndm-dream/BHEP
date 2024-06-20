import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ButtonText, Header, LabelComponent } from "@/components";
import { useRoute } from "@react-navigation/native";
import { globalStyle } from "src/constants";
import { useAppSelector } from "@/redux";
import { globalColor } from "src/constants/color";

const AppointmentDetailScreen = () => {
  const route = useRoute<any>();
  const appoinmentId = route?.params?.id;
  const userRoleId = useAppSelector((state) => state.user.userData.roleId);
  const appoinmentData = route?.params?.data;
  console.log(appoinmentData);
  const appoinmentDatas = [
    {
      label: userRoleId === 2 ? "Bác sĩ" : "Tên",
      value:
        userRoleId === 2
          ? appoinmentData?.employeeName
          : userRoleId === 3 && appoinmentData?.customerName,
    },
    {
      label: "Ngày",
      value: appoinmentData?.date,
    },
    {
      label: "Thời gian",
      value: appoinmentData?.time ? appoinmentData?.time : "Chưa có thời gian",
    },
    {
      label: "Giá tiền",
      value: appoinmentData?.price,
    },
    {
      label: "Ghi chú",
      value: appoinmentData?.note,
    },
  ];
  return (
    <>
      <Header headerTitle="Chi tiết lịch hẹn" />
      <SafeAreaView style={styles.container}>
      <FlatList
          data={appoinmentDatas}
          renderItem={({ item, index }) => {
            return <LabelComponent label={item.label} value={item.value} />;
          }}
        />
        {appoinmentData?.status === 0 && (
          userRoleId === 3 ? (
            <View style={styles.duoButton}>
              <ButtonText
                onPress={() => {}}
                styleContainer={{
                  backgroundColor: globalColor.cancelBg,
                  height: 60,
                  width: '45%',
                  marginBottom: 12,
                  borderRadius: 8
                }}
                styleText={{color: globalColor.cancel}}
                text="Huỷ lịch"
              />
              <ButtonText
                onPress={() => {}}
                styleContainer={{
                  backgroundColor: globalColor.primaryColor,
                  height: 60,
                  width: '45%',
                  marginBottom: 12,
                  borderRadius: 8
                }}
                styleText={{fontWeight: 'bold'}}
                text="Nhận lịch"
              />
            </View>
          ) : userRoleId === 2 && (
            <ButtonText
              onPress={() => {}}
              styleContainer={{
                backgroundColor: globalColor.cancelBg,
                height: 60,
                marginBottom: 12,
                borderRadius: 8
              }}
              styleText={{color: globalColor.cancel, fontWeight: '500'}}
              text="Huỷ lịch"
            />
          )
        )}
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
  duoButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
