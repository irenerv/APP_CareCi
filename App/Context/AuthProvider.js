//Importaciones
import React, { useState, createContext } from 'react';
//import firebase from "firebase/app";
import * as firebase from "firebase";
export const AuthContext = createContext({});

//Componente que realiza peticiones de autenticación
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                //Inicio de sesión
                login: async (email, password) => {
                    try {
                        await firebase
                            .auth()
                            .signInWithEmailAndPassword(email, password)
                    } catch (e) {
                        console.log("Error login:" + e);
                    }
                },
                //Registro
                register: async (email, password) => {
                    try {
                        await firebase
                            .auth()
                            .createUserWithEmailAndPassword(email, password)
                    } catch (e) {
                        console.log("Error register:" + e);
                    }
                },
                //Cierre de sesión
                logout: async () => {
                    try {
                        await firebase.auth().signOut()
                    } catch (e) {
                        console.error("Error log::" + e);
                    }
                },
            }}>{children}</AuthContext.Provider>
    );
};
