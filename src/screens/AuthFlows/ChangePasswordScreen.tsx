import React from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { ButtonText, Header } from "@/components";
import { globalColor } from "src/constants/color";
import { globalStyle } from "src/constants";
import { Formik } from "formik";
import * as yup from "yup";
import { apiPutChangePassword } from "src/api/api_put_changePassword";
import { useAppSelector } from "@/redux";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import useLoading from "src/hook/useLoading";
const ChangePasswordScreen = () => {
  const navigate = useNavigation();
  const { showLoading, hideLoading } = useLoading();
  const userId = useAppSelector((state) => state.user.userData.id);
  const initialValues = {
    oldPassword: "***********",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = yup.object().shape({
    oldPassword: yup.string().required("Mật khẩu cũ không được để trống"),
    newPassword: yup
      .string()
      .required("Mật khẩu mới không được để trống")
      .min(6, "Mật khẩu mới phải có ít nhất 6 ký tự"),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("newPassword"), undefined],
        "Xác nhận mật khẩu mới không khớp"
      )
      .required("Xác nhận mật khẩu mới không được để trống"),
  });

  const onSubmit = (values: any) => {
    console.log(values.oldPassword);
    showLoading();
    apiPutChangePassword(
      userId,
      values.oldPassword,
      values.confirmPassword
    ).then((res: any) => {
      if (res.statusCode === 200) {
        hideLoading();
        navigate.goBack();
        Toast.show({
          type: "success",
          text1: "Đổi mật khẩu thành công",
          text2: "Mật khẩu bạn đã được cập nhật thành công",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Đổi mật khẩu thất bại",
          text2: res.message,
        });
        hideLoading();
      }
    });
  };

  return (
    <>
      <Header headerTitle="Đổi mật khẩu" />
      <SafeAreaView style={styles.container}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <>
              <View>
                <Text
                  style={globalStyle.titleText}
                >
                  Mật khẩu cũ
                </Text>
                <TextInput
                  secureTextEntry
                  style={styles.textInput}
                  onChangeText={handleChange("oldPassword")}
                  onBlur={handleBlur("oldPassword")}
                  onTouchStart={() => setFieldValue("oldPassword", undefined)} // Đặt giá trị về undefined khi chạm vào
                  value={values.oldPassword}
                />

                {touched.oldPassword && errors.oldPassword && (
                  <Text style={styles.errorText}>{errors.oldPassword}</Text>
                )}
              </View>
              <View>
                <Text
                  style={globalStyle.titleText}
                >
                  Mật khẩu mới
                </Text>
                <TextInput
                  secureTextEntry
                  style={styles.textInput}
                  onChangeText={handleChange("newPassword")}
                  onBlur={handleBlur("newPassword")}
                  value={values.newPassword}
                />
                {touched.newPassword && errors.newPassword && (
                  <Text style={styles.errorText}>{errors.newPassword}</Text>
                )}
              </View>
              <View>
                <Text
                  style={globalStyle.titleText}
                >
                  Xác nhận mật khẩu mới
                </Text>
                <TextInput
                  secureTextEntry
                  style={styles.textInput}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>
              <View style={{ flex: 1 }} />
              <View>
                <ButtonText
                  text="Xác nhận"
                  onPress={handleSubmit}
                  styleContainer={styles.confirmButton}
                  styleText={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
              </View>
            </>
          )}
        </Formik>
      </SafeAreaView>
    </>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
  },
  textInput: {
    height: 60,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#e5e3e3",
    marginVertical: 6,
    paddingHorizontal: 12,
    fontSize: 20,
    color: globalColor.grey,
  },
  confirmButton: {
    backgroundColor: globalColor.primaryColor,
    marginBottom: 20,
    height: 60,
    borderRadius: 16,
  },
  errorText: {
    color: "red",
    marginTop: 4,
  },
});
