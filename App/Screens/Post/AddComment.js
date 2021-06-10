import React, { useState, useRef, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements';
import { StatusBar } from "expo-status-bar";
import Title from "../../Components/Title";
import Toast from "react-native-easy-toast";
import Loading from "../../Components/Loading";
import { AuthContext } from "../../Context/AuthProvider";
import moment from 'moment';

export default function AddComment(props) {
    const { navigation, route } = props;
    const toastRef = useRef();
    const { idPost } = route.params;
    const { user } = useContext(AuthContext);
    const [comment, setComment] = useState("");
    const currentDate = moment(new Date()).format('lll');
    const [isLoading, setIsLoading] = useState(false);

    const addComment = () => {
        if (!comment) {
            toastRef.current.show("Aún no has agregado un comentario.")
        } else {
            setIsLoading(true);
            const payload = {
                idUser: user.uid,
                avatarUser: user.photoURL,
                idPost: idPost,
                comment: comment,
                createAt: currentDate,
            }
            fetch(new Request("http://IP_DISPOSITIVO:3000/api/comment", {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    payload: payload
                })
            })).then(response => {
                //navigation.navigate("postInfo", idPost)
            }).catch((err) => {
                console.log(err);
            });

        }

    }

    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#000"
                style={"light"}
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
        backgroundColor: "#202020"

    },
    containerInput: {
        marginTop: 100,
        marginBottom: 15,
        width: "80%",
        height: 400,
        opacity: 0.7,
        backfaceVisibility: "hidden",
        //backgroundColor: 'rgba(255, 255, 255, 0.3)',
        backgroundColor: "#F7B948",
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
        backgroundColor: "#F7B948",
        borderRadius: 10,
    },
    btnTitleStyle: {
        fontSize: 20,
        color: "#fff",
    },
})
