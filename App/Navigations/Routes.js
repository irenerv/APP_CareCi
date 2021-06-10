
//Importaciones
import React, { useContext, useState, useEffect } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./AuthNavigation";
import TabNavigation from "./TabNavigation";
import { AuthContext } from "../Context/AuthProvider";
import Loading from "../Components/Loading";

//Componente Routes, valida el status de autenticación y gestiona la navegación a mostrar
export default function Routes() {
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(null);

    //Peticiones de status de autenticación
    function onAuthStateChanged(user) {
        setUser(user);
        fetch(new Request("http://IP_DISPOSITIVO:3000/api/init", {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })).then(response => {
            setLoading(false);
            setInitializing(response.initializing)
        }).catch((err) => {
            console.log(err);
        });
    }
    useEffect(() => {
        onAuthStateChanged(user);
        fetch(new Request("http://IP_DISPOSITIVO:3000/api/state", {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })).then(response => {
            return response.subscriber;
        }).catch((err) => {
            console.log(err);
        });
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
