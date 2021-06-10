//Importaciones
import React, { useState, createContext } from 'react';
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
                login: (email, password) => {
                    fetch(new Request("http://IP_DISPOSITIVO:3000/api/signin", {
                        method: "POST",
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: email,
                            password: password
                        })
                    })).catch((e) => {
                        console.log("Error login: " + e);
                    })
                },
                //Registro
                register: (email, password) => {
                    fetch(new Request("http://IP_DISPOSITIVO:3000/api/signup", {
                        method: "POST",
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: email,
                            password: password
                        })
                    })).catch((e) => {
                        console.log("Error register: " + e);
                    })
                },
                //Cierre de sesión
                logout: () => {
                    fetch(new Request("http://IP_DISPOSITIVO:3000/api/signout", {
                        method: "POST",
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                    })).catch((e) => {
                        console.error("Error logout: " + e);
                    })
                }
            }}>{children}</AuthContext.Provider>
    );
};
