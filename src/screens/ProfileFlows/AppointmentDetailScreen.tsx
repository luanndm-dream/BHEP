import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ButtonText, Header, LabelComponent } from "@/components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { globalStyle, STACK_NAVIGATOR_SCREENS } from "src/constants";
import { useAppSelector } from "@/redux";
import { globalColor } from "src/constants/color";
import { apiGetAppointmentById } from "src/api/api_get_appointmentById";
import useLoading from "src/hook/useLoading";
import { apiPutAppointmentWithStatus } from "src/api/api_put_Appointment";
import firestore from "@react-native-firebase/firestore";
import Toast from "react-native-toast-message";
import formatCurrencyVND from "src/constants/Curentcy";
const AppointmentDetailScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { showLoading, hideLoading } = useLoading();
  const appoinmentId = route?.params?.id;
  const userRoleId = useAppSelector((state) => state.user.userData.roleId);
  const [appointment, setAppointment] = useState<any>();
  const appoinmentData = route?.params?.data;
 
  useEffect(() => {
    showLoading();
    apiGetAppointmentById(appoinmentId).then((res: any) => {
      console.log(res);
      if (res.statusCode === 200) {
        setAppointment(res.data);
        hideLoading();
      } else {
        hideLoading();
      }
    });
  }, []);

  const appoinmentDatas = [
    {
      label: userRoleId === 2 ? "Bác sĩ" : "Tên",
      value:
        userRoleId === 2
          ? appointment?.employee.fullName
          : userRoleId === 3 && appointment?.customer.fullName,
    },
    {
      label: "Ngày",
      value: appointment?.date,
    },
    {
      label: "Thời gian",
      value: appointment?.time ? appointment?.time : "Chưa có thời gian",
    },
    {
      label: "Giá tiền",
      value: formatCurrencyVND(appointment?.price),
    },
    {
      label: "Ghi chú",
      value: appointment?.note,
    },
  ];

  const handleReject = async () => {
    try {
      const res: any = await apiPutAppointmentWithStatus(
        appointment.id,
        appointment.customer.id,
        appointment.employee.id,
        3
      );
      console.log(res);

      if (res.statusCode === 200) {
        await firestore()
          .collection("notification")
          .doc(`${appointment.id}`)
          .delete();
        Toast.show({
          type: "success",
          text1: "Từ chối lịch thành công",
          text2: "Chúc bạn có một ngày làm việc vui vẻ",
        });
        navigation.goBack();
      } else {
        Toast.show({
          type: "error",
          text1: "Xảy ra lỗi",
          text2: res.message,
        });
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Xảy ra lỗi",
        text2: error.toString(),
      });
    }
  };

  const handleAccept = async () => {
    console.log(appointment.id);
    try {
      const res: any = await apiPutAppointmentWithStatus(
        appointment.id,
        appointment.customer.id,
        appointment.employee.id,
        1
      );
      console.log(res);

      if (res.statusCode === 200) {
        await firestore()
          .collection("notification")
          .doc(`${appointment.id}`)
          .update({
            isRead: true,
          });
        Toast.show({
          type: "success",
          text1: "Chấp nhận lịch thành công",
          text2: "Chúc bạn có một ngày làm việc vui vẻ",
        });
        navigation.goBack();
      } else {
        Toast.show({
          type: "error",
          text1: "Xảy ra lỗi",
          text2: res.message,
        });
      }
    } catch (error: any) {
      console.log("error", error);
      Toast.show({
        type: "error",
        text1: "Xảy ra lỗi",
        text2: error.toString(),
      });
    }
  };

  const handleComplete = () => {
    apiPutAppointmentWithStatus(
      appointment.id,
      appointment.customer.id,
      appointment.employee.id,
      2
    ).then((res: any) => {
      if (res.statusCode === 200) {
        Toast.show({
          type: "success",
          text1: "Đã hoàn thành lịch hẹn",
          text2: "Chúc bạn có một ngày làm việc vui vẻ",
        });
        navigation.goBack();
      } else {
        Toast.show({
          type: "error",
          text1: "Xảy ra lỗi",
          text2: res.message,
        });
      }
    });
  };

  const handleReview = () => {
    navigation.navigate(STACK_NAVIGATOR_SCREENS.RATINGSCREEN, {
      type: 'appointment',
      data: appointment
    })
  }

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
        {appointment?.status === 0 &&
          (userRoleId === 3 ? (
            <View style={styles.duoButton}>
              <ButtonText
                onPress={handleReject}
                styleContainer={{
                  backgroundColor: globalColor.cancelBg,
                  height: 60,
                  width: "45%",
                  marginBottom: 12,
                  borderRadius: 8,
                }}
                styleText={{ color: globalColor.cancel }}
                text="Huỷ lịch"
              />
              <ButtonText
                onPress={handleAccept}
                styleContainer={{
                  backgroundColor: globalColor.primaryColor,
                  height: 60,
                  width: "45%",
                  marginBottom: 12,
                  borderRadius: 8,
                }}
                styleText={{ fontWeight: "bold" }}
                text="Nhận lịch"
              />
            </View>
          ) : (
            userRoleId === 2 && (
              <ButtonText
                onPress={handleReject}
                styleContainer={{
                  backgroundColor: globalColor.cancelBg,
                  height: 60,
                  marginBottom: 12,
                  borderRadius: 8,
                }}
                styleText={{ color: globalColor.cancel, fontWeight: "500" }}
                text="Huỷ lịch"
              />
            )
          ))}
        {appointment?.status === 1 && userRoleId === 3 && (
          <ButtonText
            onPress={handleComplete}
            styleContainer={{
              backgroundColor: "#06D001",
              height: 60,
              marginBottom: 12,
              borderRadius: 8,
            }}
            styleText={{ color: "white", fontWeight: "bold" }}
            text="Hoàn thành"
          />
        )}
        {appointment?.status === 2 && userRoleId === 2 && (
          <ButtonText
            onPress={handleReview}
            styleContainer={{
              backgroundColor: "#FD9B63",
              height: 60,
              marginBottom: 12,
              borderRadius: 8,
            }}
            styleText={{ color: "white", fontWeight: "500" }}
            text="Đánh giá"
          />
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
