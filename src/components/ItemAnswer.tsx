import { StyleSheet, Text, View, TouchableOpacity, GestureResponderEvent } from "react-native";
import React, { useState } from "react";
import { globalColor } from "src/constants/color";

interface ItemAnswerProps {
  id: number;
  answer: string
  onPress: any
}
const ItemAnswer: React.FC<ItemAnswerProps> = ({ answer, id, onPress }) => {
  const [isSelectedItem, setIsSelectedItem] = useState(false);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: isSelectedItem
            ? globalColor.primaryColor
            : "white",
        },
      ]}
      onPress={() => {
        setIsSelectedItem(!isSelectedItem);
        onPress?.()
      }}
    >
      <View style={styles.number}>
        <Text style={[styles.id, { color: isSelectedItem ? "black" : "white" }]}>{id}</Text>
      </View>
      <Text style={{ color: isSelectedItem ? "white" : "black" }}>{answer}</Text>
    </TouchableOpacity>
  );
};

export default ItemAnswer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 45,
    backgroundColor: "white",
    marginRight: 12,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  number: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: globalColor.secondaryColor,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  id: {
    fontWeight: "bold",
  },
});
