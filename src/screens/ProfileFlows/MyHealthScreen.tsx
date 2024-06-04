import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux";
import { ListQuestion } from "src/data/listQuestion";
import { Header } from "@/components";
import { globalFontSize } from "src/constants/fontSize";
import { globalColor } from "src/constants/color";
import { useNavigation } from "@react-navigation/native";
import { STACK_NAVIGATOR_SCREENS } from "src/constants";

interface HealthRecord {
  question: string;
  answer: string;
}

const MyHealthScreen = () => {
  const answers: any = useAppSelector((state) => state.userHealthRecord);
  const navigation = useNavigation<any>();
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
  const [surveyCompleted, setSurveyCompleted] = useState<boolean>(false);
  const getQuestionAndAnswer = (idQuestion: number, idAnswer: number) => {
    const question: any = ListQuestion.find(
      (question) => question.id === idQuestion
    );
    if (!question) return "Câu hỏi không tồn tại";

    const answer = question.answerList.find(
      (answer: any) => answer.id === idAnswer
    );
    if (!answer) return "Câu trả lời không tồn tại";

    return {
      question: question.question,
      answer: answer.answer,
    };
  };

  useEffect(() => {
    console.log("vào");
    const records: HealthRecord[] = [];
    for (const idQuestion in answers.record) {
      const idAnswer = answers.record[idQuestion][0]; // Giả sử chỉ có một câu trả lời
      const result: any = getQuestionAndAnswer(parseInt(idQuestion), idAnswer);
      records.push(result);
    }
    setHealthRecords(records);
  }, []);
  useEffect(() => {
    // Kiểm tra nếu không có bản ghi nào được trả về từ useAppSelector
    if (
      Object.keys(answers.record).length === 0 &&
      answers.record.constructor === Object
    ) {
      setSurveyCompleted(false);
    } else {
      setSurveyCompleted(true);
    }
  }, [answers]);

  const onPressChecking = () => {
    navigation.navigate(STACK_NAVIGATOR_SCREENS?.QUESTIONNAIRESCREEN);
  }

  return (
    <>
      <Header headerTitle="Khảo sát sức khoẻ" />
      <View style={styles.container}>
        {surveyCompleted ? (
          // Nếu có bản ghi, hiển thị danh sách
          healthRecords.map((record, index) => (
            <View key={index} style={styles.recordContainer}>
              <Text style={styles.question}>Câu hỏi: {record.question}</Text>
              <Text style={styles.answer}>Câu trả lời: {record.answer}</Text>
            </View>
          ))
        ) : (
          // Nếu không có bản ghi, hiển thị thông báo
          <>
            <Text style={styles.noSurveyText}>
              Bạn chưa thực hiện khảo sát.
            </Text>
            <TouchableOpacity onPress={onPressChecking}>
              <Text style={[styles.noSurveyText, { color: "blue" }]}>
                Thực hiện ngay
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",

    flexDirection: "column",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  recordContainer: {
    marginVertical: 12,
  },
  question: {
    fontSize: globalFontSize.lableFont,
    // fontWeight: "bold",
    color: globalColor.grey,
    marginBottom: 12,
  },
  answer: {
    fontSize: globalFontSize.name,
    fontWeight: "bold",
    color: "black",
  },
  noSurveyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: 'red'
  },
});

export default MyHealthScreen;
