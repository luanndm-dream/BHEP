import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { globalColor } from 'src/constants/color'
import { globalStyle } from 'src/constants'
import { globalFontSize } from 'src/constants/fontSize'

interface DateSliderProps {
    date: number,
    thu: string,
    id?: any,
    backgroundColor?: any,
    onPress: ()=>any
}
const DateSlider:React.FC<DateSliderProps> = ({date,thu,id,backgroundColor, onPress}) => {

  return (
    <TouchableOpacity style={[styles.container,backgroundColor]} onPress={onPress}>
        <Text style={styles.label}>{thu}</Text>
        <Text style={styles.value}>{date}</Text>
    </TouchableOpacity>
  )
}

export default DateSlider

const styles = StyleSheet.create({
    container: {
        height: 60,
        width: 45,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    label:{
        fontSize: 16,
        color: 'black',
        marginBottom: 8
    },
    value:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    }
})