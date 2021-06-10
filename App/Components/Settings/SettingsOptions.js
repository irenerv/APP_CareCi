//Importaciones
import React, { useState } from 'react';
import { StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";
import { map } from "lodash";
import Modal from "../Modal";
import ChangeDisplayNameForm from "./ChangeDisplayName";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";

//Componente de visualizaciones de formularios para modificar información
export default function AccountOptions(props) {
    const { userInfo, toastRef, setReloadUserInfo } = props;
    const [showModal, setShowModal] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null);

    //Switch para mostrar el caso seleccionado por el usuario
    const selectedComponent = (key) => {
        switch (key) {
            case "displayName":
                setRenderComponent(
                    <ChangeDisplayNameForm
                        displayName={userInfo.displayName}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUserInfo={setReloadUserInfo}
                    />
                );
                setShowModal(true);
                break;
            case "email":
                setRenderComponent(
                    <ChangeEmailForm
                        email={userInfo.email}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUserInfo={setReloadUserInfo}
                    />
                );
                setShowModal(true);
                break;
            case "password":
                setRenderComponent(
                    <ChangePasswordForm
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                    />
                );
                setShowModal(true);
                break;
            default:
                setRenderComponent(null);
                setShowModal(false);
                break;
        }
    };

    const menuOptions = generateOptions(selectedComponent);

    return (
        //Visualización de formulario seleccionado
        <View>
            {map(menuOptions, (menu, index) => (
                <ListItem
                    key={index}
                    title={menu.title}
                    leftIcon={{
                        type: menu.iconType,
                        name: menu.iconNameLeft,
                        color: menu.iconColorLeft,
                    }}
                    rightIcon={{
                        type: menu.iconType,
                        name: menu.iconNameRight,
                        color: menu.iconColorRight,
                    }}
                    containerStyle={styles.menuItem}
                    style={{ color: "#fff" }}
                    titleStyle={{ color: "#fff", fontFamily: "JosefinSans-SemiBold", fontSize: 15, }}
                    onPress={menu.onPress}
                />
            ))}
            {renderComponent && (
                <Modal isVisible={showModal} setIsVisible={setShowModal}>
                    {renderComponent}
                </Modal>
            )}
        </View>
    );
}

function generateOptions(selectedComponent) {
    return [
        {
            title: "Cambiar nombre y apellidos.",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#fff",
            iconNameRight: "chevron-right",
            iconColorRight: "#fff",
            onPress: () => selectedComponent("displayName"),
        },
        {
            title: "Cambiar email",
            iconType: "material-community",
            iconNameLeft: "at",
            iconColorLeft: "#fff",
            iconNameRight: "chevron-right",
            iconColorRight: "#fff",
            onPress: () => selectedComponent("email"),
        },
        {
            title: "Cambiar contraseña",
            iconType: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#fff",
            iconNameRight: "chevron-right",
            iconColorRight: "#fff",
            onPress: () => selectedComponent("password"),
        },
    ];
}

//Hoja de estilos
const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#fff",
        backgroundColor: "#202020",

    },
});