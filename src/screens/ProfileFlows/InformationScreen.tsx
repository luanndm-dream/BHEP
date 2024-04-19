import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { ButtonText, Header } from "@/components";
import { globalStyle } from "src/constants";
import { globalColor } from "src/constants/color";
import { useRoute } from "@react-navigation/native";

const InformationScreen = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [password, setPassword] = useState<any>("*************");
  const route = useRoute<any>();
  const data = route.params?.data;
  console.log(data);

  const editHandle = () => {
    setIsEdit(!isEdit);
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
          <TextInput style={styles.textInput} value={data?.fullName} editable={isEdit}/>
        </View>
        <View>
          <Text style={[globalStyle.titleText, { color: globalColor.grey }]}>
            Email
          </Text>
          <TextInput style={styles.textInput} value={data?.email} editable={isEdit}/>
        </View>
        <View>
          <Text style={[globalStyle.titleText, { color: globalColor.grey }]}>
            Số điện thoại
          </Text>
          <TextInput style={styles.textInput} value={data?.phoneNumber} editable={isEdit}/>
        </View>
        <View>
          <Text style={[globalStyle.titleText, { color: globalColor.grey }]}>
            Mật khẩu
          </Text>
          <TextInput
          editable={isEdit}
            style={styles.textInput}
            value={password}
            onTouchStart={() => setPassword(undefined)}
          />
        </View>
        {/* <View>
          <Text style={[globalStyle.titleText, {color: globalColor.grey}]}>Giới thiệu bản thân</Text>
          <TextInput style={styles.textInput} />
        </View> */}
      </ScrollView>
      <View style={{ backgroundColor: "white" }}>
        <ButtonText
          text={isEdit ? "Xác nhận" : "Chỉnh sửa"}
          onPress={editHandle}
          styleContainer={isEdit ? styles.editButton : styles.confirmButton}
          styleText={{
            color: "white",
            fontWeight: 'bold'
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
    color: globalColor.grey,
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
});
