import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Header } from "@/components";

const AboutUsScreen = () => {
  // Nội dung mô tả về công ty và dự án
  const companyDescription = `
    RAPTOR là một công ty công nghệ tập trung vào việc cải thiện sức khỏe cộng đồng 
    và nâng cao chất lượng cuộc sống. Dự án BHEP (Bảo vệ, Hỗ trợ, và Phát triển) 
    của chúng tôi nhằm mục đích mang đến các giải pháp hiệu quả và thân thiện với 
    người dùng, giúp cải thiện sức khỏe và hạnh phúc cho mọi người trong cộng đồng.
  `;

  return (
    <>
      <Header headerTitle="Về chúng tôi" />
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            source={require("../../assets/image/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.text}>{companyDescription}</Text>
        </View>
      </View>
    </>
  );
};

export default AboutUsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200, // Điều chỉnh kích thước của logo
    height: 200, // Điều chỉnh kích thước của logo
    marginBottom: 20, // Khoảng cách dưới logo
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    color: "#333333",
  },
});
