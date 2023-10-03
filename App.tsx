import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import ImageTest from "./src/screens/ImageTest";

const Stack = createNativeStackNavigator();

const App = () => {
  //loading the fonts onto the app
  const [fontsLoaded] = useFonts({
    epilogueRegular: require("./assets/fonts/Epilogue-Regular.ttf"),
    epilogueBold: require("./assets/fonts/Epilogue-Bold.ttf"),
    caveat: require("./assets/fonts/Caveat-Regular.ttf"),
  });

  // UseEffect for splash screen
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  //if check for the fonts
  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ImageTest"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={ImageTest} />
        {/* Add more screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
