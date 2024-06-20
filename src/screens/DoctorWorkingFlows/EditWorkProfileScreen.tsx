import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ButtonText, Header } from "@/components";
import { apiGetWorkProfileById } from "src/api/api_get_workProfileById";
import { globalStyle } from "src/constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { globalColor } from "src/constants/color";
import { useAppSelector } from "@/redux";
import { apiUpdateWorkProfile } from "src/api/api_put_updateWorkProfile";

const EditWorkProfileScreen = () => {
  const userId = Number(useAppSelector((state) => state.user.userData.id));
  const [userData, setUserData] = useState<any>(null);
  const [price, setPrice] = useState<string>("0");
  const [editable, setEditable] = useState<boolean>(false);

  useEffect(() => {
    console.log(" call api res");
    apiGetWorkProfileById(userId).then((res: any) => {
      console.log("res", res);
      setUserData(res);
      setPrice(res?.data?.price?.toString() || "0");
    });
  }, []);

  const editHandle = () => {
    setEditable(!editable);
    setPrice("0");
  };
  const updateHandle = () => {
    console.log(price);
    setEditable(false);
    apiUpdateWorkProfile(
      userData?.data.id,
      userId,
      userData?.data.workPlace,
      userData?.data.certificate,
      userData?.data.experienceYear,
      Number(price)
    ).then(res => console.log('res update', res))
  };

  return (
    <>
      <Header headerTitle="Hồ sơ làm việc" />
      <View style={styles.container} onTouchStart={() => Keyboard.dismiss()}>
        <View style={styles.content}>
          <View style={styles.labelContainer}>
            <Text style={globalStyle.titleText}>Họ và tên</Text>
            <Text style={globalStyle.textNormal}>
              {userData?.data?.fullName}
            </Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={globalStyle.titleText}>Vị trí</Text>
            <Text style={globalStyle.textNormal}>Bác sĩ chuyên khoa 2</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={globalStyle.titleText}>Đơn vị công tác</Text>
            <Text style={globalStyle.textNormal}>
              {userData?.data?.workPlace}
            </Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={globalStyle.titleText}>Thành tích</Text>
            <Text style={globalStyle.textNormal}>
              {userData?.data?.certificate}
            </Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={globalStyle.titleText}>Số năm công tác</Text>
            <Text style={globalStyle.textNormal}>
              {userData?.data?.experienceYear}
            </Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={globalStyle.titleText}>Số ca bệnh đã hoàn </Text>
            <Text style={globalStyle.textNormal}>1999</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={globalStyle.titleText}>Giá thành tư vấn</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                value={price}
                style={styles.textInput}
                keyboardType="numeric"
                editable={editable}
                onChangeText={setPrice}
                onFocus={() => setPrice("")}
              />
              <Text style={[globalStyle.textNormal, { marginRight: 6 }]}>
                VND
              </Text>
              <TouchableOpacity onPress={editHandle}>
                <MaterialCommunityIcons name="note-edit-outline" size={24} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {editable && (
          <View style={styles.buttonContainer}>
            <ButtonText
              text="Cập nhật"
              onPress={updateHandle}
              styleContainer={styles.iconContainer}
              styleText={{ color: "white" }}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default EditWorkProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginVertical: 6,
    alignItems: "center",
  },
  textInput: {
    color: "black",
    fontSize: 18,
    marginRight: 6,
    fontWeight: "bold",
  },
  buttonContainer: {
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  iconContainer: {
    backgroundColor: globalColor.primaryColor,
    borderRadius: 12,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
