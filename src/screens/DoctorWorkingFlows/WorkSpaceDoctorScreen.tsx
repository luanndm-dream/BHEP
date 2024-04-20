import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Header, WorkspaceDoctorItemCard } from '@/components'
import { WorkSpaceDoctorData } from 'src/data/workspaceDoctorData'


const WorkSpaceDoctorScreen = () => {
  return (
    <>
    <Header headerTitle='Làm việc'/>
    <View>
        <FlatList data={WorkSpaceDoctorData} renderItem={({item}) =>{
            return (
                <WorkspaceDoctorItemCard imgUrl={item.imgIcon} label={item.name} iconLastName={item.iconLastName}/>
            )
        }}/>
    </View>
    </>
  )
}

export default WorkSpaceDoctorScreen

const styles = StyleSheet.create({})