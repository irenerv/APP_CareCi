import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { isEmpty } from "lodash";
import { validateEmail } from "../../Utils/validations";
import Loading from "../Loading";
import { AuthContext } from "../../Context/AuthProvider";

export default function LoginForm(props) {
    const { toastRef } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue());
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);

    //Establecimiento de información en formData
    const onChange = (event, type) => {
        setFormData({ ...formData, [type]: event.nativeEvent.text });
    };

    //Validación de información y envío de datos
    const onSubmit = () => {
        if (isEmpty(formData.email) || isEmpty(formData.password)) {
            //Caso 1: Información no completada
            toastRef.current.show("Todos los campos son obligatorios");
        } else if (!validateEmail(formData.email)) {
            //Caso2: Email incorrecto
            toastRef.current.show("El email no es correcto");
        } else {

            setLoading(true);
            login(formData.email, formData.password);
        }
    };

    return (
        //Contenedores de formulario
        <View style={styles.formContainer}>
            {/* Entrada de correo electrónico */}
            <Input
                placeholder="Correo Electrónico"
                containerStyle={styles.inputForm}
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
            {/* Entrada de contraseña */}
            <Input
                placeholder="Contraseña"
                containerStyle={styles.inputForm}
                onChange={(event) => onChange(event, "password")}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            {/* Botón de confirmación */}
            <Button
                title="Iniciar Sesión"
                containerStyle={styles.btnContainerLogin}
                buttonStyle={styles.btnLogin}
                titleStyle={styles.btnTitleStyle}
                onPress={onSubmit}
            />
            <Loading isVisible={loading} text="Iniciando Sesión" />
        </View>
    );
}

function defaultFormValue() {
    return {
        email: "",
        password: "",
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
        marginTop: 8,
        marginBottom: 8,
    },
    btnContainerLogin: {
        marginTop: 24,
        marginBottom: 8,
        alignItems: "center",
        width: "95%",
    },
    btnLogin: {
        width: "50%",
        height: 55,
        backgroundColor: "#F7B948",
        borderRadius: 15,
    },
    iconRight: {
        color: "#c1c1c1",
    },
    btnTitleStyle: {
        color: "white",
    },
});
