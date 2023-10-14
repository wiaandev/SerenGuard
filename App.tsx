import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { BackHandler, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import ImageTest from "./src/screens/ImageTest";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

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
import { colors } from "./src/utils/colors";

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

  const handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButton
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  SplashScreen.hideAsync();

  const theme = {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      myOwnColor: colors.orange,
    },
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Onboarding"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen
              name="Auth"
              component={Auth}
              options={{
                gestureEnabled: false, // Disable swipe-back gesture for this screen
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                gestureEnabled: false, // Disable swipe-back gesture for this screen
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                gestureEnabled: false, // Disable swipe-back gesture for this screen
              }}
            />
            <Stack.Screen
              name="ImageTest"
              component={ImageTest}
              options={{
                gestureEnabled: false, // Disable swipe-back gesture for this screen
              }}
            />
            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{
                gestureEnabled: false, // Disable swipe-back gesture for this screen
              }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                gestureEnabled: false, // Disable swipe-back gesture for this screen
              }}
            />
            <Stack.Screen
              name="Detail"
              component={NeighbourhoodDetail}
              options={{
                gestureEnabled: false, // Disable swipe-back gesture for this screen
              }}
            />
            <Stack.Screen
              name="Report"
              component={AddReport}
              options={{
                gestureEnabled: false, // Disable swipe-back gesture for this screen
              }}
            />
            <Stack.Screen
              name="Alert"
              component={Alert}
              options={{
                gestureEnabled: false, // Disable swipe-back gesture for this screen
              }}
            />
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
