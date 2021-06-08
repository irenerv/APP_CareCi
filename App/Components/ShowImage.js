import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { Image } from "react-native-elements";

const widthScreen = Dimensions.get("window").width;

export default function ShowImage(props) {
    const { mainImage } = props;

    return (
        <View style={styles.viewPhoto}>
            <Image
                source={mainImage
                    ? { uri: mainImage }
                    : require("../../assets/noImg/noImages.png")}
                style={{ width: widthScreen, height: 275, }}
                containerStyle={{ overflow: "hidden", borderBottomRightRadius: 50, borderBottomLeftRadius: 50, }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    viewPhoto: {
        alignItems: "center",
        height: 200,
        marginBottom: 20,
    }
});