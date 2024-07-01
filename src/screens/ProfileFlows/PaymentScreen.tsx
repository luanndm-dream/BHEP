import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import React, { useState, useRef } from "react";
import { ButtonText, DropDownListWithImage, Header } from "@/components";
import { globalStyle, STACK_NAVIGATOR_SCREENS } from "src/constants";
import { paymentData } from "src/data/paymentData";
import { globalColor } from "src/constants/color";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { apiPostPaymentVNPay } from "src/api/api_post_payment_VNPay";
import { useAppSelector } from "@/redux";
import Toast from "react-native-toast-message";
import { apiPostPaymentPayOS } from "src/api/api_post_payment_PayOS";
import { apiPutPayment } from "src/api/api_put_Payment";

const PaymentScreen = () => {
  const navigate = useNavigation<any>();
  const userId = useAppSelector((state) => state.user.userData.id);
  const payment = paymentData;
  const [inputValue, setInputValue] = useState("");
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<any>();
  const [paymentUrl, setPaymentUrl] = useState<string>("");
  const [paymentId, setPaymentId] = useState<number>(0);
  const textInputRef = useRef<TextInput>(null);

  const formatNumber = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const onChangeValue = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setInputValue(formatNumber(numericValue));
  };

  const onChooseMethodPress = () => {
    setVisible(!visible);
  };

  console.log("userId", userId);
  const onConfirm = () => {
    const numericValue = inputValue.replace(/[^0-9]/g, "");
    const paymentAmount = Number(numericValue);
    if (selectedMethod.trim() === "Thanh toán qua VNPay") {
      apiPostPaymentVNPay(userId, paymentAmount).then((res: any) => {
        console.log("payment res ", res);
        setPaymentUrl(res?.data?.paymentUrl);
        setPaymentId(res?.data?.id);
      });
    } else if (selectedMethod.trim() === "Thanh toán qua PayOS") {
      console.log(paymentAmount);
      apiPostPaymentPayOS(
        userId,
        paymentAmount,
        "Nạp tiền hệ thống",
        [
          {
            name: "Nạp tiền hệ thống",
            quantity: 1,
            price: paymentAmount,
          },
        ],
        "https://www.google.com/",
        "https://www.google.com/",
        Math.floor(Date.now() / 1000) + 600
      ).then((res: any) => {
        if (res.statusCode === 200) {
          setPaymentUrl(res?.data?.checkoutUrl);
          setPaymentId(res.data.id);
        } else {
          Toast.show({
            type: "success",
            text1: "Thanh toán thất bại",
            text2: `Thanh toán thất bại, vui lòng liên hệ đội ngũ quản lí`, // Định dạng số tiền theo VND
          });
          navigate.goBack();
        }
      });
    }
  };

  const onNavigationStateChange = (navState: any) => {
    const { url } = navState;
    console.log(navState);
    if (
      url.includes("vnp_TransactionStatus=00") ||
      navState.canGoBack === true
    ) {
      const amount = Number(inputValue.replace(/[^0-9]/g, ""));
      const formattedAmount = amount.toLocaleString("vi-VN");
      apiPutPayment(paymentId, 2).then((res: any) => {
        console.log("res update balance", res);
      });
      Toast.show({
        type: "success",
        text1: "Thanh toán thành công",
        text2: `Bạn đã thanh toán thành công ${formattedAmount} VND`, // Định dạng số tiền theo VND
      });

      navigate.goBack();
      setPaymentUrl("");
    } else {
      apiPutPayment(paymentId, 1);
    }
  };

  return (
    <>
      <Header headerTitle="Thanh toán" />
      <SafeAreaView
        style={styles.container}
        onTouchStart={() => Keyboard.dismiss()}
      >
        {paymentUrl ? (
          <WebView
            source={{ uri: paymentUrl }}
            style={{ flex: 1 }}
            onNavigationStateChange={onNavigationStateChange}
          />
        ) : (
          <View style={styles.content}>
            <View style={styles.addCashContainer}>
              <Text style={globalStyle.titleText}>
                Vui lòng nhập số tiền cần nạp
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  ref={textInputRef}
                  placeholder="₫"
                  placeholderTextColor={"black"}
                  autoFocus
                  style={styles.textInput}
                  maxLength={15}
                  keyboardType="numeric"
                  value={inputValue}
                  onChangeText={onChangeValue}
                />
              </View>
              <TouchableOpacity
                style={styles.methodButton}
                onPress={onChooseMethodPress}
              >
                <Text style={{ color: "black" }}>
                  Chọn phương thức thanh toán
                </Text>
              </TouchableOpacity>
              <Text style={{ color: "black", marginVertical: 6 }}>
                Vui lòng nạp giá trị lớn hơn 50.000đ
              </Text>
            </View>
            {selectedMethod && (
              <View style={styles.methodContainer}>
                <Image source={imageUrl} style={{ width: 30, height: 30 }} />
                <Text style={styles.methodName}>{selectedMethod}</Text>
              </View>
            )}
            <View style={{ flex: 1 }} />
            <ButtonText
              onPress={onConfirm}
              text={`Thanh toán ${inputValue}`}
              styleContainer={{
                backgroundColor: globalColor.secondaryColor,

                padding: 16,
                borderRadius: 8,
              }}
              styleText={{ fontWeight: "bold" }}
              disabled={
                !selectedMethod ||
                Number(inputValue.replace(/[^0-9]/g, "")) < 50000
              }
            />
          </View>
        )}
      </SafeAreaView>
      <View style={{ zIndex: 2 }}>
        <DropDownListWithImage
          visible={visible}
          dataList={payment}
          onCancel={() => setVisible(!visible)}
          onSelectItem={(item, name, image, typeMethod) => {
            setSelectedMethod(name);
            setImageUrl(image);
          }}
        />
      </View>
    </>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8
  },
  content: {
    flex: 1,
  },
  addCashContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    height: 100,
    fontSize: 50,
    width: "80%",
    textAlign: "center",
    color: "black",
  },
  currencySymbol: {
    fontSize: 40,
    color: "grey",
    marginLeft: -10, // Adjust as needed
  },
  methodContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 24,
    backgroundColor: "white",
    borderRadius: 8,
    marginVertical: 8,
  },
  methodName: {
    fontSize: 16,
    color: "black",
    fontWeight: "600",
    marginLeft: 20,
  },
  methodButton: {
    padding: 12,
    backgroundColor: globalColor.secondaryColor,
    borderRadius: 8,
  },
  buttonText: {
    marginBottom: 16, // Optional: margin for spacing from bottom
  },
});
