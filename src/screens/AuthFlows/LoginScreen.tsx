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
import { globalStyle, STACK_NAVIGATOR_SCREENS } from "src/constants";
import { useAppDispatch, useAppSelector } from "@/redux";
import { setUserInfo } from "src/redux/slice";
import Toast from 'react-native-toast-message';
import AsyncStorage from "@react-native-async-storage/async-storage";
const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { showLoading, hideLoading } = useLoading();
  const isChecking = useAppSelector((state) => state.userHealthRecord.isChecking); 
 const handleLogin = async () => {
  try {
    showLoading();
    
    const res:any = await apiLogin(email, password);     
    if (res.statusCode === 200) {
      dispatch(setUserInfo(res?.data));
      await AsyncStorage.setItem('auth', JSON.stringify(res?.data)); 
    } else {
      // alert("Lỗi đăng nhập");
      Toast.show({
        type: "error",
        text1: 'Đăng nhập thất bại',
        text2: 'Vui lòng kiểm tra tài khoản và mật khẩu'
      });
    }
  } catch (error) {
    console.error(error); // Handle errors here
    Toast.show({
      type: "error",
      text1: 'Đăng nhập thất bại',
      text2: 'Đã xảy ra lỗi, vui lòng thử lại'
    });
  } finally {
    hideLoading(); // Ensure loading is hidden in both success and error cases
  }
};


  const registerHandle = () => {
    navigation.navigate(STACK_NAVIGATOR_SCREENS?.REGISTERSCREEN)
  }


  const storeData = async (value:string) => {
    try {
      await AsyncStorage.setItem('token', value);
    } catch (e) {
      // saving error
    }
  };

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

      <KeyboardAvoidingView style={styles.contentContainer} behavior="padding" >
        <Text style={styles.textWelcome}>XIN CHÀO</Text>
        <View style={styles.textInputContainer}>
          <View style={styles.textInput}>
            <TextInputNoIcon
              placeholderText="Tài khoản"
              onChangeText={(text) => setEmail(text)}
              textColor="white"
              underlineColor="white"
              autoCapitalize="none"
            />

            <View style={styles.textInput}></View>
            <TextInputNoIcon
              placeholderText="Mật khẩu"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              style={{color: 'white'}}
              autoCapitalize="none"
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
