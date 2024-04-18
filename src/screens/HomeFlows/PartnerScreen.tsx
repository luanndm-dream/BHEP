import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
} from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  ButtonText,
  DropDownLabel,
  DropDownList,
  Header,
  TextInputWithIcon,
} from "@/components";
import { globalStyle } from "src/constants";
import { globalColor } from "src/constants/color";
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ImagePicker from "react-native-image-crop-picker";
import { useNavigation } from "@react-navigation/native";
import { apiPostApplicationJob } from "src/api/api_post_applicationJob";
import useLoading from "src/hook/useLoading";
const PartnerScreen = () => {
  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const navigation = useNavigation<any>();
  const customerId = 1;
  const [fullName, setFullName] = useState<string>("");
  const [certification, setCertification] = useState<string>("");
  const [major, setMajor] = useState<any>();
  const [workplace, setWorkplace] = useState<string>("");
  const [experienceYear, setExperienceYear] = useState<number>(0);
  const [imgBase64, setImgBase64] = React.useState<any>(null);
  const {showLoading, hideLoading} = useLoading();
  const handleSelectMajor = (majorId: number, majorName: string) => {
    const selectedMajor = { id: majorId, name: majorName };
    setMajor(selectedMajor);
  };
  const choosePhoto = () => {
    console.warn("choose");
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      console.log(image.data);
      setImgBase64(image?.data);
    });
  };
  const onSendForm = () => {
    showLoading()
    apiPostApplicationJob(
      customerId,
      fullName,
      certification,
      major?.id,
      imgBase64,
      workplace,
      experienceYear
    ).then((res : any) => {
      if(res.statusCode == 200) {
        navigation.navigate('MainFlows')
        hideLoading()
      }else{
      alert('Lỗi đăng kí')
      hideLoading()
      }
    });
  };
  return (
    <>
      <Header
        headerTitle="Đối tác"
        iconName="chevron-left"
        onPressIcon={() => navigation.goBack()}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={{ backgroundColor: globalColor.backgroundColor }}
          //  onTouchStart={()=>Keyboard.dismiss()}
        >
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={globalStyle.titleText}>Nộp đơn</Text>
              <Text style={{ color: globalColor.grey }}>
                Vui lòng điền đầy đủ thông tin để hồ sơ của bạn tốt hơn. Mọi dữ
                liệu cá nhân của bạn sẽ được bảo mật.
              </Text>
            </View>
            <TextInputWithIcon
              label="Họ và tên"
              onChangeText={(text) => setFullName(text)}
            />
            <TextInputWithIcon
              label="Các chứng chỉ"
              onChangeText={(text) => setCertification(text)}
            />
            <DropDownLabel
              label="Vị trí ứng tuyển"
              value={major?.name ? major.name : "Ấn vào để chọn"}
              onPress={() => {
                setIsVisible(!isVisible);
              }}
            />
            <TextInputWithIcon
              label="Địa chỉ làm việc"
              onChangeText={(text) => setWorkplace(text)}
            />
            <TextInputWithIcon
              label="Số năm kinh nghiệm"
              isNumber={true}
              onChangeText={(text) => setExperienceYear(text)}
            />
            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={choosePhoto}
            >
              {imgBase64 ? (
                <Image
                  source={{ uri: `data:image/jpeg;base64,${imgBase64}` }}
                  resizeMode="cover"
                  style={{ height: "100%", width: "100%", borderRadius: 12 }}
                />
              ) : (
                <View style={{ alignItems: "center" }}>
                  <MaterialCommunityIcons name="plus" size={30} />
                  <Text>Thêm ảnh</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <ButtonText
            text="Nộp đơn"
            styleContainer={{
              backgroundColor: globalColor.primaryColor,
              marginHorizontal: 8,
              height: 60,
              borderRadius: 12,
              marginBottom: 100,
            }}
            styleText={{ color: "white", fontWeight: "bold" }}
            onPress={onSendForm}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      {/* <View style={styles.buttonContainer}>
        <ButtonText
          text="Nộp đơn"
          styleContainer={{
            backgroundColor: globalColor.primaryColor,
            width: "100%",
            height: 60,
            borderRadius: 12,
          }}
          styleText={{color: 'white', fontWeight: 'bold'}}
          onPress={() => {}}
        />
      </View> */}

      {/* DropDownList */}
      <View style={styles.dropDownListContainer}>
        <DropDownList
          visible={isVisible}
          onCancel={() => setIsVisible(!isVisible)}
          onSelectMajor={handleSelectMajor}
          placeholderText="Tìm kiếm vị trí"
        />
      </View>
    </>
  );
};

export default PartnerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  titleContainer: {},
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    height: 200,
    borderWidth: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    left: 8,
    right: 8,
    alignItems: "center",
    zIndex: 999, // Đảm bảo button hiển thị trên tất cả các phần tử khác
  },
  dropDownListContainer: {
    zIndex: 998, // Đảm bảo DropDownList hiển thị trên button
  },
});
