//Importaciones
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";

//Componente para realizar cambios de nombre del usuario
export default function ChangeDisplayNameForm(props) {
    const { displayName, setShowModal, toastRef, setReloadUserInfo } = props;
    const [newDisplayName, setNewDisplayName] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    //Componente de validación de información y petición de acutalización de información
    const onSubmit = () => {
        setError(null);
        if (!newDisplayName) {
            setError("El nombre no puede estar vacío");
        } else if (displayName === newDisplayName) {
            setError("El nombre no puede ser igual al actual.");
        } else {
            setIsLoading(true);
            const update = {
                displayName: newDisplayName
            }
            firebase
                .auth()
                .currentUser.updateProfile(update)
                .then(() => {
                    setIsLoading(false);
                    setReloadUserInfo(true);
                    setShowModal(false);
                }).catch(() => {
                    setError("Error al actualizar el nombre");
                    setIsLoading(false);
                })
        }
    };

    return (
        //Visualización de Formulario
        <View style={styles.view}>
            <Input
                placeholder="Nombre y apellidos"
                containerStyle={styles.input}
                rightIcon={{
                    type: "material-community",
                    name: "account-circle-outline",
                    color: "#c2c2c2",
                }}
                defaultValue={displayName || ""}
                onChange={e => setNewDisplayName(e.nativeEvent.text)}
                errorMessage={error}
            />
            <Button
                title="Cambiar nombre"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>
    );
}

//Hoja de estilos
const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
    },
    input: {
        marginBottom: 10
    },
    btnContainer: {
        marginTop: 20,
        width: "75%",
    },
    btn: {
        backgroundColor: "#F7B948",
    },
});