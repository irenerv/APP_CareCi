//Importaciones
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button } from "react-native-elements";
import { size } from "lodash";


//Componente para realizar cambios de contraseña
export default function ChangePasswordForm(props) {
    const { setShowModal, toastRef } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultValue());
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    //Carga de información
    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text });
    }

    //Validación de información y petición de actualización
    const onSubmit = async () => {
        let isSetErrors = true;
        let errorsTemp = {};
        setErrors({});
        if (!formData.password || !formData.newPassword || !formData.repeatNewPassword) {
            errorsTemp = {
                password: !formData.password ? "La contraseña no puede estar vacía" : "",
                newPassword: !formData.newPassword ? "La contraseña no puede estar vacía" : "",
                repeatNewPassword: !formData.repeatNewPassword ? "La contraseña no puede estar vacía" : "",

            };
        } else if (formData.newPassword !== formData.repeatNewPassword) {
            errorsTemp = {
                newPassword: "Las contraseñas no son iguales",
                repeatNewPassword: "Las contraseñas no son iguales",
            };
        } else if (size(formData.newPassword) < 6) {
            errorsTemp = {
                newPassword: "La contraseña tiene que se mayor a 5 carácteres",
                repeatNewPassword: "La contraseña tiene que se mayor a 5 carácteres",
            };
        } else {
            setIsLoading(true);

            fetch(new Request("http://IP_DISPOSITIVO:3000/api/putPassword", {
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    oldPassword: formData.password,
                    newPassword: formData.newPassword
                })
            })).catch((err) => {
                errorsTemp = {
                    other: "Error al actualizar la contraseña",
                };
                setIsLoading(false);
            });
        }
        isSetErrors && setErrors(errorsTemp);
    };


    return (
        //Formulario de actualización
        <View style={styles.view} >
            <Input
                placeholder="Contraseña actual"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword)
                }}
                onChange={(e) => onChange(e, "password")}
                errorMessage={errors.password}
            />
            <Input
                placeholder="Nueva contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword)
                }}
                onChange={(e) => onChange(e, "newPassword")}
                errorMessage={errors.newPassword}
            />
            <Input
                placeholder="Confirmación de contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword)
                }}
                onChange={(e) => onChange(e, "repeatNewPassword")}
                errorMessage={errors.repeatNewPassword}
            />
            <Button
                title="Cambiar contraseña"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
            <Text>{errors.other}</Text>
        </View>
    );
}

function defaultValue() {
    return {
        password: "",
        newPassword: "",
        repeatNewPassword: ""
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
        marginBottom: 10,

    },
    btnContainer: {
        marginTop: 20,
        width: "75%",
    },
    btn: {
        backgroundColor: "#F7B948",
    },
});