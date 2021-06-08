import React, { useState, useRef } from "react";
import { View } from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "../../Components/Loading";
import PostForm from "../../Components/Posts/PostForm";

export default function AddPost(props) {
    const { navigation, route } = props;//Obtenido directamento por provenir de un stack navigation
    const toastRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    return (
        <View>
            <PostForm
                toastRef={toastRef}
                setIsLoading={setIsLoading}
                navigation={navigation}
                postInfo={route}
            />
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading isVisible={isLoading} text="Publicando reporte" />
        </View>
    )
}
