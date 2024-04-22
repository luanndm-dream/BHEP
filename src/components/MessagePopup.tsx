import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomModal from "./CustomModal";

interface MessagePopupProps {
  isVisible: boolean;
  onCancel?: any;
  style?: any;
  iconName?: string;
  title?: string;
  content?: string;
  color?: any;
  onDelete?: any;
  onEdit?: any;
}

const MessagePopup: React.FC<MessagePopupProps> = ({
  isVisible,
  onCancel,
  style,
  iconName,
  title,
  content,
  color,
  onDelete,
  onEdit,
}) => {
  return (
    <View >
      <CustomModal visible={isVisible} onBackDropPress={onCancel?.()} >
            <View style={styles.container}>

            </View>
      </CustomModal>
    </View>
  );
};

export default MessagePopup;

const styles = StyleSheet.create({
    container:{
    position: 'absolute',
    backgroundColor: "white",
    alignSelf: 'center',
    width: '80%',
    height: 200,
    top: '40%',
    borderRadius: 16
    }
});
