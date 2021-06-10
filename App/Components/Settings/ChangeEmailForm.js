//Importaciones
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native'
import { Button, Input } from "react-native-elements";
import { validateEmail } from "../../Utils/validations";
import { reauthenticate } from "../../Utils/api";

//Componente para realizar cambios de email del usuario
export default function ChangeEmailForm(props) {
    const { email, setShowModal, toastRef, setReloadUserInfo } = props;
    const [formData, setFormData] = useState(defaultFormValue());
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    //Carga de información
    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }
    //Validación de información y petición de actualización
    const onSubmit = () => {
        setErrors({});
        if (!formData.email || email === formData.email) {
            setErrors({
                email: "El email no ha cambiado"
            })
        } else if (!validateEmail(formData.email)) {
            setErrors({
                email: "Email incorrecto.",
            });
        } else if (!formData.password) {
            setErrors({
                password: "La contraseña no puede estar vacia",
            });
        } else {
            setIsLoading(true);
            reauthenticate(formData.password)
                .then(() => {
                    fetch(new Request("http://IP_DISPOSITIVO:3000/api/putEmail", {
                        method: "PUT",
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: formData.email
                        })
                    }))
                        .then(() => {
                            setIsLoading(false);
                            setReloadUserInfo(true);
                            toastRef.current.show("Email actualizado correctamente");
                            setShowModal(false);
                        })
                        .catch((err) => {
                            setErrors({ email: "Error al actualizar el email." });
                            setIsLoading(false);
                        });
                }).catch(() => {
                    setIsLoading(false);
                    setErrors({ password: "La contraseña no es correcta." });
                })
        }
    };

    return (
        //Visualización de formulario
        <View style={styles.view}>
            <Input
                placeholder="Correo eletronico"
                containerStyle={styles.input}
                defaultValue={email || ""}
                rightIcon={{
                    type: "material-community",
                    name: "at",
                    color: "#c2c2c2",
                }}
                onChange={(e) => onChange(e, "email")}
                errorMessage={errors.email}
            />
            <Input
                placeholder="Contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword),
                }}
                onChange={(e) => onChange(e, "password")}
                errorMessage={errors.password}
            />
            <Button
                title="Cambiar email"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>
    );
}

function defaultFormValue() {
    return {
        email: "",
        password: ""
    }
}

//Hoja de estilos
const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
    },
    input: {
        marginBottom: 10
    },
    btnContainer: {
        marginTop: 20,
        width: "75%",
    },
    btn: {
        backgroundColor: "#F7B948",
    },
});