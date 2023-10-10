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

// Screens
import Auth from "./src/screens/Auth";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Onboarding from "./src/screens/Onboarding";
import Profile from "./src/screens/Profile";
import NeighbourhoodDetail from "./src/screens/NeighbourhoodDetail";
import AddReport from "./src/screens/AddReport";
import Alert from "./src/screens/Alert";
import { RootStackParamList } from "./src/types/RootStackParamList";

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {

  // loading the fonts onto the app

  // UseEffect for splash screen
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  SplashScreen.hideAsync();

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Auth"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Auth" component={Auth} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ImageTest" component={ImageTest} />
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Detail" component={NeighbourhoodDetail} />
            <Stack.Screen name="Report" component={AddReport} />
            <Stack.Screen name="Alert" component={Alert} />
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
