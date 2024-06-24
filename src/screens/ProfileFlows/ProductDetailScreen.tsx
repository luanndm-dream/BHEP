import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Header } from '@/components';

const ProductDetailScreen = () => {
  const route = useRoute<any>();
  const product = route.params.data;

  return (
    <>
      <Header headerTitle={product.name} />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
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
        </View>
      </SafeAreaView>
    </>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Căn giữa theo chiều ngang
  },
  content: {
    borderRadius: 8,
  },
  productImage: {
    width: '100%',
    aspectRatio: 1,

  },
  productDetails: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2f95dc',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 16,
    color: 'grey',
  },
});
