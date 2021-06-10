//Importaciones
import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { Icon, Input, Button } from "react-native-elements";
import { map, size, } from "lodash";
import UploadImage from "../UploadImage";
import ShowImage from "../ShowImage";
import { AuthContext } from "../../Context/AuthProvider";
import moment from 'moment';
import Modal from "../Modal";
import DatePicker from "../DatePicker";
import * as Location from "expo-location";
import MapView from "react-native-maps";

//Formulario de posts
export default function PostForm(props) {
    const { toastRef, setIsLoading, navigation } = props;
    const { user } = useContext(AuthContext); //Status de autenticación
    //UseState de variables del formulario
    const currentDate = moment(new Date()).format('lll');
    const [postHeader, setPostHeader] = useState("");
    const [postDescription, setPostDescription] = useState("");
    const [date, setDate] = useState("");
    const [address, setAddress] = useState("");
    const [localization, setLocalization] = useState(null);
    const [isVisibleMap, setIsVisibleMap] = useState(false);
    const [imageSelected, setImageSelected] = useState([]);

    //Función de validación de datos y petición a la API para almacenamiento de información
    const addPost = () => {

        if (!postHeader || !postDescription || !date || !address) {
            toastRef.current.show("Todos los campos del formulario son obligatorios");
        } else if (size(imageSelected) === 0) {
            toastRef.current.show("Debes subir al menos una foto del hecho");
        } else if (!localization) {
            toastRef.current.show("Tienes que agregar un punto de localización");
        } else {
            setIsLoading(true);
            //Realizado mediante la API
            uploadImageStorage().then((response) => {
                //console.log(response)
                fetch(new Request("http://IP_DISPOSITIVO:3000/api/post", {
                    method: "POST",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        postHeader: postHeader,
                        description: postDescription,
                        images: response,
                        date: date,
                        address: address,
                        location: localization,
                        createAt: currentDate,
                        createBy: user.uid,
                    })
                }))
                    .then((response) => {
                        setIsLoading(false);
                        toastRef.current.show("¡Listo!");
                        navigation.navigate("post");
                    }).catch((err) => {
                        setIsLoading(false);
                        toastRef.current.show("Error al publicar, inténtalo más tarde");
                        console.log(err)
                    })
            });
        }
    };

    //Realizando petición a la API
    const uploadImageStorage = async () => {
        const imageBlob = [];

        await Promise.all(
            map(imageSelected, async (image) => {
                const response = await fetch(image);
                const blob = await response.blob();
                fetch(new Request("http://IP_DISPOSITIVO:3000/api/postImage", {
                    method: "POST",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        blob: blob
                    })
                }))
                    .then(response => {
                        const images = JSON.stringify(response);
                        imageBlob.push(images.blob);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
        );
        return imageBlob;
    };

    return (
        //Elemeentos de página
        <ScrollView style={styles.scrollView}>
            <ShowImage mainImage={imageSelected[0]} />
            <View style={styles.formStyle}>

                {/* Llamada al formulario */}
                <FormAdd
                    setPostHeader={setPostHeader}
                    setPostDescription={setPostDescription}
                    setDate={setDate}
                    setAddress={setAddress}
                    localization={localization}
                    setIsVisibleMap={setIsVisibleMap}
                />
                {/* Carga de imágenes */}
                <UploadImage
                    toastRef={toastRef}
                    imageSelected={imageSelected}
                    setImageSelected={setImageSelected}
                />

                {/* Llamada a la función de validación y almacenamiento */}
                <Button
                    title="Crear post"
                    onPress={addPost}
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btnStyle}
                    titleStyle={styles.btnTitleStyle}
                />

                {/* Map picker */}
                <Map
                    isVisibleMap={isVisibleMap}
                    setIsVisibleMap={setIsVisibleMap}
                    toastRef={toastRef}
                    setLocalization={setLocalization}
                />

            </View>

        </ScrollView>
    );
}

//ofrmulario
function FormAdd(props) {
    const {
        setPostHeader,
        setPostDescription,
        setDate,
        setAddress,
        localization,
        setIsVisibleMap,
    } = props;


    return (
        <View style={styles.viewForm}>

            <Text style={styles.textHeader}>¿Quieres postear algo?</Text>
            <Text style={styles.pickerHeader}>Sube tu post</Text>

            <Input
                placeholder="Encabezado"
                containerStyle={styles.containerInput}
                inputContainerStyle={styles.containerInputStyle}
                inputStyle={styles.inputStyle}
                leftIcon={
                    <Icon
                        type="font-awesome"
                        name="header"
                        iconStyle={styles.iconRight}
                        size={20}
                    />}
                onChange={(e) => setPostHeader(e.nativeEvent.text)}
            />
            <Input
                placeholder="Descripción"
                containerStyle={styles.containerInput}
                inputContainerStyle={styles.containerInputStyle}
                inputStyle={styles.inputStyle}
                multiline={true}
                leftIcon={
                    <Icon
                        type="font-awesome"
                        name="list-alt"
                        iconStyle={styles.iconRight}
                        size={20}
                    />}
                onChange={(e) => setPostDescription(e.nativeEvent.text)}
            />
            <Input
                placeholder="Ubicación"
                containerStyle={styles.containerInput}
                inputContainerStyle={styles.containerInputStyle}
                inputStyle={styles.inputStyle}
                leftIcon={
                    <Icon
                        type="font-awesome"
                        name="map-marker"
                        iconStyle={{ color: localization ? "red" : "#c2c2c2", paddingRight: 16 }}
                        size={22}
                        onPress={() => setIsVisibleMap(true)}
                    />}
                onChange={(e) => setAddress(e.nativeEvent.text)}
            />
            <DatePicker
                title="Fecha"
                setDateTime={setDate}
                mode="date"
            />

        </View >
    );
}

//Función de visualización de mapa con configuración inicial.
function Map(props) {
    const { isVisibleMap, setIsVisibleMap, toastRef, setLocalization } = props;
    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
            //Petición de permisos al usuario
            let { status } = await Location.requestForegroundPermissionsAsync()

            //Status de permiso
            if (status !== 'granted') {
                toastRef.current.show(
                    "Primero debes aceptar los permisos de localización", 3000
                );
            } else {
                const loc = await Location.getCurrentPositionAsync({});
                setLocation({
                    //Ubicación inicial
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                })
            }
        })();
    }, [])

    const confirmLocation = () => {
        setLocalization(location);
        toastRef.current.show("Localización guardada correctamente")
        setIsVisibleMap(false);
    }

    return (
        //Modal de visualización del mapa picker
        <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
            <View>
                {location && (
                    //Mapa
                    <MapView
                        style={styles.mapStyle}
                        initialRegion={location}
                        showsUserLocation={true}
                        onRegionChange={(region) => setLocation(region)}
                    >
                        {/* Marcador de punto de ubicación */}
                        <MapView.Marker
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude
                            }}
                        />
                    </MapView>
                )}
                <View style={styles.viewMapBtn}>
                    <Button
                        title="Guardar Ubicación"
                        containerStyle={styles.viewMapBtnContainerSave}
                        buttonStyle={styles.viewMapSave}
                        onPress={confirmLocation}
                    />
                    <Button
                        title="Cancelar Ubicación"
                        containerStyle={styles.viewMapCancelContainer}
                        buttonStyle={styles.viewMapCancel}
                        onPress={() => { setIsVisibleMap(false) }}
                    />
                </View>
            </View>
        </Modal>
    )

}

//Hoja de estilos
const styles = StyleSheet.create({
    scrollView: {
        height: "100%",
        backgroundColor: "#202020",

    },
    viewForm: {
        marginLeft: 10,
        marginRight: 10,
        alignItems: "center"
    },
    formStyle: {
        marginTop: 80,
    },
    textHeader: {
        fontSize: 15,
        color: "#c1c1c1",
        marginBottom: 10,
    },
    containerInput: {
        marginBottom: 15,
        width: "80%",
        height: 50,
        opacity: 0.7,
        backfaceVisibility: "hidden",
        //backgroundColor: 'rgba(255, 255, 255, 0.3)',
        backgroundColor: "#F7B948",
        borderRadius: 10,

    },
    containerInputStyle: {
        borderBottomWidth: 0,
    },
    inputStyle: {
        color: "#202020"
    },
    picker: {
        height: 50,
        width: "50%",
        marginBottom: 10,
        color: "#c1c1c1"
    },
    pickerHeader: {
        margin: 10,
        marginBottom: 15,
        alignItems: "flex-end",
        fontSize: 19,
        color: "#c1c1c1"
    },
    iconRight: {
        color: "#c1c1c1",
        paddingRight: 16,
    },
    btnContainer: {
        marginTop: 40,
        marginBottom: 50,
        alignItems: "center",

    },
    btnStyle: {
        width: "40%",
        height: 60,
        backgroundColor: "#F7B948",
        borderRadius: 10,
    },
    btnTitleStyle: {
        fontSize: 20,
        color: "#fff",
    },
    mapStyle: {
        width: "100%",
        height: 550,
    },
    viewMapBtn: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    viewMapCancelContainer: {
        paddingLeft: 5,
    },
    viewMapCancel: {
        backgroundColor: "red",
        borderRadius: 10,
    },
    viewMapBtnContainerSave: {
        paddingRight: 5,

    },
    viewMapSave: {
        backgroundColor: "blue",
        borderRadius: 10,
    },
});