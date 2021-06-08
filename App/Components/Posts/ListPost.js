import React from "react";
import { StyleSheet, View, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { Image } from "react-native-elements";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";
import GeneralText from "../../Components/GeneralText"



export default function ListPost(props) {
    const { post, handleLoadMore, isLoading } = props;
    const navigation = useNavigation();
    return (
        <View>
            {size(post) > 0 ? (
                //Componente FlatList, despliega la información del post en listas
                <FlatList
                    data={post}
                    numColumns={1}
                    renderItem={(postData) => <Post postData={postData} navigation={navigation} />}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={<FooterList isLoading={isLoading} />}
                    onEndReached={handleLoadMore}
                />
            ) : (
                <View style={styles.loaderPosts}>
                    {/* Indicadores de carga (retroalimentación de usuario) */}
                    <ActivityIndicator size="large" color="black" />
                    <GeneralText text="Cargando" color="#3b3835" size={14} />
                </View>
            )}
        </View>
    );
}

// Función Post, muestra cada uno de los post almacenados en la base de datos
function Post(props) {
    const { postData, navigation } = props;
    const { id, images } = postData.item;
    const imagePost = images ? images[0] : null;

    const goInfoPost = () => {
        navigation.navigate("postInfo", {
            id
        });
    }

    return (
        <TouchableOpacity style={styles.TouchableStyle} onPress={goInfoPost}>
            <View style={styles.viewPost}>
                <View style={styles.viewPostImage}>
                    <Image
                        resizeMode="cover" //AllContain
                        PlaceholderContent={<ActivityIndicator color="#fff" />}
                        source={
                            imagePost
                                ? { uri: imagePost }
                                : require("../../../assets/noImg/noImages.png")
                        }
                        style={styles.imagePost}
                        containerStyle={styles.imagePostContainer}
                    />
                </View>
                <View>
                    <GeneralText text={id} size={14} />
                    <GeneralText text={"name"} size={18} />

                </View>
            </View>
        </TouchableOpacity>
    );

}

function FooterList(props) {
    const { isLoading } = props;
    if (isLoading) {
        return (
            <View style={styles.loaderPosts}>
                <ActivityIndicator size="large" />
            </View>
        )
    } else {
        return (
            <View style={styles.notFoundPost}>
                <GeneralText text="No hay más mascotas que mostrar" color="#3b3835" size={14} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loaderPosts: {
        marginTop: 40,
        marginBottom: 40,
        alignItems: "center",
    },
    TouchableStyle: {
        height: 400,
        width: "70%",
        marginVertical: 30,
        marginRight: 35,
        marginBottom: 20,
        alignSelf: "center"
    },
    viewPost: {
        flexDirection: "row",
        marginTop: 10,
        alignSelf: "center",
        marginLeft: 45,
        backgroundColor: "#E37B58",
        borderRadius: 20,
        height: 400,
        width: "100%",

    },
    imagePost: {
        height: 300,
        width: 303,
    },
    imagePostContainer: {
        overflow: "hidden",
        borderRadius: 20,
        height: 300,
        width: 303,
    },

    notFoundPost: {
        marginTop: 100,
        marginBottom: 50,
        alignItems: "center",
    },
    noMorePosts: {
        marginTop: 50,
    }
});