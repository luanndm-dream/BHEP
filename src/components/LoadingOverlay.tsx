import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native'
import React from 'react'
import CustomModal from './CustomModal'
import { globalColor } from 'src/constants/color'


const LoadingOverlay = () => {
  return (
   <CustomModal>
     <View style={styles.container}>
        <View style={styles.content}>
          <Image source={require('../assets/image/logo.png')} style={styles.logo}/>
          <ActivityIndicator color={globalColor.nameLogoColor} size={'large'}/>
          <Text style={styles.title}>{"Vui lòng chờ BHEP"}</Text>
        </View>
      </View>
   </CustomModal>
  )
}

export default LoadingOverlay


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    width: 150,
    height: 150,
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  title: {
    marginTop: 4,
    color: globalColor.primaryColor,
    fontWeight: 'bold'
  },
  logo: {
    width: 60,
    height: 60
  }
});
