import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { globalStyle } from 'src/constants'

interface TimeBoxProps {
    text?: string,
    onPress?: () => void
   
}
const TimeBox : React.FC<TimeBoxProps>= ({text,onPress}) => {
  return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={globalStyle.titleText}>{text}</Text>
        </TouchableOpacity>
  )
}

export default TimeBox

const styles = StyleSheet.create({
    container: {
        height: 60,
        borderRadius: 8,
        backgroundColor: 'white', 
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 6
    }
})