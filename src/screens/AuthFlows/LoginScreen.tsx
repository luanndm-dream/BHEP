import {
  Image,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { globalColor } from "src/constants/color";
import { ButtonText, TextInputNoIcon } from "@/components";
import { apiLogin } from "src/api/api_login";
import { useNavigation } from "@react-navigation/native";
import useLoading from "src/hook/useLoading";
import { globalStyle } from "src/constants";

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation<any>();
  const { showLoading, hideLoading } = useLoading();
  const handleLogin = () => {
    showLoading();
    apiLogin(email, password).then((res: any) => {
      if (res.statusCode == 200) {
        navigation.navigate("MainFlows");
        hideLoading();
      } else {
        alert("Lỗi đăng nhập");
        hideLoading();
      }
    });
  };

  const registerHandle = () => {
    navigation.navigate('RegisterScreen')
  }

  return (
    <View style={{ flex: 1 }} onTouchStart={() => Keyboard.dismiss()}>
      {/* // <SafeAreaView onTouchStart={()=> Keyboard.dismiss()} style={{flex: 1}}> */}
      {/* <Image
        source={require("../../assets/image/spidium.png")}
        style={[styles.spidium, ]}
      /> */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/image/logo.png")}
          style={styles.logoImage}
        />
        <View>
          <Text style={styles.logoName}>BHEP</Text>
          <Text style={styles.slogant}>Your health in your hand</Text>
        </View>
      </View>

      <KeyboardAvoidingView style={styles.contentContainer} behavior="padding">
        <Text style={styles.textWelcome}>XIN CHÀO</Text>
        <View style={styles.textInputContainer}>
          <View style={styles.textInput}>
            <TextInputNoIcon
              placeholderText="Tài khoản"
              onChangeText={(text) => setEmail(text)}
            />

            <View style={styles.textInput}></View>
            <TextInputNoIcon
              placeholderText="Tài khoản"
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View>
            <ButtonText
              text="Đăng nhập"
              styleContainer={styles.button}
              styleText={{ color: "black" }}
              onPress={handleLogin}
            />
            <View style={styles.footerContainer}>
              <TouchableOpacity style={{ marginTop: 15 }} onPress={registerHandle}>
                <Text style={[globalStyle.titleText, { color: "white" }]}>
                  Đăng kí tài khoản
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>Quên mật khẩu?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      {/* </SafeAreaView> */}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  logoContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  contentContainer: {
    flex: 2.5,
    backgroundColor: globalColor.secondaryColor,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  textInputContainer: {
    marginHorizontal: 12,
  },
  textInput: {
    marginVertical: 10,
  },
  logoImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  spidium: {
    width: 220,
    height: 180,
    flex: 1,
    position: "absolute",
    right: 20,
  },
  logoName: {
    fontSize: 64,
    fontWeight: "bold",
    color: globalColor.nameLogoColor,
  },
  footerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  slogant: {
    color: "#4871F2",
    fontSize: 13,
  },
  textWelcome: {
    fontSize: 24,
    color: "white",
    marginLeft: 12,
    marginTop: 12,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "white",
    height: 60,
    borderRadius: 8,
  },
});
