import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Header } from '@/components'
import { SafeAreaView } from 'react-native'

const PolicyScreen = () => {
  return (
    <>
    <Header headerTitle='Chính sách và bảo mật'/>
    <SafeAreaView style={styles.container}>

    </SafeAreaView>
    </>
  )
}

export default PolicyScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8
  }
})