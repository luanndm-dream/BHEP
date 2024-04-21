import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { globalColor } from 'src/constants/color'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface DropDownLabelProps {
    label?: string,
    value?: any,
    onPress?: ()=>void,
    onChangeValue?: ()=>void
}
const DropDownLabel:React.FC<DropDownLabelProps> = ({label,value, onPress,onChangeValue}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
    <View style={styles.labelContainer}>
      <Text style={{color: 'black'}}>{label}</Text>
    </View>
    <View style={styles.valueContainer}>
      <Text>{value}</Text>
      <MaterialCommunityIcons name="chevron-down" color={globalColor.grey} size={26} />
    </View>
  </TouchableOpacity>
  )
}

export default DropDownLabel

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
        flex: 1
       },
       labelContainer: {
         backgroundColor: globalColor.backgroundColor, // Same color as background
         alignSelf: "flex-start", // Have View be same width as Text inside
         paddingHorizontal: 3, // Amount of spacing between border and first/last letter
         marginStart: 10, // How far right do you want the label to start
         zIndex: 1, // Label must overlap border
         elevation: 0.5, // Needed for android
         shadowColor: "white", // Same as background color because elevation: 1 creates a shadow that we don't want
         position: "absolute", // Needed to be able to precisely overlap label with border
         top: -12, // Vertical
       },
       valueContainer: {
        flexDirection: 'row',
         borderWidth: 1, // Create border
         borderRadius: 8, // Not needed. Just make it look nicer.
         padding: 8, // Also used to make it look nicer
         zIndex: 0,
         height: 55,
         justifyContent: "space-between",
         alignItems: 'center'
         // Ensure border has z-index of 0
     },
})