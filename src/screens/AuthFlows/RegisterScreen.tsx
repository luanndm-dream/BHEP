import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Header, TextInputWithIcon } from "@/components";
import { globalStyle } from "src/constants";
import { globalColor } from "src/constants/color";

const RegisterScreen = () => {
  return (
    <>
      <Header headerTitle="ĐĂNG KÍ TÀI KHOẢN" />

      <View style={styles.container}>
        <Text style={{ color: globalColor.grey }}>
          Vui lòng điền đầy đủ thông tin để hồ sơ của bạn tốt hơn. Mọi dữ liệu
          cá nhân của bạn sẽ được bảo mật.
        </Text>
        <TextInputWithIcon label="Họ và tên" />
        <TextInputWithIcon label="Email" />
        <TextInputWithIcon label="Mật khẩu" />
        <TextInputWithIcon label="Xác nhân mật khẩu" />
        <TextInputWithIcon label="Số điện thoại" />
        <></>
      </View>
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
});
