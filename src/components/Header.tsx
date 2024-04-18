import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { globalColor } from 'src/constants/color';


interface HeaderProps {
    headerTitle: String,
    otherProp?: any
    iconName?: any
    onPressIcon?: () => void
}
const Header:React.FC<HeaderProps> = ({headerTitle,iconName,onPressIcon,otherProp}) => {
  return (
    <>
    <SafeAreaView style={{flex: 0, backgroundColor: globalColor.primaryColor }}/>
    <View style={[styles.container]}>
        <StatusBar backgroundColor={globalColor.primaryColor} barStyle={'light-content'}/>
        <TouchableOpacity onPress={onPressIcon} style={styles.icon} >
            <MaterialCommunityIcons name={iconName} size={40} color='white' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{headerTitle}</Text>
    </View>
    </>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        height: 60,
        flex: 0,
        backgroundColor: globalColor.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        
    },
    icon: {
       position: 'absolute',
       left: 15
    //    alignSelf: 'center'
    },
    headerTitle : {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    }
})