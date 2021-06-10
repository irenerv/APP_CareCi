import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import Loading from "../Loading";
import { validateEmail } from "../../Utils/validations";
import { size, isEmpty } from "lodash";
import { AuthContext } from "../../Context/AuthProvider";

export default function RegisterForm(props) {
    const { toastRef } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue());
    const [loading, setLoading] = useState(false);
    const { register } = useContext(AuthContext);

    // Validaciones y envío de datos
    const onSubmit = () => {
        if (
            isEmpty(formData.email) ||
            isEmpty(formData.password) ||
            isEmpty(formData.repeatPassword)
        ) {
            toastRef.current.show("Todos los campos son obligatorios");
        } else if (!validateEmail(formData.email)) {
            toastRef.current.show("Email no válido");
        } else if (formData.password !== formData.repeatPassword) {
            toastRef.current.show("Las contraseñas no coinciden");
        } else if (size(formData.password) < 6) {
            toastRef.current.show(
                "La contraseña debe tener un mínimo de 6 carácteres"
            );
        } else {
            setLoading(true);
            register(formData.email, formData.password);
        }
    };

    const onChange = (event, type) => {
        setFormData({ ...formData, [type]: event.nativeEvent.text });
    };

    return (
        // Formulario de entrada de datos
        <View style={StyleSheet.formContainer}>
            <Input
                placeholder="Correo electrónico"
                containerStyle={styles.inputForm}
                inputStyle={styles.inputStyle}
                placeholderTextColor={"#fff"}
                onChange={(event) => onChange(event, "email")}
                keyboardType="email-address"
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.iconRight}
                    />
                }
            />
            <Input
                placeholder="Contraseña"
                containerStyle={styles.inputForm}
                inputStyle={styles.inputStyle}
                placeholderTextColor={"#fff"}
                password={true}
                secureTextEntry={showPassword ? false : true}
                onChange={(event) => onChange(event, "password")}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Input
                placeholder="Repetir contraseña"
                containerStyle={styles.inputForm}
                inputStyle={styles.inputStyle}
                placeholderTextColor={"#fff"}
                password={true}
                secureTextEntry={showRepeatPassword ? false : true}
                onChange={(event) => onChange(event, "repeatPassword")}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showRepeatPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setShowRepeatPassword(!showRepeatPassword)}
                    />
                }
            />
            <Button
                title="Unirse"
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                titleStyle={styles.btnTitleStyle}
                onPress={onSubmit}
            />
            <Loading isVisible={loading} text="Creando cuenta" />
        </View>
    );
}

function defaultFormValue() {
    return {
        email: "",
        password: "",
        repeatPassword: "",
    };
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    inputForm: {
        width: "100%",
        marginTop: 20,
    },
    btnContainerRegister: {
        marginTop: 40,
        marginBottom: 8,
        alignItems: "center",
        width: "95%",
    },
    btnRegister: {
        width: "50%",
        height: 60,
        backgroundColor: "#F7B948",
        borderRadius: 15,
    },
    btnTitleStyle: {
        fontSize: 25,
        color: "#fff",
    },
    iconRight: {
        color: "#fff",
    },
    inputStyle: {
        color: "#fff"
    },
});
