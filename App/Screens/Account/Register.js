import React, { useRef } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-easy-toast";
import RegisterForm from "../../Components/Account/RegisterForm";

export default function Register() {
    const toastRef = useRef();
    return (
        <KeyboardAwareScrollView style={styles.viewContainer}>
            <View style={styles.viewHeader}>
                <Image
                    source={require("../../../assets/img/careci_logo.png")}
                    resizeMode="contain"
                    style={styles.logo}
                />
            </View>
            <View style={styles.viewRegister}>
                <Text style={styles.textHeader}>¡Únete ahora!</Text>
                <RegisterForm toastRef={toastRef} />
            </View>
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        backgroundColor: "#F7B948",
    },
    viewHeader: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        paddingVertical: 100,
    },
    textHeader: {
        fontWeight: "bold",
        fontSize: 40,
        color: "#fff",
        paddingLeft: 10,
        paddingTop: 20,
        paddingBottom: 10,
    },
    viewRegister: {
        flex: 3,
        backgroundColor: "#202020",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 100,
    },
    logo: {
        width: "50%",
        height: 150,
        marginTop: 20,
        alignSelf: "center",
    },
});
