//Importación
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Avatar, Divider } from "react-native-elements";
import { map } from "lodash";
import { firebaseApp } from "../../Utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import GeneralText from "../GeneralText";
const db = firebase.firestore(firebaseApp);

//Función para mostrar lista de comentarios de un post
export default function ListComments(props) {
    const { navigation, idPost } = props;
    const [comments, setComments] = useState(null);

    useEffect(() => {
        db.collection("comments")
            .where("idPost", "==", idPost)
            .get()
            .then((response) => {
                const resultComments = [];
                response.forEach(doc => {
                    const data = doc.data();
                    data.id = doc.id;
                    resultComments.push(data);
                });
                setComments(resultComments);
            })
    }, []);


    return (
        <View>
            {/* Botón para agregar más comentarios */}
            <Button
                title="Escribe una opinión"
                icon={{
                    type: "material-community",
                    name: "square-edit-outline",
                    //color:"#"
                }}
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnStyle}
                titleStyle={styles.btnTitleStyle}
                onPress={() => {
                    navigation.navigate("postComment", {
                        idPost: idPost
                    })
                }}
            />
            {map(comments, (comment, index) => (
                <Comment key={index} comment={comment} />
            ))}

        </View>
    )
}

//Visualiación de cada comentario
function Comment(props) {
    const { comment, createAt, avatarUser } = props.comment;

    return (

        <View style={styles.viewReview}>
            <View style={styles.viewImageAvatar}>
                <Avatar
                    size="large"
                    rounded
                    containerStyle={styles.imageAvatarUser}
                    source={avatarUser ? { uri: avatarUser }
                        : require("../../../assets/noImg/avatar_default.png")}
                />
            </View>
            <View style={styles.viewInfo}>
                <GeneralText text={comment} color={"white"} size={16} />
                <GeneralText text={createAt} style={styles.date} viewStyle={styles.viewDate} />

            </View>


        </View>
    );
}

//Hola de estilos
const styles = StyleSheet.create({
    btnContainer: {
        marginTop: 40,
        marginBottom: 80,
        alignItems: "center",

    },
    btnStyle: {
        width: "55%",
        height: 60,
        backgroundColor: "#F7B948",
        borderRadius: 10,
    },
    btnTitleStyle: {
        fontSize: 20,
        color: "#fff",
    },
    viewReview: {
        flexDirection: "row",
        padding: 10,
        paddingBottom: 20,
        borderBottomColor: "#F7B948",
        borderBottomWidth: 1,
        width: "94%",
        alignSelf: "center"

    },
    viewImageAvatar: {
        marginRight: 15
    },
    imageAvatarUser: {
        width: 50,
        height: 50,
    },
    viewInfo: {
        flex: 1,
        alignItems: "flex-start"
    },
    dividerStyle: {
        backgroundColor: '#E37B58',
        marginBottom: 5,
        width: "90%",
        alignSelf: "center"
    },
    date: {
        marginTop: 5,
        color: "grey",
        fontSize: 12,
        fontFamily: "Quicksand-Medium",
    },
    viewDate: {
        flex: 1,
        position: "absolute",
        right: 20,
        bottom: 2
    },
})
