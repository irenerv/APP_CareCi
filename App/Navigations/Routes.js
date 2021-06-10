
//Importaciones
import React, { useContext, useState, useEffect } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import firebase from "firebase/app";
import { firebaseApp } from "../Utils/firebase";
import AuthNavigation from "./AuthNavigation";
import TabNavigation from "./TabNavigation";
import { AuthContext } from "../Context/AuthProvider";
import Loading from "../Components/Loading";

//Componente Routes, valida el status de autenticación y gestiona la navegación a mostrar
export default function Routes() {
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(firebaseApp);

    //Peticiones de status de autenticación
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
        setLoading(false);
    }
    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, [user]);


    if (loading) {
        return (
            <View><Loading isVisible={loading} text="" /></View>
        );
    }

    return (
        //Selección de navegación según la autenticación del usuario
        <NavigationContainer>
            {user ? <TabNavigation /> : <AuthNavigation />}
        </NavigationContainer>);

}
