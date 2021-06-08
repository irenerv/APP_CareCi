import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions, Alert } from "react-native";
import { Icon } from "react-native-elements";
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
const screenWidth = Dimensions.get("window").width;

export default function PostInfo(props) {
    const toastRef = useRef();
    const { navigation, route } = props;
    const { id } = route.params;
    const [post, setPost] = useState({});
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

    }, [photoOwner])



    //Function for deleting post register
    const deleteData = () => {
        Alert.alert(
            "Eliminar registro de vacuna",
            "¿Estás seguro de querer eliminar el registro de vacuna",
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
            <StatusBar
                animated={true}
                backgroundColor="#fff"
                style={"auto"}
                hidden={false} />
            {post.images &&
                < CarouselImages
                    arrayImages={post.images}
                    height={300}
                    width={screenWidth}
                />}
            <GeneralText text={"Publicado el:\n" + post.createAt} />
            <Title text={post.postHeader} />

            <GeneralText text={"" + post.date} />
            <GeneralText text={post.description} />


            <Icon
                reverse
                type="font-awesome"
                name="trash-o"
                color="#192637"
                containerStyle={styles.btnContainer}
                onPress={deleteData}
            />
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        marginTop: 40,
        backgroundColor: "white",
    },
    btnContainer: {
        position: "absolute",
        bottom: 2,
        right: 2,
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
    }
});