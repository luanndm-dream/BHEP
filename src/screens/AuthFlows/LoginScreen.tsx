import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { globalColor } from 'src/constants/color'
import { TextInputNoIcon } from '@/components'

const LoginScreen = () => {
  return (
   <>

    <Image source={require('../../assets/image/spidium.png')} style={styles.spidium}/>
   <View style={styles.logoContainer}>
    
    <Image source={require('../../assets/image/logo.png')} style={styles.logoImage}/>
    <View>
    <Text style={styles.logoName}>BHEP</Text>
    <Text style={styles.slogant}>Your health in your hand</Text>
    </View>
    
   </View>
   <View style={styles.contentContainer}> 
    <Text>XIN CHÀO</Text>
    <TextInputNoIcon placeholderText='Tài khoản' onChangeText={()=>{}}/>
   </View>
   </>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  logoContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  contentContainer: {
    flex: 2,
    backgroundColor: globalColor.secondaryColor,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  logoImage: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
  spidium:{
    width: 220,
    height:180,
    flex: 1,
    position: 'absolute',
    right: 20
  },
  logoName: {
    fontSize: 64,
    fontWeight: 'bold',
    color: globalColor.nameLogoColor
  },
  slogant:{
    color: '#4871F2',
    fontSize: 13
  },
   
})