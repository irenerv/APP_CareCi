import React, { useState, useRef, } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements';
import { StatusBar } from "expo-status-bar";
import Title from "../../Components/Title";
import Toast from "react-native-easy-toast";
import Loading from "../../Components/Loading";
import { firebaseApp } from "../../Utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import moment from 'moment';

const db = firebase.firestore(firebaseApp);

export default function AddComment(props) {
    const { navigation, route } = props;
    const toastRef = useRef();
    const { idPost } = route.params;
    const [comment, setComment] = useState("");
    const currentDate = moment(new Date()).format('lll');
    const [isLoading, setIsLoading] = useState(false);

    const addComment = () => {
        if (!comment) {
            toastRef.current.show("Aún no has agregado un comentario.")
        } else {
            setIsLoading(true);
            const user = firebase.auth().currentUser;
            const payload = {
                idUser: user.uid,
                avatarUser: user.photoURL,
                idPost: idPost,
                comment: comment,
                createAt: currentDate,
            }
            db.collection("comments")
                .add(payload)
                .then(() => {
                    setIsLoading(false);
                })
                .catch(() => {
                    toastRef.current.show(
                        "Error al enviar la review"
                    )
                    setIsLoading(false);
                })
            //navigation.navigate("post")
        }

    }

    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#fff"
                style={"auto"}
                hidden={false} />
            <Title
                text="Añade tu comentario"
            />
            <Input
                placeholder="Comentario..."
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
                onChange={(e) => setComment(e.nativeEvent.text)}
            />
            <Button
                title="Enviar comentario"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnStyle}
                titleStyle={styles.btnTitleStyle}
                onPress={addComment}
            />
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading isVisible={isLoading} text="Enviando comentario" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        backgroundColor: "#fff"

    },
    containerInput: {
        marginTop: 100,
        marginBottom: 15,
        width: "80%",
        height: 400,
        opacity: 0.7,
        backfaceVisibility: "hidden",
        //backgroundColor: 'rgba(255, 255, 255, 0.3)',
        backgroundColor: "#F4CCB5",
        borderRadius: 10,
        alignSelf: "center",

    },
    containerInputStyle: {
        borderBottomWidth: 0,
    },
    inputStyle: {
        color: "#c1c1c1",
        paddingTop: 30,
    },
    iconRight: {
        color: "#c1c1c1",
        paddingRight: 16,
        marginTop: 30,
    },
    btnContainer: {
        marginTop: 40,
        marginBottom: 50,
        alignItems: "center",

    },
    btnStyle: {
        width: "55%",
        height: 60,
        backgroundColor: "#FED0CE",
        borderRadius: 10,
    },
    btnTitleStyle: {
        fontSize: 20,
        color: "#fff",
    },
})
