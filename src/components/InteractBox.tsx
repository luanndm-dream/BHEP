import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { globalFontSize } from 'src/constants/fontSize';

interface InteractBoxProps {
  iconName: string,
  label: string
}
const InteractBox:React.FC<InteractBoxProps> = ({iconName,label}) => {
 
  return (
   
      <TouchableOpacity style={styles.iteractContainer}>
        <MaterialCommunityIcons name={iconName} size={25} color={'#3058A6'}/>
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
  
  )
}

export default InteractBox

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    padding: 16,
    flexDirection: 'row',
    marginVertical: 30
  },
  iteractContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginHorizontal: 8
  },
  text: {
    fontSize: globalFontSize.lableFont,
    color: '#3058A6',
    fontWeight: 'bold',
    marginLeft: 12
  }
})