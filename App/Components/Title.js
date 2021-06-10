//Importaciones
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

//Componente de texto personalizado
export default function Title(props) {
    const { text } = props;
    return (
        <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{text}</Text>
        </View>
    )
}

//Hoja de estilo
const styles = StyleSheet.create({
    viewStyle: {
        marginTop: 64,
        alignSelf: "center",
    },
    textStyle: {
        fontFamily: "JosefinSans-SemiBold",
        fontSize: 38,
        color: "#FFF"
    }

})
