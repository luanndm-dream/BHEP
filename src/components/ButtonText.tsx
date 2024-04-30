import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
interface ButtonTextProps {
    text?: string,
    onPress: () => void,
    styleContainer?: any,
    styleText?: any,
    disabled?: any
}
const ButtonText: React.FC<ButtonTextProps> = ({text, onPress,styleContainer,styleText,disabled}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, styleContainer]} disabled={disabled}>
        <Text style={[styles.text, styleText]}>{text}</Text>
    </TouchableOpacity>
  )
}

export default ButtonText

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
    },
    text:{
        fontSize: 20,
        color: 'white'
    }
})