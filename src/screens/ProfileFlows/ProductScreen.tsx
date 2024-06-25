import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { Header } from '@/components';
import { apiGetProduct } from 'src/api/api_get_product';
import { globalColor } from 'src/constants/color';
import { useNavigation } from '@react-navigation/native';
import { STACK_NAVIGATOR_SCREENS } from 'src/constants';

const ProductScreen = () => {
  const [products, setProducts] = useState<any[]>([]);
  const navigation = useNavigation<any>()
  useEffect(() => {
    apiGetProduct().then((res: any) => {
      if (res.statusCode === 200) {
        setProducts(res?.data?.items);
      }
    });
  }, []);

  // Function to format price to Vietnamese format (e.g., 650.000 VNĐ)
  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };


  const onPressDetail = (index: number) => {
    navigation.navigate(STACK_NAVIGATOR_SCREENS.PRODUCTDETAILSCREEN, {
      data: products[index]
    })
  } 


  return (
    <>
      <Header headerTitle='Sản phẩm'/>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item,index }) => (
            <TouchableOpacity style={styles.productItem} onPress={()=>onPressDetail(index)}>
              <Image
                source={{ uri: item.image }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Canh theo chiều dọc bắt đầu từ trên xuống
    padding: 16,
    backgroundColor: 'white',
    margin: 6,
    borderRadius: 8,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center', // Canh giữa theo chiều dọc
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: globalColor.secondaryColor,
    marginTop: 8, // Khoảng cách giữa tên sản phẩm và giá
  },
});
