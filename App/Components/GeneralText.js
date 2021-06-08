import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function GeneralText(props) {
    const { text, color, size, style, viewStyle } = props;
    return (
        <View style={!viewStyle ? styles.viewStyle : viewStyle}>
            <Text style={!style ? {
                fontFamily: "Quicksand-Medium",
                color: color ? color : "#fff",
                fontSize: size ? size : 20,
                paddingVertical: 6,
            } : style}>
                {text}
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    viewStyle: {
        marginHorizontal: 8,
    },
})



