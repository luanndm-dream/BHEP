import { Image, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { ButtonText, Header } from "@/components";
import { AirbnbRating } from "react-native-ratings";
import { useNavigation, useRoute } from "@react-navigation/native";
import { globalColor } from "src/constants/color";
import { apiPostUserRate } from "src/api/api_post_rating";
import Toast from "react-native-toast-message";
const RatingScreen = () => {
  const navigation = useNavigation()
  const route = useRoute<any>();
  const type = route.params.type;
  const data = route.params.data;
  const [reason, setReason] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  const handleRatingCompleted = (rating: number) => {
    setRating(rating);
    console.log("Rating is: " + rating);
  };

  const handleReasonChange = (text: string) => {
    setReason(text);
    setIsButtonEnabled(text.length > 0);
  };

  const handleRatingSubmit = () => {
    if (isButtonEnabled) {
      apiPostUserRate(data.customer.id, data.employee.id, data.id, reason,rating ).then((res: any)=>{
        if(res.statusCode === 200 ){
          Toast.show({
            type: "success",
            text1: "Đánh giá thành công",
            text2: "Chúc bạn có một ngày làm việc vui vẻ",
          });
          navigation.goBack()
        }else{
          Toast.show({
            type: "error",
            text1: "Xảy ra lỗi",
            text2: res.message,
          });
        
        }
      })
    }
  };

  return (
    <>
      <Header headerTitle="Đánh giá" />
      <SafeAreaView style={styles.container}>
        <View>
          {type === "appointment" ? (
            <View style={styles.avatarContainer}>
              <Image source={{ uri: data?.employee.avatar }} style={styles.avatar} />
              <Text style={styles.name}>{data?.employee?.fullName}</Text>
            </View>
          ) : (
            <></>
          )}
        </View>
        <AirbnbRating 
          reviews={["Rất tệ", "Tệ", "Ổn", "Rất tốt", "Xuất sắc"]}
          onFinishRating={handleRatingCompleted}
        />
        <View style={styles.textInputContainer}>
          <View style={styles.labelContainer}>
            <Text style={{ color: "black" }}>Lý do</Text>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="Lý do không quá 100 kí tự..."
            placeholderTextColor={"grey"}
            multiline
            maxLength={100}
            onChangeText={handleReasonChange}
          />
        </View>
        <View style={{ flex: 1 }} />
        <ButtonText
          onPress={handleRatingSubmit}
          styleContainer={{
            backgroundColor: isButtonEnabled ? globalColor.primaryColor : globalColor.disableColor,
            height: 60,
            marginBottom: 12,
            borderRadius: 8,
            width: '90%',
          }}
          styleText={{ fontWeight: "bold" }}
          text="Đánh giá"
          disabled={!isButtonEnabled}
        />
      </SafeAreaView>
    </>
  );
};

export default RatingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  textInputContainer: {
    width: "95%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    marginVertical: 15,
    marginHorizontal: 6,
  },
  textInput: {
    height: 140,
    textAlignVertical: "top",
    color: "black",
  },
  labelContainer: {
    alignSelf: "flex-start",
    paddingHorizontal: 3,
    marginStart: 10,
    zIndex: 1,
    elevation: 0.5,
    shadowColor: "white",
    position: "absolute",
    top: -12,
    backgroundColor: globalColor.backgroundColor,
  },
});
