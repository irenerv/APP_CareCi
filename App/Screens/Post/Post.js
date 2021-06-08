import React, { useState, useContext, useCallback, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";
import { firebaseApp } from "../../Utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import Toast from "react-native-easy-toast";
import ListPost from "../../Components/Posts/ListPost";
import { AuthContext } from "../../Context/AuthProvider";
import Title from "../../Components/Title";
import { StatusBar } from "expo-status-bar";
const db = firebase.firestore(firebaseApp);

export default function Post(props) {
    const { navigation, route } = props;
    const { user } = useContext(AuthContext);
    const [post, setPost] = useState([]);
    const [infoPost, setInfoPost] = useState(route.params);
    const [totalPost, setTotalPost] = useState(0);
    const [startPost, setStartPost] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const toastRef = useRef();
    const limitPost = 10;

    useFocusEffect(
        useCallback(() => {
            navigation.setOptions({ headerShown: false })

            db.collection("post")
                .get()
                .then((snap) => {
                    setTotalPost(snap.size);

                });

            const resultPost = [];
            db.collection("post")
                .orderBy("createAt", "desc")
                .limit(limitPost)
                .get()
                .then((response) => {
                    //Obtaining the file number to continue
                    setStartPost(response.docs[response.docs.length - 1])

                    //Obtaining every post in the database
                    response.forEach((doc) => {
                        const posts = doc.data();
                        posts.id = doc.id;
                        resultPost.push(posts);
                    });
                    //Storing data of every post in an array
                    setPost(resultPost);
                }).catch((error) => {
                    toastRef.current.show("Ha ocurrido un error, por favor intentalo más tarde.");
                    console.log(error);

                });
        }, [])
    );


    const handleLoadMore = () => {
        const resultPost = [];

        post.length < totalPost && setIsLoading(true);

        db.collection("post")
            .orderBy("createAt", "desc")
            .startAfter(startPost.data().createAt)
            .limit(limitPost)
            .get()
            .then((response) => {
                if (response.docs.length > 0) {
                    setStartPost(response.docs[response.docs.length - 1]);
                } else {
                    setIsLoading(false);
                }

                response.forEach((doc) => {
                    const posts = doc.data();
                    posts.id = doc.id;
                    resulPost.push(posts);
                });
                setPost([...post, ...resultPost]);
            })
    }


    const addPost = () => {
        navigation.navigate("addPost", infoPost);
    }

    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#fff"
                style={"auto"}
                hidden={false} />
            <Title
                text="Tablero de reportes"
            />
            <ListPost
                post={post}
                handleLoadMore={handleLoadMore}
                isLoading={isLoading}
                postInfo={route}
            />
            <Icon
                reverse
                type="material-community"
                name="plus"
                color="#192637"
                containerStyle={styles.btnContainer}
                onPress={addPost}
            />
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        backgroundColor: "#fff"
    },
    btnContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
    },

});