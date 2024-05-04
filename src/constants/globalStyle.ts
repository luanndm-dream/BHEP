import { StyleSheet, Platform } from 'react-native';
export default StyleSheet.create({
    
    droidSafeArea: {
        flex: 1,
        backgroundColor: '#F4F4F2',
        paddingTop: Platform.OS === 'android' ? 0 : 0
    },
    titleText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginVertical: 8
    },
    textNormal: {
        fontSize: 18,
        color: 'black'
    },
    contentContainer:{
        margin: 12,
        
    }
});