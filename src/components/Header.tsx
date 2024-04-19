import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Platform } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { globalColor } from 'src/constants/color';
import { useNavigation } from '@react-navigation/native';


interface HeaderProps {
    headerTitle: String,
    otherProp?: any
    iconName?: any
 
}
const Header:React.FC<HeaderProps> = ({headerTitle,iconName,otherProp}) => {
    const navigation = useNavigation<any>()
  return (
    <>
    <SafeAreaView style={{flex: 0, backgroundColor: globalColor.primaryColor }}/>
    <View style={[styles.container, {height: Platform.OS === 'ios' ? 60 : 80}]}>
        <StatusBar backgroundColor={globalColor.primaryColor} barStyle={'light-content'}/>
        <TouchableOpacity onPress={ () => navigation.goBack()} style={styles.icon} >
            <MaterialCommunityIcons name='chevron-left' size={40} color='white' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{headerTitle}</Text>
    </View>
    </>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
       
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