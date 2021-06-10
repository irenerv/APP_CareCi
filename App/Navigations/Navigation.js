//Importaciones
import React from "react";
import { AuthProvider } from "../Context/AuthProvider";
import Routes from "./Routes";

//Componente de navegación del sistema
export default function Navigation() {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    );
}
