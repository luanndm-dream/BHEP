import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  ButtonText,
  CustomKeyboard,
  CustomModal,
  Header,
  MessagePopup,
} from "@/components";
import { TextInput } from "react-native";
import { globalColor } from "src/constants/color";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "@/redux";
import { apiPostDeletionAccount } from "src/api/api_post_deletionAccount";
import Toast from "react-native-toast-message";

const DisableAccountScreen = () => {
  const navigation = useNavigation<any>();
  const userId = useAppSelector((state) => state.user.userData.id);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [reason, setReason] = useState<string>("");

  const onPressConfirm = () => {
    apiPostDeletionAccount(userId, reason).then((res: any)=>{
      console.log(res)
      if(res.statusCode === 200){
        setIsVisible(false);
        navigation.goBack();
        Toast.show({
          type: "success",
          text1: "Gửi yêu cầu thành công",
          text2: "Xin chờ xét duyệt từ ban quản trị",
        });
      }
      else {
        Toast.show({
          type: "error",
          text1: "Yêu cầu thất bại",
          text2: res.message,
        });
        setIsVisible(false);
      }
    });
    
  };

  const onPressButton = () => {
    setIsVisible(!isVisible);
  };
  return (
    <>
      <Header headerTitle="Vô hiệu hoá tài khoản" />
      <CustomKeyboard>
        <View style={styles.container}>
          <View style={styles.textInputContainer}>
            <View style={styles.labelContainer}>
              <Text style={{ color: "black" }}>Lý do</Text>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Nếu có, không quá 100 kí tự..."
              placeholderTextColor={"grey"}
              multiline
              maxLength={100}
              onChangeText={(text: string) => setReason(text)}
            />
          </View>
          <View style={{ flex: 1 }} />
          <ButtonText
            styleContainer={styles.buttonContainer}
            onPress={onPressButton}
            text="Vô hiệu hoá tài khoản"
          />
        </View>
      </CustomKeyboard>
      {isVisible && (
        <MessagePopup
          isVisible
          title="Vô hiệu hoá"
          iconName="help-circle"
          content="Hãy chắc chắn rằng muốn vô hiệu hoá tài khoản này?"
          iconColor={"#ff5656"}
          onPressCancel={() => setIsVisible(false)}
          confirmText="Xác nhận"
          onPressConfirm={onPressConfirm}
          backgroundColorButton={"#ff5656"}
        />
      )}
    </>
  );
};

export default DisableAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 6,
  },
  textInputContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    marginVertical: 15,
  },
  textInput: {
    height: 140,
    textAlignVertical: "top",
    color: "black",
  },
  labelContainer: {
    alignSelf: "flex-start",
    paddingHorizontal: 3,
    marginStart: 10,
    zIndex: 1,
    elevation: 0.5,
    shadowColor: "white",
    position: "absolute",
    top: -12,
    backgroundColor: globalColor.backgroundColor,
  },
  buttonContainer: {
    backgroundColor: "#ff5656",
    height: 60,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
});
