import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Header } from "@/components";
import { globalStyle, STACK_NAVIGATOR_SCREENS } from "src/constants";

interface BMIResultScreenProps {
  route: any;
  navigation: any;
}

const BMIResultScreen: React.FC<BMIResultScreenProps> = ({
  route,
  navigation,
}) => {
  const { bmi } = route.params;

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return "Gầy";
    if (bmi >= 18.5 && bmi < 25) return "Bình thường";
    if (bmi >= 25 && bmi < 30) return "Thừa cân";
    if (bmi >= 30 && bmi < 35) return "Béo phì cấp độ 1";
    if (bmi >= 35 && bmi < 40) return "Béo phì cấp độ 2";
    return "Béo phì cấp độ 3";
  };

  const getBMIDescription = (bmi: number) => {
    if (bmi < 18.5) {
      return "Chỉ số BMI của bạn là gầy, cho thấy bạn có thể thiếu cân. Bạn nên tham khảo bác sĩ để có kế hoạch ăn uống và tập luyện phù hợp.";
    } else if (bmi >= 18.5 && bmi < 25) {
      return "Chỉ số BMI của bạn là bình thường, cho thấy cân nặng và chiều cao cân đối. Điều này thường kết hợp với tình trạng sức khỏe tốt và có lợi ích từ lối sống lành mạnh với chế độ ăn uống cân đối và hoạt động vận động đều đặn.";
    } else if (bmi >= 25 && bmi < 30) {
      return "Chỉ số BMI của bạn là thừa cân, cho thấy bạn có thể có nguy cơ gặp các vấn đề về sức khỏe. Bạn nên tham khảo bác sĩ để có kế hoạch ăn uống và tập luyện phù hợp.";
    } else if (bmi >= 30 && bmi < 35) {
      return "Chỉ số BMI của bạn là béo phì cấp độ 1, cho thấy bạn có nguy cơ cao gặp các vấn đề về sức khỏe. Bạn nên tham khảo bác sĩ để có kế hoạch giảm cân.";
    } else if (bmi >= 35 && bmi < 40) {
      return "Chỉ số BMI của bạn là béo phì cấp độ 2, cho thấy bạn có nguy cơ rất cao gặp các vấn đề về sức khỏe. Bạn nên tham khảo bác sĩ để có kế hoạch giảm cân ngay lập tức.";
    } else {
      return "Chỉ số BMI của bạn là béo phì cấp độ 3, cho thấy bạn có nguy cơ cực kỳ cao gặp các vấn đề về sức khỏe. Bạn cần tham khảo bác sĩ để có kế hoạch giảm cân ngay lập tức.";
    }
  };

  const bmiStatus = getBMIStatus(bmi);
  const bmiDescription = getBMIDescription(bmi);

  return (
    <>
      <Header headerTitle="Kết quả BMI" />
      <View style={styles.container}>
        <Text style={styles.title}>Chỉ số BMI của bạn:</Text>
        <Text style={styles.bmiValue}>{bmi.toFixed(1)}</Text>
        <View style={styles.bmiIndicator}>
          <Image
            source={require("../../assets/icons/bmiLevel.png")}
            style={styles.bmiImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.description}>
          Chỉ số BMI của bạn{" "}
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "black",
            }}
          >
            {bmi.toFixed(1)}
          </Text>{" "}
          là <Text style={{ fontWeight: "bold", color: "red" }}>{bmiStatus}</Text>. {bmiDescription}
        </Text>
        <View style={styles.suggestions}>
          <Text style={styles.suggestionsTitle}>Gợi ý của chúng tôi</Text>
          <Text style={styles.suggestion}>✓ Duy trì tập luyện đều đặn</Text>
          <Text style={styles.suggestion}>
            ✓ Chế độ ăn uống cân đối và đa dạng
          </Text>
          <Text style={styles.suggestion}>
            ✓ Theo dõi sức khỏe và kiểm tra định kỳ
          </Text>
        </View>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          style={styles.recalculateButton}
          onPress={() =>
            navigation.navigate(STACK_NAVIGATOR_SCREENS.BMICALCULATORSCREEN)
          }
        >
          <Text style={styles.buttonText}>Thực hiện lại</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default BMIResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "black",
  },
  bmiValue: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  bmiIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  bmiImage: {
    width: "150%", // Đảm bảo chiều rộng của hình ảnh phù hợp
    height: 40, // Đảm bảo chiều cao của hình ảnh phù hợp
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
    color: "black",
  },
  suggestions: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 10,
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  suggestion: {
    fontSize: 18,
    marginBottom: 5,
    color: "black",
  },
  recalculateButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "red",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});
