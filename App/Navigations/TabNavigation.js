//Importaciones
import React from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Icon } from "react-native-elements";
import PostStack from "./PostStack";
import SettingStack from "./SettingStack";

const Tab = createMaterialBottomTabNavigator();

//Componnete de navegación Tab
export default function TabNavigation() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => screenOptions(route, color),
            })}

            initialRouteName="Home"
            activeColor="#202020"
            inactiveColor="#f0edf6"
            barStyle={{ backgroundColor: '#F7B948', paddingBottom: 8 }}

        >
            {/* Stacks de la navegación */}
            <Tab.Screen
                name="post"
                component={PostStack}
                options={{ title: "Post" }}
            />
            <Tab.Screen
                name="setting"
                component={SettingStack}
                options={{ title: "Setting" }}
            />

        </Tab.Navigator>
    );
}

//Carga de iconos para cada sección
function screenOptions(route, color) {
    let iconName;

    switch (route.name) {
        case "post":
            iconName = "note-text-outline";
            break;
        case "setting":
            iconName = "cog-outline";
            break;
        case "autenticacion":
            iconName = "cog-outline";
            break;
        default:
            break;
    }

    return (
        <Icon type="material-community" name={iconName} size={22} color={color} />
    );
}
