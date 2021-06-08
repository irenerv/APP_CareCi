import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../Screens/Account/Account";
import Login from "../Screens/Account/Login";
import Register from "../Screens/Account/Register";
import UserGuest from "../Screens/Account/UserGuest";

const Stack = createStackNavigator();

export default function AuthNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="account"
                component={Account}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="login"
                component={Login}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="register"
                component={Register}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="userGuest"
                component={UserGuest}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
}
