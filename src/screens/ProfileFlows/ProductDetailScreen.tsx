import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ButtonText, Header, MessagePopup } from "@/components";
import { globalColor } from "src/constants/color";
import { apiGetUserById } from "src/api/api_getUserById";
import { useAppSelector } from "@/redux";
import { apiPostCoinTransaction } from "src/api/api_post_coinTransaction";
import Toast from 'react-native-toast-message';

const ProductDetailScreen = () => {
  const route = useRoute<any>();
  const product = route.params.data;
  const navigation = useNavigation<any>()
  const userId = useAppSelector((state) => state.user.userData.id);
  const [balance, setBalance] = useState<number>(0);
  const [isVisible, setIsvisible] = useState<boolean>(false);
  useEffect(() => {
    apiGetUserById(userId).then((res: any) => {
      setBalance(res.data.balance);
      console.log(res.data.balance);
    });
  }, []);

  const onPressBuy = () => {
    setIsvisible(true);
  };
  const onConfirmHandle = () => {
    apiPostCoinTransaction({
        userId,
        amount: product?.price,
        isMinus: true,
        title: product?.name,
        description: product?.name,
        isGenerateCode: false,
        products: [{ id: product.id, quantity: 1 }],
    }).then((res: any)=>{
        console.log(res)
        if(res.statusCode === 200){
            Toast.show({
                type: "success",
                text1: 'Mua hàng thành công',
                text2: 'Chúc quý khách thật nhiều sức khoẻ'
              });
            navigation.goBack();
            setIsvisible(false)
            }else{
              Toast.show({
                type: "error",
                text1: 'Mua hàng thất bại',
                text2: res.message
              });
              setIsvisible(false)
        }
    })
  }

  return (
    <>
      <Header headerTitle={product.name} />
      <SafeAreaView style={styles.container}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <View style={styles.content}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
          <Text style={styles.productPrice}>
            Giá:{" "}
            {product.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Text>
        </View>
        {/* <View style={styles.content}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="contain" // Chỉnh resizeMode thành contain để ảnh hiển thị toàn bộ
          />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
          </View>
        </View> */}
        <View style={{ flex: 1 }} />
        <ButtonText
          onPress={onPressBuy}
          styleContainer={styles.buttonContainer}
          text="Mua hàng"
          styleText={{ fontWeight: "bold" }}
          disabled={balance < product.price}
        />
      </SafeAreaView>
      {isVisible && (
        <MessagePopup
          isVisible={isVisible}
          onPressCancel={() => setIsvisible(false)}
          onPressConfirm={onConfirmHandle}
          confirmText="Xác nhận"
          content="Bạn có chắc chắn xác định mua hàng?"
          iconColor={globalColor.primaryColor}
          iconName={'help-circle'}
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
    height: "50%",

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
    color: 'black'
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
    margin: 16,
    borderRadius: 8,
    height: 60,
    backgroundColor: globalColor.secondaryColor,
  },
});
