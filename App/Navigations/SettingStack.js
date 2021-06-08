import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Settings from "../Screens/Settings/Settings";
const Stack = createStackNavigator();

export default function SettingStack() {

    return (
        <Stack.Navigator
            options={{ headerShown: false }}
        >
            <Stack.Screen
                name="settings"
                component={Settings}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>


    );
}