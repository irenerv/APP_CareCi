//Importaciones
import React, { useState, useEffect, useRef, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Icon } from "react-native-elements";
import Toast from "react-native-easy-toast";
import * as firebase from "firebase";
import InfoUser from "../../Components/Settings/InfoUser";
import Loading from "../../Components/Loading";
import AccountOptions from "../../Components/Settings/SettingsOptions";
import Title from "../../Components/Title";
import { AuthContext } from "../../Context/AuthProvider";
import { StatusBar } from "expo-status-bar";

//Componente conformado por los formularios de actualización de datos
export default function Settings(props) {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const { logout } = useContext(AuthContext);
    const [loadingText, setLoadingText] = useState("");
    const [reloadUserInfo, setReloadUserInfo] = useState(false);
    const toastRef = useRef();

    //Función autoejecutable para recargar la información
    useEffect(() => {
        (async () => {
            const user = await firebase.auth().currentUser;
            setUserInfo(user);
        })();
        setReloadUserInfo(false);
    }, [reloadUserInfo]);

    return (
        //Visualización de datos
        <View style={styles.containerStyle}>
            <StatusBar
                animated={true}
                backgroundColor="#000"
                style={"light"}
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

            <Button
                icon={
                    <Icon
                        type="material-community"
                        name="logout-variant"
                        size={20}
                        color="#fff"
                        containerStyle={styles.iconStyle}
                    />
                }
                title="Cerrar sesión"
                containerStyle={styles.btnContainerStyle}
                buttonStyle={styles.btnStyle}
                onPress={() => logout()}
            />

            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading isVisible={loading} text={loadingText} />
        </View>
    );
}

//Hoja de estilos
const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: "#202020",
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
        color: "#fff",
        fontSize: 22,
    },
    infoText: {
        color: "#fff",
        fontSize: 20,
    },
    btnStyle: {
        backgroundColor: "#202020"
    },
    btnContainerStyle: {
        position: "absolute",
        bottom: 20,
        alignSelf: "center"
    },
    iconStyle: {
        marginRight: 5
    }

});
