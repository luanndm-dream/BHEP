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
import React, { useState } from "react";
import { ButtonText, DropDownListWithImage, Header } from "@/components";
import { globalStyle } from "src/constants";
import { paymentData } from "src/data/paymentData";
import { globalColor } from "src/constants/color";

const PaymentScreen = () => {
  const payment = paymentData;
  const [inputValue, setInputValue] = useState("");
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<any>();

  const onChangeValue = (value: string) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, "");
    if (numericValue) {
      // Convert to number and format as currency
      const formattedValue = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(Number(numericValue));
      setInputValue(formattedValue);
    } else {
      setInputValue("");
    }
  };
  const onChooseMethodPress = () => {
    setVisible(!visible);
  };

  return (
    <>
      <Header headerTitle="Thanh toán" />
      <SafeAreaView
        style={styles.container}
        onTouchStart={() => Keyboard.dismiss()}
      >
        <View style={styles.content}>
          <View style={styles.addCashContainer}>
            <Text style={globalStyle.titleText}>
              Vui lòng nhập số tiền cần nạp
            </Text>
            <TextInput
              placeholder="₫"
              autoFocus
              style={styles.textInput}
              maxLength={15}
              keyboardType="numeric"
              value={inputValue}
              onChangeText={onChangeValue}
            />
            <TouchableOpacity
              style={styles.methodButton}
              onPress={onChooseMethodPress}
            >
              <Text style={{ color: "black" }}>
                Chọn phương thức thanh toán
              </Text>
            </TouchableOpacity>
          </View>
          {selectedMethod && (
            <View style={styles.methodContainer}>
              <Image source={imageUrl} style={{ width: 30, height: 30 }} />
              <Text style={styles.methodName}>{selectedMethod}</Text>
            </View>
          )}
          <View style={{ flex: 1 }} />
          <ButtonText
            onPress={() => {}}
            text={`Thanh toán ${inputValue}`}
            styleContainer={{
              backgroundColor: globalColor.secondaryColor,
              marginBottom: 16,
              padding: 16,
              borderRadius: 8,
            }}
            styleText={{fontWeight: 'bold'}}
          />
        </View>
      </SafeAreaView>
      <View style={{ zIndex: 2 }}>
        <DropDownListWithImage
          visible={visible}
          dataList={payment}
          onCancel={() => setVisible(!visible)}
          onSelectItem={(item, name, image) => {
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
    margin: 8,
  },
  content: {
    flex: 1,
  },
  addCashContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
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
  textInput: {
    height: 100,
    fontSize: 50,
    width: "80%",
    textAlign: "center",
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
