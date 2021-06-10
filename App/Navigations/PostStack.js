//Importaciones
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Post from "../Screens/Post/Post";
import AddPost from "../Screens/Post/AddPost";
import PostInfo from "../Screens/Post/PostInfo";
import AddComment from "../Screens/Post/AddComment";
const Stack = createStackNavigator();

//Stack de navegación de las pantallas de Posts
export default function PostStack() {

    return (
        <Stack.Navigator
            options={{ headerShown: false }}
        >
            {/* Pantallas que conforman el stack */}
            <Stack.Screen
                name="post"
                component={Post}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="addPost"
                component={AddPost}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="postInfo"
                component={PostInfo}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="postComment"
                component={AddComment}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>


    );
}