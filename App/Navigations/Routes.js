import React, { useContext, useState, useEffect } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import firebase from "firebase/app";
import { firebaseApp } from "../Utils/firebase";
import AuthNavigation from "./AuthNavigation";
import TabNavigation from "./TabNavigation";
import { AuthContext } from "../Context/AuthProvider";
import Loading from "../Components/Loading";

export default function Routes() {
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(firebaseApp);

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
        <NavigationContainer>
            {user ? <TabNavigation /> : <AuthNavigation />}
        </NavigationContainer>);

}
