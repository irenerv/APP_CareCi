import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';


export default function DatePicker(props) {

    const { setDateTime, mode, title } = props
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };


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

const styles = StyleSheet.create({
    btnContainer: {
        marginTop: 40,
        marginBottom: 50,
        alignItems: "center",

    },
    btnStyle: {
        width: "60%",
        height: 60,
        backgroundColor: "#FED0CE",
        borderRadius: 10,
    },
    btnTitleStyle: {
        fontSize: 20,
        color: "#fff",
    }
});
