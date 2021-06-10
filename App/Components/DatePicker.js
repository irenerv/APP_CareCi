//Importaciones
import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

//Componente DatePicker, despliega un reloj o calendario para seleccionar hora o fecha
export default function DatePicker(props) {

    const { setDateTime, mode, title } = props
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    //Modalidad "time" o "dateTime"
    const handleConfirm = (date) => {
        if (mode === "time") {
            const time = moment(date).format('HH:mm');
            setDateTime(time);
            hideDatePicker();

        } else {
            const dateTime = moment(date).format('lll');
            setDateTime(dateTime);
            hideDatePicker();
        }

    }

    return (
        <View>
            {/* Visualización de componente */}
            <Button
                title={title}
                onPress={showDatePicker}
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnStyle}
                titleStyle={styles.btnTitleStyle}

            />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode={mode}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );

}

//Hoja de estilos
const styles = StyleSheet.create({
    btnContainer: {
        marginTop: 5,
        marginBottom: 50,
        alignItems: "center",

    },
    btnStyle: {
        width: "118%",
        height: 45,
        backgroundColor: "#F7B948",
        borderRadius: 10,
    },
    btnTitleStyle: {
        fontSize: 20,
        color: "#fff",
    }
});
