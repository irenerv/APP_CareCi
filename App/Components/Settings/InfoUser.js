import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import { Camera } from 'expo-camera';
import GeneralText from "../GeneralText";

export default function InfoUser(props) {
    const { userInfo: { uid, photoURL, displayName, email },
        toastRef,
        setLoading,
        setLoadingText,
    } = props;



    const changeAvatar = async () => {
        const resultPermissions = await Camera.requestPermissionsAsync();

        if (resultPermissions.status === "denied") {
            toastRef.currrent.show("Es necesario aceptar los permisos de la galeria");
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });

            if (result.cancelled) {
                toastRef.current.show("Has cerrado la selección de imagenes");
            } else {
                uploadImage(result.uri).then(() => {
                    updatePhotoUrl();
                }).catch(() => {
                    toastRef.current.show("Error al actualizar el avatar.")
                })
            }
        }
    };

    const uploadImage = async (uri) => {
        setLoadingText("Actualizando avatar");
        setLoading(true);

        const response = await fetch(uri);
        const blob = await response.blob();

        const ref = firebase.storage().ref().child(`avatar/${uid}`);
        return ref.put(blob);
    };

    const updatePhotoUrl = () => {
        firebase.storage()
            .ref(`avatar/${uid}`)
            .getDownloadURL()
            .then(async (response) => {
                const update = {
                    photoURL: response,
                };
                await firebase.auth().currentUser.updateProfile(update);
                setLoading(false);

            }).catch(() => {
                toastRef.current.show("Error al actualizar el avatar");
            });
    }


    return (
        <View style={styles.viewUserInfo}>
            <Avatar
                rounded
                size="large"
                showEditButton
                onEditPress={changeAvatar}
                containerStyle={styles.userInfoAvatar}
                source={
                    photoURL ? { uri: photoURL } : require("../../../assets/img/default_avatar.jpg")}
            />
            <View>
                <GeneralText text={displayName ? displayName : "anónimo"} color="#3b3835" size={14} />
                <GeneralText text={email ? email : "Social Login"} color="#3b3835" size={14} />

            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#fff",
        paddingTop: 30,
        paddingBottom: 30,
    },
    userInfoAvatar: {
        marginRight: 20,
        width: 150,
        height: 150,
    }
});