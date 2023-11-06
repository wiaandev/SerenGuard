import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BackHandler, StyleSheet, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import * as Location from "expo-location";

// GOOGLE SIGN IN IMPORTS
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";

const auth = getAuth();

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
import Home from "./src/screens/Home";
import { UserLocationContext } from "./src/context/user-location.context";
import { UserContext, UserProvider } from "./src/context/user.context";
import { customDarkTheme } from "./src/utils/theme";
import { OAUTH_CLIENT_KEY_ANDROID, OAUTH_CLIENT_KEY_IOS } from "./config/oauth";
import { getStorage } from 'firebase/storage';

const Stack = createNativeStackNavigator<RootStackParamList>();

WebBrowser.maybeCompleteAuthSession();

const App = () => {
  const {onboarded, getStorage} = useContext(UserContext);
  console.log(onboarded);
  const [userInfo, setUserInfo] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: OAUTH_CLIENT_KEY_IOS,
    androidClientId: OAUTH_CLIENT_KEY_ANDROID,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      // Handle the sign-in
    }
  }, [response]);



  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [onboardingCompleted, setOnboardingCompleted] = useState<any>();
  // loading the fonts onto the app

  // UseEffect for splash screen
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  // useEffect(() => {
  //   checkOnboarding();
  // }, []);

  const handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  };

  // handle functionality when a user presses back (ANDROID ONLY)
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButton
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  //fetch users location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  SplashScreen.hideAsync();

  const darkTheme = {
    ...customDarkTheme,
  };

  const theme = {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
    },
  };

  const colorScheme = useColorScheme();

  const customTheme = colorScheme === "dark" ? darkTheme : darkTheme;

  //checked if the user has completed the onboarding
  // const checkOnboarding = async () => {
  //   try {
  //     const value: any = await AsyncStorage.getItem("@onboardingCompleted");

  //     if (value == true) {
  //       setOnboardingCompleted(true);
  //     }
  //     console.log("onboarding completed: ", onboardingCompleted);
  //   } catch (error) {
  //     console.log("Error @checkOnboarding: ", error);
  //   }
  // };

  return (
    <PaperProvider theme={customTheme}>
      <SafeAreaProvider>
        <UserLocationContext.Provider value={{ location, setLocation }}>
          <UserProvider>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName={!onboarded ? "Onboarding" : "Auth"}
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
                  options={{
                    gestureEnabled: false,
                  }}
                >
                  {(props) => <Register {...props} promptAsync={promptAsync} />}
                </Stack.Screen>
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
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{
                    gestureEnabled: false, // Disable swipe-back gesture for this screen
                  }}
                />
                {/* Add more screens here */}
              </Stack.Navigator>
            </NavigationContainer>
          </UserProvider>
        </UserLocationContext.Provider>
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
