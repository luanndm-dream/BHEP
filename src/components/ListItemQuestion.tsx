import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import ItemAnswer from "./ItemAnswer";
import { globalColor } from "src/constants/color";

interface AnswerList {
  id: number;
  answer: string;
}

interface ListItemQuestionProps {
  title: string;
  question: string;
  answer?: AnswerList[];
  onPress?: () => void;
}
const ListItemQuestion: React.FC<ListItemQuestionProps> = ({
  answer,
  question,
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.question}>{question}</Text>
      </View>
      <View>
        <FlatList
          horizontal
          data={answer}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }: any) => (
            <ItemAnswer
              id={item.id}
              answer={item.answer}
              onPress={() => console.log(item.answer)}
            />
          )}
          keyExtractor={(item: any) => item.id.toString()}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ListItemQuestion;

const styles = StyleSheet.create({
    container: {
        padding: 12
    },
    topContainer: {
        
    },
    
    title: {
        color: 'black',
        fontSize: 22,
        fontWeight: 'bold'
    },
    question: {
        color: globalColor.grey,
        marginVertical: 12
    }
});
