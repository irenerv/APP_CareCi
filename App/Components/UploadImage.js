//Importaciones
import React from "react";
import { StyleSheet, View, Alert, } from "react-native";
import { Icon, Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { Camera } from 'expo-camera';
import { map, size, filter } from "lodash";

//Componente para cargar imágenes
export default function UploadImage(props) {
    const { toastRef, setImageSelected, imageSelected } = props;

    const imageSelect = async () => {
        //Petición de permisos al usuario
        const resultPermissions = await Camera.requestPermissionsAsync();

        //Status de permiso
        if (resultPermissions.status === "denied") {
            toastRef.current.show(
                "Es necesario aceptar los permisos de la galeria. Puedes acceder a ajustes y activarlos manualmente.", 3000
            )
        } else {
            //Formato de imagen
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            if (result.cancelled) {
                toastRef.current.show("Has cerrado la galeria sin seleccionar ninguna imagen", 2000);
            } else {
                setImageSelected([...imageSelected, result.uri]);
            }
        }

    };

    //Remover una imagen de la lista de imágenes cargadas
    const removeImage = (image) => {

        Alert.alert(
            "Eliminar imagen",
            "¿Estás seguro de querer eliminar la imagen?",
            [{
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Eliminar",
                onPress: () => {
                    setImageSelected(
                        filter(imageSelected, (imageUrl) => imageUrl !== image)
                    )
                },
            }],
            { cancelable: false }
        )
    }

    return (
        //Visualización de icono de carga de impagenes 
        <View style={styles.viewImages}>
            {size(imageSelected) < 4 && (
                <Icon
                    type="material-community"
                    name="camera"
                    color="#fff"
                    containerStyle={styles.containerIcon}
                    onPress={imageSelect}
                    iconStyle={{ color: "#fff" }}
                />)}
            {map(imageSelected, (imagePet, index) => (
                <Avatar
                    key={index}
                    style={styles.imagesPet}
                    source={{ uri: imagePet }}
                    onPress={() => removeImage(imagePet)}
                />
            ))}
        </View>
    )
}

//Hoja de estilos
const styles = StyleSheet.create({
    viewImages: {
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 30,
        marginTop: 5,
        height: 70,
        width: 70,
        backgroundColor: "#F7B948",
        borderRadius: 30,
    },
    imagesPet: {
        width: 70,
        height: 70,
        marginLeft: 16,
        marginTop: 10,
        overflow: "hidden",
        borderRadius: 30,
    },

});