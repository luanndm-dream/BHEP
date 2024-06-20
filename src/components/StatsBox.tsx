import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { globalColor } from 'src/constants/color'
interface StatsBoxProps {
    valueOfPosts: number
    valueOfRank: number,
    valueOfOrders: number
}
const StatsBox: React.FC<StatsBoxProps> = ({valueOfOrders, valueOfPosts, valueOfRank}) => {
    return (
        <View style={styles.container}>
        <View style={styles.statContainer}>
          <Text style={styles.statsNumber}>{valueOfPosts}</Text>
          <Text style={styles.statLabel}>BÀI VIẾT</Text>
        </View>
        <View style={[styles.statContainer, styles.divider]}>
          <Text style={[styles.statsNumber, {fontSize: 35}]}>{valueOfRank}</Text>
          <Text style={[styles.statLabel, {fontSize: 15, color: 'black'}]}>XẾP HẠNG</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statsNumber}>{valueOfOrders}</Text>
          <Text style={styles.statLabel}>TƯ VẤN</Text>
        </View>
        </View>
    )
  }
export default StatsBox

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        borderRadius: 16,
        backgroundColor: 'white',
        marginTop: -50
    },
    statContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        
    },
    statsNumber:{
        fontSize: 25,
        fontWeight: '600',
        color: 'black',
        
    },
    statLabel:{
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 1,
        color: globalColor.grey,
        marginTop: 10,
    },
    divider: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: globalColor.grey
    }
})