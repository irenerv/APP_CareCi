import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import Toast from "react-native-easy-toast";
import * as firebase from "firebase";
import InfoUser from "../../Components/Settings/InfoUser";
import Loading from "../../Components/Loading";
import AccountOptions from "../../Components/Settings/SettingsOptions";
import Title from "../../Components/Title";
import { StatusBar } from "expo-status-bar";


export default function Settings(props) {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const [reloadUserInfo, setReloadUserInfo] = useState(false);
    const toastRef = useRef();

    //Autoexecute function for reloading user information 
    useEffect(() => {
        (async () => {
            const user = await firebase.auth().currentUser;
            setUserInfo(user);
        })();
        setReloadUserInfo(false);
    }, [reloadUserInfo]); //Indicating actualization of user information

    return (
        <View style={styles.containerStyle}>
            <StatusBar
                animated={true}
                backgroundColor="#fff"
                style={"auto"}
                hidden={false} />
            <Title text="Configuración" />
            {userInfo && (
                <InfoUser
                    userInfo={userInfo}
                    toastRef={toastRef}
                    setLoading={setLoading}
                    setLoadingText={setLoadingText}
                />
            )}

            <AccountOptions
                userInfo={userInfo}
                toastRef={toastRef}
                setReloadUserInfo={setReloadUserInfo}
            />

            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading isVisible={loading} text={loadingText} />
        </View>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: "#fff",
        marginTop: 40,
    },
    header: {},
    settings: {},
    btnContainer: {
        width: "50%",
    },
    btn: {
        height: 70,
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    btnTitleStyle: {
        color: "black",
        fontSize: 22,
    },
    infoText: {
        color: "#fff",
        fontSize: 20,
    },
});
