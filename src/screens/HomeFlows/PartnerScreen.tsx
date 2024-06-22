import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
  StatusBar,
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
import { globalStyle, STACK_NAVIGATOR_SCREENS } from "src/constants";
import { globalColor } from "src/constants/color";
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ImagePicker from "react-native-image-crop-picker";
import { useNavigation } from "@react-navigation/native";
import { apiPostApplicationJob } from "src/api/api_post_applicationJob";
import useLoading from "src/hook/useLoading";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useHeaderHeight } from "@react-navigation/elements";
import { useAppSelector } from "@/redux";
import { MajorData } from "src/data/majorData";
import Toast from "react-native-toast-message";

const PartnerSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Họ tên phải lớn hơn 2 ký tự")
    .required("Bắt buộc"),
  certification: Yup.string()
    .min(2, "Họ tên phải lớn hơn 2 ký tự")
    .required("Không được bỏ trống"),

  workplace: Yup.string()
    .min(2, "Họ tên phải lớn hơn 2 ký tự")
    .required("Vị trí làm việc"),
  experienceYear: Yup.number().required("Số năm làm việc"),
});

const PartnerScreen = () => {
  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const navigation = useNavigation<any>();
  // const customerId = 11;
  const [fullName, setFullName] = useState<string>("");
  const [certification, setCertification] = useState<string>("");
  const [major, setMajor] = useState<any>();
  const [workplace, setWorkplace] = useState<string>("");
  const [experienceYear, setExperienceYear] = useState<number>(0);
  const [avatar, setAvatar] = useState<any>();
  const [imageBase64, setImageBase64]= useState<string>("")
  const { showLoading, hideLoading } = useLoading();
  const height = useHeaderHeight();
  const customerId = useAppSelector((state) => state?.user?.userData?.id);
  const handleSelectMajor = (majorId: number, majorName: string) => {
    const selectedMajor = { id: majorId, name: majorName };
    setMajor(selectedMajor);
  };
  const choosePhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image: any) => {
      console.log(image)
      setImageBase64(image.data)
      setAvatar({
        uri:
          Platform.OS === "android"
            ? image?.path
            : image?.path.replace("file://", ""),
        type: "image/jpg",
        name: "image.jpg",
      })
    });
  };
  const onSendForm = (
    fullName: string,
    certification: string,
    workplace: string,
    experienceYear: number
  ) => {
    showLoading();
    apiPostApplicationJob(
      customerId,
      fullName,
      certification,
      major?.id,
      avatar,
      workplace,
      experienceYear
    ).then((res: any) => {
      console.log(res);
      if (res.statusCode == 200) {
        Toast.show({
          type: "success",
          text1: "Đăng kí đối tác thành công",
          text2: "Vui lòng chờ kết quả từ đội ngũ quản lí",
        });
        navigation.navigate(STACK_NAVIGATOR_SCREENS?.MAINFLOWS);
        hideLoading();
      } else {
        Toast.show({
          type: "error",
          text1: "Đăng kí thất bại",
          text2: `Đã xảy ra lỗi ${res.message}`,
        });
        hideLoading();
      }
    });
  };
  return (
    <Formik
      initialValues={{
        fullName: "",
        certification: "",
        workplace: "",
        experienceYear: 0,
      }}
      validationSchema={PartnerSchema}
      onSubmit={(values) =>
        onSendForm(
          values.fullName,
          values.certification,
          values.workplace,
          values.experienceYear
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
          <Header headerTitle="ĐỐI TÁC" />

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={height + 47}
          >
            <ScrollView
              style={{ backgroundColor: globalColor.backgroundColor }}
              //  onTouchStart={()=>Keyboard.dismiss()}
            >
              <View style={styles.container}>
                <View style={styles.titleContainer}>
                  <Text style={globalStyle.titleText}>Nộp đơn</Text>
                  <Text style={{ color: globalColor.grey }}>
                    Vui lòng điền đầy đủ thông tin để hồ sơ của bạn tốt hơn. Mọi
                    dữ liệu cá nhân của bạn sẽ được bảo mật.
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "80%",
                  }}
                >
                  <TouchableOpacity
                    style={styles.avatarContainer}
                    onPress={choosePhoto}
                  >
                    {imageBase64 ? (
                      <Image
                        source={{ uri: `data:image/jpeg;base64,${imageBase64}` }}
                        resizeMode="cover"
                        style={{
                          height: "100%",
                          width: "100%",
                          borderRadius: 40,
                        }}
                      />
                    ) : (
                      <View style={{ alignItems: "center" }}>
                        <MaterialCommunityIcons
                          name="plus"
                          size={20}
                          color={"black"}
                        />
                        <Text style={{ color: "black" }}>Thêm ảnh</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                  <Text
                    style={{ marginHorizontal: 12, color: globalColor.grey }}
                  >
                    Vui lòng chọn ảnh thật xinh đẹp, vì ảnh này mọi người có thể
                    thấy được!
                  </Text>
                </View>
                <TextInputWithIcon
                  label="Họ và tên"
                  onChangeText={(text) => {
                    setFieldValue("fullName", text);
                    handleChange("fullName");
                    setFieldTouched("fullName", true, false);
                  }}
                  value={values.fullName}
                />
                {touched.fullName && errors.fullName && (
                  <Text style={styles.errorText}>{errors.fullName}</Text>
                )}
                <TextInputWithIcon
                  label="Các chứng chỉ"
                  onChangeText={(text) => {
                    setFieldValue("certification", text);
                    handleChange("certification");
                    setFieldTouched("certification", true, false);
                  }}
                  value={values.certification}
                />
                {touched.certification && errors.certification && (
                  <Text style={styles.errorText}>{errors.certification}</Text>
                )}
                <DropDownLabel
                  label="Vị trí ứng tuyển"
                  value={major?.name ? major?.name : "Ấn vào để chọn"}
                  onPress={() => {
                    setIsVisible(!isVisible);
                  }}
                />
                <TextInputWithIcon
                  label="Địa chỉ làm việc"
                  onChangeText={(text) => {
                    handleChange("workplace");
                    setFieldValue("workplace", text);
                    setFieldTouched("workplace", true, false);
                  }}
                  value={values.workplace}
                />
                {touched.workplace && errors.workplace && (
                  <Text style={styles.errorText}>{errors.workplace}</Text>
                )}
                <TextInputWithIcon
                  label="Số năm kinh nghiệm"
                  isNumber={true}
                  onChangeText={(text) => {
                    handleChange("experienceYear");
                    setFieldValue("experienceYear", text);
                    setFieldTouched("experienceYear", true, false);
                  }}
                  value={String(values.experienceYear)}
                />
                {touched.experienceYear && errors.experienceYear && (
                  <Text style={styles.errorText}>{errors.experienceYear}</Text>
                )}
              </View>
              <ButtonText
                disabled={!isValid}
                text="Nộp đơn"
                styleContainer={
                  isValid
                    ? {
                        backgroundColor: globalColor.primaryColor,
                        marginHorizontal: 8,
                        height: 60,
                        borderRadius: 12,
                        marginBottom: 100,
                      }
                    : {
                        backgroundColor: "#aeb9b9",
                        marginHorizontal: 8,
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
              dataList={MajorData}
              visible={isVisible}
              onCancel={() => setIsVisible(!isVisible)}
              onSelectMajor={handleSelectMajor}
              placeholderText="Tìm kiếm vị trí"
            />
          </View>
        </>
      )}
    </Formik>
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
    marginVertical: 12,
    borderRadius: 40,
    height: 80,
    width: 80,
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
  errorText: {
    color: "red",
    marginTop: -5,
  },
});
