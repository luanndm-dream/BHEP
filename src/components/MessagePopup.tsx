import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomModal from "./CustomModal";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { globalFontSize } from "src/constants/fontSize";
import { globalStyle } from "src/constants";
import ButtonText from "./ButtonText";
import { globalColor } from "src/constants/color";

interface MessagePopupProps {
  isVisible: boolean;
  onCancel?: any;
  style?: any;
  iconName?: any;
  title?: string;
  content?: string;
  iconColor?: any;
  onDelete?: any;
  onEdit?: any;
  backgroundColorButton? : any,
  confirmText?: string;
  onPressCancel: () => void;
  onPressConfirm: () => void;
  
}

const MessagePopup: React.FC<MessagePopupProps> = ({
  isVisible,
  onCancel,
  style,
  iconName,
  title,
  content,
  iconColor,
  onDelete,
  onEdit,
  confirmText,
  onPressCancel,
  onPressConfirm,
  backgroundColorButton
}) => {
  return (
    <View>
      <CustomModal visible={isVisible} onBackDropPress={onCancel?.()}>
        <View style={styles.container}>
          <MaterialCommunityIcons name={iconName} size={60} color={iconColor} />
          <Text style={globalStyle.titleText}>{title}</Text>
          <Text style={{color: 'black', textAlign: 'center', paddingHorizontal: 8}}>{content}</Text>
          <View style={styles.buttonContainer}>
            <ButtonText
              text="Huỷ"
              onPress={onPressCancel}
              styleContainer={styles.cancelButtonContainer}
              styleText={styles.cancelText}
            />
            <ButtonText
              text={confirmText}
              onPress={onPressConfirm}
              styleContainer={[styles.confirmButtonContainer,{backgroundColor: backgroundColorButton? backgroundColorButton:globalColor.primaryColor }]}
              styleText={styles.confirmText}
            />
          </View>
        </View>
      </CustomModal>
    </View>
  );
};

export default MessagePopup;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "white",
    alignSelf: "center",
    width: "80%",
    height: 220,
    top: "40%",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonContainer: {
    width: 80
  },
  confirmButtonContainer: {
    backgroundColor: globalColor.primaryColor,
    padding: 10,
    borderRadius: 8
  },
  cancelText: {
    color: globalColor.primaryColor,
    fontWeight: 'bold'
  },
  confirmText:{
    color: 'white',
    fontWeight: 'bold'
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
});
