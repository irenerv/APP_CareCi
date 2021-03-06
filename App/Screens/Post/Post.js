import React, { useState, useContext, useCallback, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";
import Toast from "react-native-easy-toast";
import ListPost from "../../Components/Posts/ListPost";
import { AuthContext } from "../../Context/AuthProvider";
import Title from "../../Components/Title";
import { StatusBar } from "expo-status-bar";

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

            fetch(new Request("http://IP_DISPOSITIVO:3000/api/postLen", {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            }))
                .then(response => {
                    let res = (JSON.stringify(response))
                    setTotalPost(res.lenght);
                })
                .catch((err) => {
                    console.log(err);
                });

            fetch(new Request("http://IP_DISPOSITIVO:3000/api/post/:limitPost", {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                params: JSON.stringify({
                    limitPost: limitPost
                })
            }))
                .then(response => {
                    let res = (JSON.stringify(response))
                    console.log(JSON.stringify(response))
                    setStartPost(res.startPost)
                    setPost(res.posts);
                })
                .catch((err) => {
                    console.log(err);
                });
        }, [])
    );

    const handleLoadMore = () => {
        post.length < totalPost && setIsLoading(true);

        fetch(new Request("http://IP_DISPOSITIVO:3000/api/post/:limitPost", {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            params: JSON.stringify({
                limitPost: limitPost,
            })
        }))
            .then(response => {
                let res = (JSON.stringify(response))
                setPost([...post, ...res.posts]);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const addPost = () => {
        navigation.navigate("addPost", infoPost);
    }

    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#000"
                style={"light"}
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
                color='#F7B948'
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
        backgroundColor: "#202020"
    },
    btnContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
    },

});