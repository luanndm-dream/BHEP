import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const OnPendingScreen = () => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <Image source={require('../assets/image/pending.png')} style={{width: 100, height: 100}}/>
        <Text style={{color: 'black'}}>Tính năng đang được phát triển!</Text>
      </View>
    </View>
  )
}

export default OnPendingScreen

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    alignItems:'center',    
    justifyContent: 'center'
  }
})
