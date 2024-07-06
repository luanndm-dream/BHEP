import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { ButtonText, Header } from "@/components";
import { globalStyle, STACK_NAVIGATOR_SCREENS } from "src/constants";
import { globalColor } from "src/constants/color";
import { useNavigation, useRoute } from "@react-navigation/native";
import { apiUpdateUser } from "src/api/api_put_user";
import Toast from "react-native-toast-message";
import { useAppDispatch } from "@/redux";
import { changeInfo, setUserInfo } from "src/redux/slice";
const InformationScreen = () => {
  const route = useRoute<any>();
  const data = route?.params?.data;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isChangePassword, setIsChangePassWord] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>(data?.fullName);
  const [email, setEmail] = useState<string>(data?.email);
  const [phoneNumber, setPhoneNumber] = useState<string>(data?.phoneNumber);
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const editHandle = () => {
    if (isEdit) {
      apiUpdateUser(data?.id, fullName, email, phoneNumber, data?.gender).then(
        (res: any) => {
          console.log(res?.daata)
          if (res.statusCode === 200) {
            // dispatch(changeInfo(res?.data));
            Toast.show({
              type: "success",
              text1: "Thay đổi thông tin thành công",
              text2: "BHEP chúc bạn thật nhiều sức khoẻ!",
            });
            navigation.goBack();
          } else {
            Toast.show({
              type: "error",
              text1: "Thay đổi thông tin thất bại",
              text2: `Đã xảy ra lỗi ${res.message}`,
            });
          }
        }
      );

      // Sau khi lưu thành công, có thể thực hiện các hành động cần thiết khác
    }
    setIsEdit(!isEdit);
  };
  const onChangePassword = () => {
    // setIsChangePassWord(!isChangePassword);
    navigation.navigate(STACK_NAVIGATOR_SCREENS.CHANGEPASSWORDSCREEN);
  };
  return (
    <>
      <Header headerTitle="Thông tin cá nhân" />
      <ScrollView
        style={styles.container}
        onTouchStart={() => Keyboard.dismiss()}
      >
        <View>
          <Text style={[globalStyle.titleText, { color: globalColor.grey }]}>
            Họ và tên
          </Text>
          <TextInput
            style={styles.textInput}
            value={fullName}
            editable={isEdit}
            onChangeText={(text) => setFullName(text)}
          />
        </View>
        <View>
          <Text style={[globalStyle.titleText, { color: globalColor.grey }]}>
            Email
          </Text>
          <TextInput
            style={styles.textInput}
            value={email}
            editable={isEdit}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View>
          <Text style={[globalStyle.titleText, { color: globalColor.grey }]}>
            Số điện thoại
          </Text>
          <TextInput
            style={styles.textInput}
            value={phoneNumber}
            editable={isEdit}
            onChangeText={(text) => setPhoneNumber(text)}
          />
        </View>

        <View>
          <View style={styles.passwordTitle}>
            <Text style={[globalStyle.titleText, { color: globalColor.grey }]}>
              Mật khẩu
            </Text>
            <TouchableOpacity onPress={onChangePassword}>
              <Text style={styles.password}>Đổi mật khẩu</Text>
            </TouchableOpacity>
          </View>

          {/* <TextInput
            editable={isChangePassword}
            style={styles.textInput}
            value={password}
            onTouchStart={() => setPassword(undefined)}
          /> */}
        </View>
        {/* <View>
          <Text style={[globalStyle.titleText, {color: globalColor.grey}]}>Giới thiệu bản thân</Text>
          <TextInput style={styles.textInput} />
        </View> */}
        <ButtonText styleContainer={styles.disableAccountButton}
        onPress={()=>navigation.navigate(STACK_NAVIGATOR_SCREENS.DISABLEACCOUNTSCREEN)}
        text="Vô hiệu hoá tài khoản"
        />
      </ScrollView>
      <View style={{ backgroundColor: "white" }}>
        <ButtonText
          text={isEdit ? "Xác nhận" : "Chỉnh sửa"}
          onPress={editHandle}
          styleContainer={isEdit ? styles.editButton : styles.confirmButton}
          styleText={{
            color: "white",
            fontWeight: "bold",
          }}
        />
      </View>
    </>
  );
};

export default InformationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "white",
    padding: 16,
  },

  textInput: {
    height: 60,
    borderWidth: 2,
    borderRadius: 16,
    borderColor: "#e5e3e3",
    marginVertical: 15,
    paddingHorizontal: 12,
    fontSize: 20,
    color: "black",
  },
  buttonContainer: {
    margin: 16,
  },
  editButton: {
    backgroundColor: "green",
    marginBottom: 20,
    marginHorizontal: 30,
    height: 60,
    borderRadius: 16,
  },
  confirmButton: {
    backgroundColor: globalColor.primaryColor,
    marginBottom: 20,
    marginHorizontal: 30,
    height: 60,
    borderRadius: 16,
  },
  disableAccountButton: {
    backgroundColor: '#ff9b9b',
    marginTop: 50,
    marginHorizontal: 40,
    height: 40,
    borderRadius: 16,
  },
  password: {
    color: globalColor.blue,
    fontWeight: "600",
  },
  passwordTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
