import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  LayoutChangeEvent,
} from "react-native";
import React, { useEffect, useState } from "react";
import ItemAnswer from "./ItemAnswer";
import { globalColor } from "src/constants/color";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface AnswerList {
  idQuestion: number;
  answer: any;
}

interface ListItemQuestionProps {
  idQuestion: number;
  title: string;
  question: string;
  questionList?: any
  onPressAnswer?:any;
}
const ListItemQuestion: React.FC<ListItemQuestionProps> = ({
    questionList,
  idQuestion,
  question,
  title,

  onPressAnswer
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);

  const onPressItem = () => {
    setExpanded(!expanded);
  };

  //   const answerResponse: AnswerList[] = [];

  //   const onPressAnswer = (idQuestion: number, idAnswer: number, answer: string) => {
  //     const index = answerResponse.findIndex(element => element.idQuestion === idQuestion);

  //     if (index !== -1) {
  //       // Nếu idQuestion đã tồn tại trong mảng answerResponse
  //       const existingAnswers = answerResponse[index].answer;
  //       const existingAnswerIndex = existingAnswers.findIndex((item: any) => item.idAnswer === idAnswer);

  //       if (existingAnswerIndex !== -1) {
  //         console.log('xoá câu trl');
  //         // Nếu idAnswer đã tồn tại, bạn có thể xoá nó
  //         existingAnswers.splice(existingAnswerIndex, 1);
  //       } else {
  //         console.log('thêm list trả lời');
  //         // Nếu idAnswer chưa tồn tại, bạn có thể thêm nó vào mảng answers
  //         existingAnswers.push({ idAnswer, answer });
  //       }
  //     } else {
  //       // Nếu idQuestion chưa tồn tại trong mảng answerResponse
  //       console.log('thêm câu hỏi');
  //       answerResponse.push({
  //         idQuestion: idQuestion,
  //         answer: [{ idAnswer, answer }]
  //       });
  //     }

  //     console.log(answerResponse);
  //   };

  const onLayout = (event: LayoutChangeEvent) => {
    const layoutHeight = event.nativeEvent.layout.height;
    if (layoutHeight > 0 && layoutHeight != height) {
      setHeight(layoutHeight);
    }
  };
  const animatedStyle = useAnimatedStyle(() => {
    const animatedHeight = expanded ? withTiming(height) : withTiming(0);
    return {
      height: animatedHeight,
    };
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressItem}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>{title}</Text>
          <MaterialCommunityIcons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={30}
            color="#747474"
          />
        </View>
      </TouchableOpacity>
      <Animated.View style={[animatedStyle, { overflow: "hidden" }]}>
        <View onLayout={onLayout} style={{ position: "absolute" }}>
          <Text style={styles.question}>{question}</Text>
          <FlatList
            horizontal
            data={questionList}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }: any) => (
              <ItemAnswer
                id={item.id}
                answer={item.answer}
                onPress={() => onPressAnswer && onPressAnswer(idQuestion, item.id)}
              />
            )}
            keyExtractor={(item: any) => item.id.toString()}
          />
        </View>
      </Animated.View>
    </View>
  );
};

export default ListItemQuestion;

const styles = StyleSheet.create({
  container: {
    margin: 12,
    padding: 8,
    backgroundColor: "#e1e1e1",
    borderRadius: 12,
  },
  topContainer: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: "#747474",
    fontSize: 22,
    fontWeight: "bold",
  },
  question: {
    color: globalColor.grey,
    marginVertical: 12,
    marginTop: -5,
    marginBottom: 25,
  },
});
