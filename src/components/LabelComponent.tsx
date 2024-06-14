import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface LabelComponentProps {
    label: string,
    value?: string
}

const LabelComponent: React.FC<LabelComponentProps> = ({label, value}) => {
  return (
    <View style={styles.labelContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, label === "Ghi chú" && styles.specialLabel]}>{value}</Text>
    </View>
  )
}

export default LabelComponent

const styles = StyleSheet.create({
    labelContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
        marginVertical: 8
    },
    label: {
        fontSize: 20,
        color: 'grey',
        fontWeight: 'bold'
    },
    specialLabel: {
        width: 200,
        // backgroundColor: 'green'
    },
    value: {
        fontSize: 18,
        color: 'black',
        fontWeight: '600',
        textAlign: 'right'
    }
})
