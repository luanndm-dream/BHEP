import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  ButtonText,
  Header,
  ListItemQuestion,
  MessagePopup,
} from "@/components";
import { FlatList } from "react-native-gesture-handler";
import { ListQuestion } from "src/data/listQuestion";
import { globalColor } from "src/constants/color";
import { StatusBar } from "react-native";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Toast from "react-native-toast-message";
const QuestionnaireScreen = () => {
  const data = ListQuestion;
  const navigation = useNavigation<any>();
  const [userResponse, setUserResponse] = useState();
  const [answers, setAnswers] = useState<{ [idQuestion: number]: number[] }>(
    {}
  );
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const handleAnswerPress = (questionId: number, answerId: number) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = { ...prevAnswers };

      // Kiểm tra nếu questionId đã tồn tại trong answers
      if (questionId in updatedAnswers) {
        const answerIndex = updatedAnswers[questionId].indexOf(answerId);

        // Nếu answerId đã tồn tại, loại bỏ nó khỏi danh sách
        if (answerIndex !== -1) {
          updatedAnswers[questionId].splice(answerIndex, 1);
        } else {
          // Nếu answerId chưa tồn tại, thêm nó vào danh sách
          updatedAnswers[questionId].push(answerId);
        }
      } else {
        // Nếu questionId chưa tồn tại, tạo mới danh sách và thêm answerId
        updatedAnswers[questionId] = [answerId];
      }

      return updatedAnswers;
    });
  };

  const onSkip = () => {
    setIsVisible(!isVisible)
  };
  const onPressConfirm = () => {
    setIsVisible(false);
    navigation.reset({
      index: 0,
      routes: [{ name: "MainFlows" }],
    });
    // dispatch(resetUserInfo());
  };

  return (
    <>
      
        <StatusBar
          backgroundColor={globalColor.primaryColor}
          barStyle={"light-content"}
        />
        <SafeAreaView
          style={{ flex: 0, backgroundColor: globalColor.primaryColor }}
        />
        <View
          style={[
            styles.headerContainer,
            {
              height: Platform.OS === "ios" ? 60 : 80,
              marginTop: Platform.OS === "android" ? 0 : 0,
            },
          ]}
        >
          <Text style={styles.headerTitle}>Khảo sát</Text>
          <TouchableOpacity
            onPress={()=>onSkip()}
            style={styles.headerIcon}
          >
            <Text style={{ color: "white" }}>Bỏ qua</Text>
          </TouchableOpacity>
        </View>
     
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <ListItemQuestion
              idQuestion={item.id}
              title={item.title}
              questionList={item?.answerList}
              question={item.question}
              onPressAnswer={handleAnswerPress}
            />
          );
        }}
      />
      <ButtonText
        text="Hoàn thành"
        onPress={() => {}}
        styleContainer={styles.buttonContainer}
        styleText={styles.buttonText}
      />
       {isVisible && (
        <MessagePopup
          isVisible
          title="Bỏ qua"
          iconName="help-circle"
          content="Hãy chắc chắn rằng muốn bỏ qua?"
          iconColor={globalColor.primaryColor}
          onPressCancel={() => setIsVisible(false)}
          confirmText="Bỏ qua"
          onPressConfirm={onPressConfirm}
        />
      )}
    </>
  );
};

export default QuestionnaireScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    height: 60,
    backgroundColor: globalColor.primaryColor,
    marginVertical: 18,
    marginHorizontal: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  headerContainer: {
    flex: 0,
    backgroundColor: globalColor.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  headerIcon: {
    position: "absolute",
    right: 15,
    //    alignSelf: 'center'
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
