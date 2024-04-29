import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Header, ListItemQuestion } from "@/components";
import { FlatList } from "react-native-gesture-handler";
import { ListQuestion } from "src/data/listQuestion";

const QuestionnaireScreen = () => {
  const data = ListQuestion;

  return (
    <>
      <Header headerTitle="Khảo sát" />
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <ListItemQuestion
              title={item.title}
              answer={item.answerList}
              question={item.question}
            />
          );
        }}
      />
    </>
  );
};

export default QuestionnaireScreen;

const styles = StyleSheet.create({});
