import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import ImageTest from "./src/screens/ImageTest";
import { PaperProvider } from "react-native-paper";

const Stack = createNativeStackNavigator();

const App = () => {
  //loading the fonts onto the app
  // const [fontsLoaded] = useFonts({
  // epilogueRegular: require("./assets/fonts/Epilogue-Regular.ttf"),
  // });

  // UseEffect for splash screen
  // useEffect(() => {
  //   async function prepare() {
  //     await SplashScreen.preventAutoHideAsync();
  //   }
  //   prepare();
  // }, []);

  // //if check for the fonts
  // if (!fontsLoaded) {
  //   return undefined;
  // } else {
  //   SplashScreen.hideAsync();
  // }

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="ImageTest"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="ImageTest" component={ImageTest} />
            {/* Add more screens here */}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
