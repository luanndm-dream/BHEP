import { View,Modal as RNModal, Text, StyleSheet, TouchableWithoutFeedback, ModalProps, Platform, StatusBar } from 'react-native'
import React from 'react'
interface CustoModalProps extends ModalProps {
  onBackDropPress ?: () => void,
  children?: any,
}

const CustomModal : React.FC<CustoModalProps>= ({onBackDropPress, children,...modalOtherProps}) => {

    
  return (
    <RNModal statusBarTranslucent transparent animationType="fade" {...modalOtherProps} style={{margin: 0}} >
      {Platform.OS === 'android' ?
         <StatusBar hidden={true}/>
         : null
    }
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onBackDropPress}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>
      {children}
    </View>
  </RNModal>
  )
}

export default CustomModal

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.2)',
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
    },
  });