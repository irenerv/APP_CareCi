//Importaciones
import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { Image } from "react-native-elements";

//Obtención del ancho de la pantalla del dispositivo
const widthScreen = Dimensions.get("window").width;

//Componente que muestra las imágenes cargadas
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
//Hoja de estilos
const styles = StyleSheet.create({
    viewPhoto: {
        alignItems: "center",
        height: 200,
        marginBottom: 20,
    }
});