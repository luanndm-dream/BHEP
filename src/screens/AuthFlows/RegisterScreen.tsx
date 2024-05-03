import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { ButtonText, Header, TextInputWithIcon } from "@/components";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { globalColor } from "src/constants/color";
import { Platform } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import useLoading from "src/hook/useLoading";
import { apiRegister } from "src/api/api_register";
import Toast from 'react-native-toast-message';
import { useNavigation } from "@react-navigation/native";
const RegisterSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(5, "Họ tên phải lớn hơn 5 ký tự")
    .required("Vui lòng điền họ và tên"),
  email: Yup.string().email("Email sai").required("Vui lòng điền email"),
  password: Yup.string()
    .min(8, "Phải có ít nhất 8 kí tự")
    .required("Hãy điền mật khẩu")
    .matches(
      /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/,
      "Độ dài 8 chữ số.Và có ít nhất một số và cả chữ thường, chữ hoa và ký tự đặc biệt"
    ),

  confirmPassword: Yup.string()
    .min(8, "Phải có ít nhất 8 kí tự")
    .oneOf(
      [Yup.ref("password")],
      ({ label }) => `Mật khẩu không khớp. Vui lòng kiểm tra lại!`
    )
    .required("Vui lòng xác nhận mật khẩu"),
  phoneNumber: Yup.string()
    .min(10, "Chính xác phải 10 chữ số")
    .max(10, "Chính xác phải 10 chữ số")
    .matches(/^[0-9]+$/, "Chỉ duy nhất số"),
});

const RegisterScreen = () => {
  const [genderSelected, setGenderSelected] = useState(1); // Mặc định là Nam
  const height = useHeaderHeight();
  const { showLoading, hideLoading } = useLoading();
  const navigation = useNavigation<any>();
  const handleSelectGender = (selectedGender: number) => {
    setGenderSelected(selectedGender);
  };

  const onSendForm = (
    fullName: string,
    email: string,
    password: string,
    phoneNumber: string,
  ) => {
    showLoading();
    apiRegister(fullName, email, password, phoneNumber, genderSelected).then((res:any)=>{
      console.log(res);
      if (res.statusCode == 200) {
        hideLoading();
        navigation.goBack(),
        Toast.show({
          type: "success",
          text1: 'Đăng kí thành công',
          text2: 'BHEP chúc bạn thật nhiều sức khoẻ!'
        })
        
      } else {
        hideLoading();
        Toast.show({
          type: "error",
          text1: 'Đăng kí thất bại',
          text2: 'Vui lòng liên hệ BHEP để được hỗ trợ thêm.'
        })
      }
    });
  };
  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
      }}
      validationSchema={RegisterSchema}
      onSubmit={(values) =>
        onSendForm(
          values.fullName,
          values.email,
          values.confirmPassword,
          values.phoneNumber
        )
      }
    >
      {({
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
        isValid,
        setFieldTouched,
        setFieldValue,
      }) => (
        <>
          <Header headerTitle="ĐĂNG KÍ TÀI KHOẢN" />

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            onTouchStart={() => {
              Keyboard.dismiss();
            }}
            keyboardVerticalOffset={height + 47}
          >
            <ScrollView>
              <Text style={{ color: globalColor.grey }}>
                Vui lòng điền đầy đủ thông tin để hồ sơ của bạn tốt hơn. Mọi dữ
                liệu cá nhân của bạn sẽ được bảo mật.
              </Text>
              <TextInputWithIcon
                label="Họ và tên"
                value={values.fullName}
                onChangeText={(text) => {
                  setFieldValue("fullName", text);
                  handleChange("fullName");
                  setFieldTouched("fullName", true, false);
                }}
              />
              {touched.fullName && errors.fullName && (
                <Text style={styles.errorText}>{errors.fullName}</Text>
              )}
              <TextInputWithIcon
                label="Email"
                value={values.email}
                onChangeText={(text) => {
                  setFieldValue("email", text);
                  handleChange("email");
                  setFieldTouched("email", true, false);
                }}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <TextInputWithIcon
                label="Mật khẩu"
                value={values.password}
                isPassword={true}
                onChangeText={(text) => {
                  setFieldValue("password", text);
                  handleChange("password");
                  setFieldTouched("password", true, false);
                }}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              <TextInputWithIcon
                label="Xác nhân mật khẩu"
                isPassword={true}
                value={values.confirmPassword}
                onChangeText={(text) => {
                  setFieldValue("confirmPassword", text);
                  handleChange("confirmPassword");
                  setFieldTouched("confirmPassword", true, false);
                }}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
              <TextInputWithIcon
                label="Số điện thoại"
                value={values.phoneNumber}
                isNumber={true}
                onChangeText={(text) => {
                  setFieldValue("phoneNumber", text);
                  handleChange("phoneNumber");
                  setFieldTouched("phoneNumber", true, false);
                }}
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
              )}
              <View>
                <Text style={{ color: "black" }}>Giới tính</Text>
                <View style={styles.checkContainer}>
                  <TouchableOpacity
                    style={[
                      styles.checkBox,
                      genderSelected === 1
                        ? { backgroundColor: globalColor.primaryColor }
                        : null,
                    ]}
                    onPress={() => handleSelectGender(1)}
                  />
                  <Text style={{ marginRight: 50,color:"black" }}> Nam</Text>
                  <TouchableOpacity
                    style={[
                      styles.checkBox,
                      genderSelected === 2
                        ? { backgroundColor: globalColor.primaryColor }
                        : null,
                    ]}
                    onPress={() => handleSelectGender(2)}
                  />
                  <Text style={{color: 'black'}}> Nữ</Text>
                </View>
              </View>
              <ButtonText
                disabled={!isValid}
                text="Đăng kí"
                styleContainer={
                  isValid
                    ? {
                        backgroundColor: globalColor.primaryColor,

                        height: 60,
                        borderRadius: 12,
                        marginBottom: 100,
                      }
                    : {
                        backgroundColor: "#aeb9b9",

                        height: 60,
                        borderRadius: 12,
                        marginBottom: 100,
                      }
                }
                styleText={{ color: "white", fontWeight: "bold" }}
                onPress={handleSubmit}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        </>
      )}
    </Formik>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderColor: "black",
    borderWidth: 1,
    marginRight: 10,
    marginVertical: 20,
  },
  checkContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    marginTop: -5,
  },
});
