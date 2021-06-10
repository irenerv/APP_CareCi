//Importaciones
import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";

//Componente Loading, permite al usuario visualizar un indicador de actividad cuando algo está cargando
export default function Loading(props) {
    const { isVisible, text } = props;
    return (
        <Overlay
            isVisible={isVisible}
            windowBackgroundColor="rgba(0, 0, 0, 0.5)"
            overlayBackgroundColor="transparent"
            overlayStyle={styles.overlay}
        ><View style={styles.view}>
                <ActivityIndicator size="large" color="#F7B948" />
                <Text style={styles.text}> {text ? text : "Cargando"} </Text>
            </View>
        </Overlay>
    );
}

//Hoja de estilos
const styles = StyleSheet.create({
    overlay: {
        height: 150,
        width: "60%",
        backgroundColor: "#EBE5E2",
        borderRadius: 10,
    },
    view: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#F7B948",
        textTransform: "uppercase",
        marginTop: 10,
        paddingHorizontal: 5,
        textAlign: "center"
    },
});
