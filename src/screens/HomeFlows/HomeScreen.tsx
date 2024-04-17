import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalColor } from "src/constants/color";
import { globalStyle } from "src/constants";

const HomeScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Xin Chào</Text>
          <Text style={styles.hello}>Hôm nay của bạn thế nào?</Text>
        </View>
        <View style={styles.banner}>
          <Image
            source={require("../../assets/image/banner.png")}
            style={styles.bannerImage}
          />
        </View>
        <View style={styles.bodyContainer}>
          <Text style={globalStyle.titleText}>Tính năng nổi bật</Text>
        </View>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
  },
  header: {
    marginBottom: 8,
  },
  bodyContainer: {
    marginVertical: 12
  },
  bannerImage: {
    height: 173,
    width: "100%",
    borderRadius: 24,
  },
  welcomeText: {
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
  },
  hello: {
    color: "#424242",
  },
});
