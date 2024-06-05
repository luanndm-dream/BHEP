import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
interface ButtonComponentProps {
    onPress?: () => void,
    buttonText?: string,
    colorButton? : string,
    style?: any
}
const ButtonComponent : React.FC<ButtonComponentProps> = ({onPress, buttonText, style, colorButton}) => {
  return (
    <TouchableOpacity style={[styles.container, {backgroundColor: colorButton}, style]} onPress={onPress}>
        <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  )
}

export default ButtonComponent

const styles = StyleSheet.create({
    container:{
      
        height: 45,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText:{
       fontSize: 18,
       fontWeight: 'bold',
       color: 'white'
    }
})