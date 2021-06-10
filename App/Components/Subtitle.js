//Impoetaciones
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

//Componente subtitle de texto personalizado
export default function SubTitle(props) {
    const { text } = props;
    return (
        <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{text}</Text>
        </View>
    )
}

//Hoja de estilos
const styles = StyleSheet.create({
    viewStyle: {
        marginTop: 24,
        alignSelf: "center",
    },
    textStyle: {
        fontFamily: "JosefinSans-SemiBold",
        fontSize: 22,
        color: "#3b3835",
    }
})



