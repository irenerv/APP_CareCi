import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function GeneralText(props) {
    const { text, color, size } = props;
    return (
        <View style={styles.viewStyle}>
            <Text style={{
                fontFamily: "Quicksand-Medium",
                color: color ? color : "#fff",
                fontSize: size ? size : 20,
                paddingVertical: 6,
            }}>
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



