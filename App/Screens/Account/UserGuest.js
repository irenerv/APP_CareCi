import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function UserGuest() {
    const navigation = useNavigation();
    return (
        <ScrollView centerContent={true} style={styles.viewContainer}>
            <View style={styles.viewHeader}>
                <Image
                    source={require("../../../assets/img/careci_logo.png")}
                    resizeMode="contain"
                    style={styles.logo}
                />
            </View>
            <View style={styles.viewWelcoming}>
                <Text style={styles.description}>
                    Descubre la experiencia petLand y únete!
        </Text>
                <Button
                    title="Comenzar"
                    buttonStyle={styles.btnStyle}
                    containerStyle={styles.btnContainer}
                    titleStyle={styles.btnTitleStyle}
                    onPress={() => navigation.navigate("login")}
                />
            </View>
        </ScrollView>
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
        paddingVertical: 120,
    },
    viewWelcoming: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 55,
        paddingVertical: 75,
    },
    logo: {
        height: 200,
        marginTop: 20,
        alignSelf: "center",
    },
    description: {
        textAlign: "left",
        fontSize: 30,
        fontWeight: "bold",
        color: "#192637",
        marginBottom: 40,
    },
    btnStyle: {
        backgroundColor: "#F7B948",
        width: "60%",
        height: 80,
        borderRadius: 20,
    },
    btnContainer: {
        width: "80%",
        alignItems: "flex-start",
    },
    btnTitleStyle: {
        color: "#fff",
        fontSize: 22,
    },
});

