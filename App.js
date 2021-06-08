import React, { useState, useEffect } from "react";
import { LogBox } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import Navigation from "./App/Navigations/Navigation";
import { firebaseApp } from "./App/Utils/firebase";

//Omitting setting time warning
LogBox.ignoreLogs(["Setting a timer"]);

//Loading fonts families
const getFonts = () => Font.loadAsync({
  'JosefinSans-Light': require("./assets/Fonts/JosefinSans-Light.ttf"),
  'Quicksand-Regular': require("./assets/Fonts/Quicksand-Regular.ttf"),
  'JosefinSans-SemiBold': require("./assets/Fonts/JosefinSans-SemiBold.ttf"),
  'Montserrat-Regular': require("./assets/Fonts/Montserrat-Regular.ttf"),
  'Montserrat-SemiBold': require("./assets/Fonts/Montserrat-SemiBold.ttf"),
  'Quicksand-Medium': require("./assets/Fonts/Quicksand-Medium.ttf"),
  'Quicksand-Regular': require("./assets/Fonts/Quicksand-Regular.ttf"),
  'Quicksand-SemiBold': require("./assets/Fonts/Quicksand-SemiBold.ttf"),
  'Raleway-Regular': require("./assets/Fonts/Raleway-Regular.ttf"),

})

//Using Navigation, it allow us to authenticate us and have acccess to the complete app
export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);


  if (fontsLoaded) {
    return (
      <Navigation />
    )
  } else {
    return (<AppLoading
      startAsync={getFonts}
      onFinish={() => setFontsLoaded(true)}
      onError={(error) => console.log("Error" + error)}
    />
    )
  }
}
