import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, ScrollView, Dimensions, Alert } from "react-native";
import { Icon, Divider } from "react-native-elements";
import Loading from "../../Components/Loading";
import Toast from "react-native-easy-toast";
import firebase from "firebase/app";
import { firebaseApp } from "../../Utils/firebase";
import "firebase/storage";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);
import { StatusBar } from "expo-status-bar";
import GeneralText from "../../Components/GeneralText";
import Title from "../../Components/Title";
import CarouselImages from "../../Components/Carousel";
import Map from "../../Components/Map";
import ListComments from "../../Components/Comments/ListComments";
const screenWidth = Dimensions.get("window").width;

export default function PostInfo(props) {
    const toastRef = useRef();
    const { navigation, route } = props;
    const { id } = route.params;
    const [post, setPost] = useState(null);
    const [photoOwner, setPhotoOwner] = useState({});

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
        db.collection("post")
            .doc(id)
            .get()
            .then((response) => {
                const data = response.data();
                data.id = response.id;
                setPost(data);

                /* firebase.storage()
                     .ref(`avatar/${post.createBy}`)
                     .getDownloadURL()
                     .then(async (response) => {
                         setPhotoOwner(response)
                     }).catch((e) => {
                         console.log(e)
                     });*/
            })

    }, [id])



    //Function for deleting post register
    const deleteData = () => {
        Alert.alert(
            "Eliminar reporte",
            "¿Estás seguro de querer eliminar este reporte"
            [{
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Eliminar",
                onPress: () => {
                    db.collection("post").doc(id).delete().then(() => {
                        navigation.navigate("post");
                    }).catch((error) => {
                        toastRef.current.show("Ha habido un error, inténtelo más tarde")
                    });
                },
            }],
            { cancelable: false }
        )
    }

    //Waiting for data from useEffect function
    if (!post) return <Loading isVisible={true} text="Cargando..." />

    return (
        //Visualization of screen
        <ScrollView vertical style={styles.viewBody}>
            { post && (
                <>
                    <StatusBar
                        animated={true}
                        backgroundColor="#fff"
                        style={"auto"}
                        hidden={false} />

                    < CarouselImages
                        arrayImages={post.images}
                        height={300}
                        width={screenWidth}
                    />
                    <GeneralText text={"Publicado: " + post.createAt} style={styles.dateStyle} />
                    <Title text={post.postHeader} />

                    <GeneralText text={"Fecha del suceso:\n" + post.date} style={styles.dateStyle} />
                    <GeneralText text={post.description} style={styles.descriptionStyle} />
                    <Divider style={{ backgroundColor: "#F7B948", marginTop: 15, width: "90%", alignSelf: "center" }} />
                    <PostLocation
                        location={post.location}
                        address={post.address}
                    />
                    <ListComments
                        navigation={navigation}
                        idPost={post.id}
                    />

                    <Icon
                        reverse
                        type="font-awesome"
                        name="trash-o"
                        color="#F7B948"
                        containerStyle={styles.btnContainer}
                        onPress={deleteData}
                    />
                    <Toast ref={toastRef} position="center" opacity={0.9} />
                </>
            )}
        </ScrollView>
    );

}

function PostLocation(props) {
    const { location, name, address } = props;

    return (
        <View style={styles.viewPostInfo}>
            <GeneralText text="Ubicación" color="#fff" size={20} />
            <Map location={location} name={name} height={200} />

        </View>
    );
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        marginTop: 40,
        backgroundColor: "#202020",
    },
    btnContainer: {
        position: "absolute",
        bottom: 30,
        right: 10,
    },
    viewStyleInfo: {
        backgroundColor: "#fbd0b1",
        height: 400,
        width: "80%",
        marginTop: 10,
        borderRadius: 20,
        alignSelf: "center",
        alignItems: "center"
    },
    viewDataStyle: {
        marginTop: 32,
        alignSelf: "center"
    },
    viewPostInfo: {
        margin: 15,
        marginTop: 15,
    },
    dateStyle: {
        fontFamily: "Quicksand-Medium",
        color: "#fff",
        fontSize: 15,
        position: "absolute",
        right: 5,
        marginTop: 5,
    },
    descriptionStyle: {
        fontFamily: "Quicksand-Medium",
        color: "#fff",
        fontSize: 15,
        alignSelf: "center",
        marginTop: 100,
        marginBottom: 20

    }
});