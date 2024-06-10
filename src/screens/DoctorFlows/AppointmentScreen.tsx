import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ButtonText, DropDownList, Header } from "@/components";
import { globalStyle } from "src/constants";
import { useRoute } from "@react-navigation/native";
import { apiGetSymptom } from "src/api/api_get_symptom";
import { globalColor } from "src/constants/color";

const AppointmentScreen = () => {
  const route = useRoute<any>();
  const employeeData = route?.params.employee;
  const [visible, setVisible] = useState<boolean>(true);
  console.log(employeeData);
  const [symptom, setSymptom] = useState<any[]>();
  const [indexSymptom, setIndexSymptom] = useState<any>();
  useEffect(() => {
    apiGetSymptom().then((res: any) => {
      console.log("res symtomp", res);
      setSymptom(res.data);
    });
  }, []);
  return (
    <>
      <Header headerTitle="Đặt lịch hẹn" />
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text style={globalStyle.titleText}>Bác sĩ</Text>
          <Text style={globalStyle.titleText}>{employeeData.employeeName}</Text>
        </View>
        <View>
          <View style={styles.labelContainer}>
            <Text style={globalStyle.titleText}>Triệu chứng</Text>
            <ButtonText
              onPress={() => setVisible(!visible)}
              text="Chọn"
              styleContainer={{
                width: 80,
                backgroundColor: globalColor.primaryColor,
                borderRadius: 8,
              }}
            />
          </View>
          <View style={styles.labelContainer}>
            
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {indexSymptom?.map((id: number) => {
                // Tìm phần tử trong mảng symptom có id trùng khớp với id đã chọn
                const selectedSymptom = symptom?.find(
                  (item: any) => item.id === id
                );
                // Nếu tìm thấy, hiển thị tên của triệu chứng
                if (selectedSymptom) {
                  return (
                    <View key={id} style={styles.symptomNameContainer}>
                      <Text style={styles.symptomName}>
                      {selectedSymptom.name}
                      </Text>
                    </View>
                  );
                }
                return null; // Trả về null nếu không tìm thấy
              })}
            </View>
          </View>
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
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 12
  },
  symptomName: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    padding: 10
  },
});
