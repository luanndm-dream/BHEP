import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ButtonText,
  Header,
  MessagePopup,
  TextInputWithIcon,
} from "@/components";
import { globalColor } from "src/constants/color";
import { apiGetUserById } from "src/api/api_getUserById";
import { useAppSelector } from "@/redux";
import { apiPostCoinTransaction } from "src/api/api_post_coinTransaction";
import Toast from "react-native-toast-message";
import { Formik } from "formik";
import * as Yup from "yup";

const ProductDetailScreen = () => {
  const route = useRoute<any>();
  const product = route.params.data;
  const navigation = useNavigation<any>();
  const userId = useAppSelector((state) => state.user.userData.id);
  const [balance, setBalance] = useState<number>(0);
  const [isVisible, setIsvisible] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<{ name: string; phone: string; address: string } | null>(null);

  useEffect(() => {
    apiGetUserById(userId).then((res: any) => {
      setBalance(res.data.balance);
      console.log(res.data.balance);
    });
  }, []);

  const onPressBuy = (values: { name: string; phone: string; address: string }) => {
    setFormValues(values);
    setIsvisible(true);
  };

  const onConfirmHandle = () => {
    if (!formValues) return;
    
    const description = `${formValues.name}-${formValues.phone}-${formValues.address}`;
    apiPostCoinTransaction({
      userId,
      amount: product?.price,
      isMinus: true,
      title: product?.name,
      description: description,
      isGenerateCode: false,
      products: [{ id: product.id, quantity: 1 }],
    }).then((res: any) => {
      console.log(res);
      if (res.statusCode === 200) {
        Toast.show({
          type: "success",
          text1: "Mua hàng thành công",
          text2: "Chúc quý khách thật nhiều sức khoẻ",
        });
        navigation.goBack();
        setIsvisible(false);
      } else {
        Toast.show({
          type: "error",
          text1: "Mua hàng thất bại",
          text2: res.message,
        });
        setIsvisible(false);
      }
    });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(50, "Tên không quá 50 kí tự")
      .required("Tên không được để trống"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ")
      .required("Số điện thoại không được để trống"),
    address: Yup.string()
      .max(100, "Địa chỉ không quá 100 kí tự")
      .required("Địa chỉ không được để trống"),
  });

  return (
    <>
      <Header headerTitle={product.name} />
      <SafeAreaView style={styles.container}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <ScrollView style={styles.content}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
          <Text style={styles.productPrice}>
            Giá:{" "}
            {product.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Text>

          <Formik
            initialValues={{ name: "", phone: "", address: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => onPressBuy(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <TextInputWithIcon
                  label="Tên người nhận hàng"
                  placeholder="Tên không quá 50 kí tự"
                  maxLength={50}
                  style={{ color: "black" }}
                  onChangeText={handleChange("name")}
                  placeholderTextColor={"grey"}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
                {errors.name && touched.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
                <TextInputWithIcon
                  label="Số điện thoại"
                  placeholder="+84"
                  maxLength={10}
                  placeholderTextColor={"grey"}
                  style={{ color: "black" }}
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                />
                {errors.phone && touched.phone && (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                )}
                <View style={styles.textInput}>
                  <View style={styles.labelContainer}>
                    <Text style={{ color: "black" }}>Địa chỉ</Text>
                  </View>
                  <TextInput
                    style={{
                      height: 140,
                      textAlignVertical: "top",
                      color: "black",
                    }}
                    placeholder="Địa chỉ không quá 100 kí tự..."
                    placeholderTextColor={"grey"}
                    multiline
                    maxLength={100}
                    onChangeText={handleChange("address")}
                    onBlur={handleBlur("address")}
                    value={values.address}
                  />
                  {errors.address && touched.address && (
                    <Text style={styles.errorText}>{errors.address}</Text>
                  )}
                </View>

                <View style={{ flex: 1 }} />
                <ButtonText
                  onPress={handleSubmit}
                  styleContainer={styles.buttonContainer}
                  text="Mua hàng"
                  styleText={{ fontWeight: "bold" }}
                  disabled={
                    balance < product.price ||
                    !values.name ||
                    !values.phone ||
                    !values.address
                  }
                />
              </>
            )}
          </Formik>
        </ScrollView>
      </SafeAreaView>
      {isVisible && (
        <MessagePopup
          isVisible={isVisible}
          onPressCancel={() => setIsvisible(false)}
          onPressConfirm={onConfirmHandle}
          confirmText="Xác nhận"
          content="Bạn có chắc chắn xác định mua hàng?"
          iconColor={globalColor.primaryColor}
          iconName={"help-circle"}
          title="Mua hàng"
        />
      )}
    </>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center', // Căn giữa theo chiều ngang
  },
  content: {
    padding: 8,
  },
  productImage: {
    width: "100%",
    height: "30%",
    // aspectRatio: 1,
  },
  productDetails: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  },
  productName: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    color: "black",
  },
  productPrice: {
    fontSize: 28,
    fontWeight: "bold",
    color: globalColor.secondaryColor,
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 18,
    color: "grey",
    marginBottom: 8,
  },
  buttonContainer: {
    marginBottom: 16,
    borderRadius: 8,
    height: 60,
    backgroundColor: globalColor.secondaryColor,
  },
  textInput: {
    height: 100,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    marginVertical: 15
  },
  labelContainer: {
    // Same color as background
    alignSelf: "flex-start", // Have View be same width as Text inside
    paddingHorizontal: 3, // Amount of spacing between border and first/last letter
    marginStart: 10, // How far right do you want the label to start
    zIndex: 1, // Label must overlap border
    elevation: 0.5, // Needed for android
    shadowColor: "white", // Same as background color because elevation: 1 creates a shadow that we don't want
    position: "absolute", // Needed to be able to precisely overlap label with border
    top: -12,
    backgroundColor: globalColor.backgroundColor, // Vertical
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 16,
  },
});
