import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ButtonText, DropDownList, Header, MessagePopup } from "@/components";
import { globalStyle } from "src/constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import { apiGetSymptom } from "src/api/api_get_symptom";
import { globalColor } from "src/constants/color";
import { Keyboard } from "react-native";
import { Button } from "react-native-paper";
import { apiPostAppointment } from "src/api/api_post_appointment";
import { useAppSelector } from "@/redux";
import Toast from "react-native-toast-message";

const AppointmentScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const userId = useAppSelector((state) => state.user.userData.id);
  const employeeData = route?.params.employee;
  const price = route?.params.price;
  const [visible, setVisible] = useState<boolean>(false);
  const [visiblePopup, setVisiblePopup] = useState<boolean>(false);
  const [symptom, setSymptom] = useState<any[]>();
  const [indexSymptom, setIndexSymptom] = useState<any[]>([]);
  const [note, setNote] = useState<string>();
  const [charCount, setCharCount] = useState<number>(0);
  useEffect(() => {
    apiGetSymptom().then((res: any) => {
      console.log("res symtomp", res);
      setSymptom(res.data);
    });
  }, []);

  const onConfirmHandle = () => {
    // const combinedDateTime = `${employeeData?.date}`;
    setVisiblePopup(!visiblePopup);
  };
  const onConfirmPopup = () => {
    apiPostAppointment(
      userId,
      employeeData?.employeeId,
      employeeData.date,
      employeeData?.time,
      employeeData?.price,
      "undefined", // Address
      "undefined", // Latitude
      "undefined", // Longitude
      "undefined", // Description
      note,
      indexSymptom
    ).then((res: any) => {
      if (res.statusCode === 200) {
        Toast.show({
          type: "success",
          text1: "Đặt lịch thành công",
          text2: "BHEP chúc bạn thật nhiều sức khoẻ!",
        });
        setVisiblePopup(!visiblePopup);
        navigation.goBack();
      } else {
        Toast.show({
          type: "error",
          text1: "Đặt lịch thất bại",
          text2: `Đã xảy ra lỗi ${res.message}`,
        });
        setVisiblePopup(!visiblePopup);
      }
    });
  };
  return (
    <>
      <Header headerTitle="Đặt lịch hẹn" />
      <View style={styles.container} onTouchStart={() => Keyboard.dismiss()}>
        <View style={styles.labelContainer}>
          <Text style={[globalStyle.titleText, { color: "grey" }]}>Bác sĩ</Text>
          <Text style={globalStyle.titleText}>{employeeData.employeeName}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={[globalStyle.titleText, { color: "grey" }]}>
            Ngày đặt lịch
          </Text>
          <Text style={globalStyle.titleText}>{employeeData?.date}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={[globalStyle.titleText, { color: "grey" }]}>
            Thời gian
          </Text>
          <Text style={globalStyle.titleText}>{employeeData?.time}</Text>
        </View>
        <View>
          <View style={styles.labelContainer}>
            <Text style={[globalStyle.titleText, { color: "grey" }]}>
              Triệu chứng
            </Text>
            <ButtonText
              onPress={() => setVisible(!visible)}
              text="Chọn"
              styleContainer={{
                width: 80,
                backgroundColor: globalColor.secondaryColor,
                borderRadius: 8,
              }}
            />
          </View>

          <View style={styles.labelContainer}>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {indexSymptom?.map((id: number) => {
                const selectedSymptom = symptom?.find(
                  (item: any) => item.id === id
                );
                if (selectedSymptom) {
                  return (
                    <View key={id} style={styles.symptomNameContainer}>
                      <Text style={styles.symptomName}>
                        {selectedSymptom.name}
                      </Text>
                    </View>
                  );
                }
                return null;
              })}
            </View>
          </View>
          <View style={styles.labelContainer}>
            <Text style={[globalStyle.titleText, { color: "grey" }]}>
              Tổng tiền
            </Text>
            <Text style={globalStyle.titleText}>
              {`${employeeData?.price} VNĐ`}
            </Text>
          </View>
          <View>
            <Text style={[globalStyle.titleText, { color: "grey" }]}>
              Ghi chú
            </Text>
            <View style={styles.textInput}>
              <TextInput
                style={{ height: 140, textAlignVertical: "top", color: 'grey' }}
                placeholder="Chi tiết không quá 200 kí tự..."
                placeholderTextColor={"grey"}
                multiline
                maxLength={200}
                onChangeText={(text: string) => {
                  setNote(text);
                  setCharCount(text.length);
                }}
              />
              <Text style={styles.charCountText}>{charCount}/200</Text>
            </View>
          </View>
        </View>

        <View style={{ flex: 1 }} />
        <View style={{ marginBottom: 16 }}>
          <ButtonText
            onPress={() => onConfirmHandle()}
            text="Đặt lịch"
            styleText={{ fontWeight: "bold" }}
            styleContainer={{
              backgroundColor: globalColor.primaryColor,
              height: 60,
              borderRadius: 12,
            }}
          />
        </View>

        <View>
          <DropDownList
            dataList={symptom}
            visible={visible}
            multiSelect
            onConfirmMultiSelected={(id: any) => {
              setIndexSymptom(id);
              // console.log(id)
            }}
            onCancel={() => setVisible(false)}
          />
        </View>
      </View>
      <MessagePopup
        isVisible={visiblePopup}
        onPressCancel={() => setVisiblePopup(false)}
        onPressConfirm={() => onConfirmPopup()}
        iconName="help-circle"
        iconColor={globalColor.primaryColor}
        confirmText="Xác nhận"
        content="Bạn đã chắc chắn về thông tin đặt lịch của mình chứ?"
        title="Xác nhận đặt lịch"
      />
    </>
  );
};

export default AppointmentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  symptomNameContainer: {
    marginRight: 12,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 12,
  },
  symptomName: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    padding: 10,
  },
  textInput: {
    height: 160,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "grey",
    padding: 10, // Ensure padding is added
    // textAlignVertical: "top",
  },
  charCountText: {
    position: 'absolute', // added
    bottom: 10, // added
    right: 10, // added
    color: 'grey',
  },
});
