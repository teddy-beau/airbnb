import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
// Colors:
import colors from "./assets/colors";
const { red, regularGrey, lightGrey, darkGrey, white } = colors;
// Containers:
import HomeScreen from "./containers/HomeScreen";
import RoomScreen from "./containers/RoomScreen";
import AroundMeScreen from "./containers/AroundMeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";
// Components:
import Logo from "./components/Logo";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
   const [isLoading, setIsLoading] = useState(true);
   const [userToken, setUserToken] = useState(null);

   const setToken = async (token) => {
      if (token) {
         AsyncStorage.setItem("userToken", token);
      } else {
         AsyncStorage.removeItem("userToken");
      }

      setUserToken(token);
   };

   useEffect(() => {
      // Fetch the token from storage then navigate to our appropriate place
      const bootstrapAsync = async () => {
         // We should also handle error for production apps
         const userToken = await AsyncStorage.getItem("userToken");

         // This will switch to the App screen or Auth screen and this loading
         // screen will be unmounted and thrown away.
         setIsLoading(false);
         setUserToken(userToken);
      };

      bootstrapAsync();
   }, []);

   return (
      <NavigationContainer>
         {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
            // No token found, user isn't signed in
            <Stack.Navigator headerMode="none">
               <Stack.Screen name="SignIn">
                  {() => <SignInScreen setToken={setToken} />}
               </Stack.Screen>
               <Stack.Screen name="SignUp">
                  {() => <SignUpScreen setToken={setToken} />}
               </Stack.Screen>
            </Stack.Navigator>
         ) : (
            // User is signed in
            <Stack.Navigator>
               <Stack.Screen
                  name="Tab"
                  options={{ headerShown: false, animationEnabled: false }}
               >
                  {() => (
                     <Tab.Navigator
                        tabBarOptions={{
                           activeTintColor: red,
                           inactiveTintColor: regularGrey,
                        }}
                     >
                        <Tab.Screen
                           name="Home"
                           options={{
                              tabBarLabel: "Home",
                              tabBarIcon: ({ color, size }) => (
                                 <Ionicons
                                    name={"ios-home-outline"}
                                    size={size}
                                    color={color}
                                 />
                              ),
                           }}
                        >
                           {() => (
                              <Stack.Navigator>
                                 <Stack.Screen
                                    name="Home"
                                    options={{
                                       headerTitle: () => <Logo height={28} />,
                                    }}
                                 >
                                    {() => <HomeScreen />}
                                 </Stack.Screen>
                                 <Stack.Screen
                                    name="Room"
                                    options={{
                                       headerTitle: () => <Logo height={28} />,
                                       headerBackImage: () => (
                                          <Feather
                                             name="arrow-left"
                                             size={28}
                                             color={regularGrey}
                                             style={{ marginLeft: 4 }}
                                          />
                                       ),
                                       headerBackTitleVisible: false,
                                    }}
                                 >
                                    {() => <RoomScreen />}
                                 </Stack.Screen>
                                 <Stack.Screen
                                    name="Profile"
                                    options={{
                                       title: "User Profile",
                                    }}
                                 >
                                    {() => <ProfileScreen />}
                                 </Stack.Screen>
                              </Stack.Navigator>
                           )}
                        </Tab.Screen>
                        <Tab.Screen
                           name="Around me"
                           options={{
                              tabBarLabel: "Around me",
                              tabBarIcon: ({ color, size }) => (
                                 <Ionicons
                                    name={"ios-location-outline"}
                                    size={size}
                                    color={color}
                                 />
                              ),
                           }}
                        >
                           {() => (
                              <Stack.Navigator>
                                 <Stack.Screen
                                    name="Around me"
                                    options={{
                                       headerTitle: () => <Logo height={28} />,
                                    }}
                                 >
                                    {() => <AroundMeScreen />}
                                 </Stack.Screen>
                              </Stack.Navigator>
                           )}
                        </Tab.Screen>
                        <Tab.Screen
                           name="Settings"
                           options={{
                              tabBarLabel: "Settings",
                              tabBarIcon: ({ color, size }) => (
                                 <Ionicons
                                    name={"ios-options"}
                                    size={size}
                                    color={color}
                                 />
                              ),
                           }}
                        >
                           {() => (
                              <Stack.Navigator>
                                 <Stack.Screen
                                    name="Settings"
                                    options={{
                                       title: "Settings",
                                       tabBarLabel: "Settings",
                                    }}
                                 >
                                    {() => (
                                       <SettingsScreen setToken={setToken} />
                                    )}
                                 </Stack.Screen>
                              </Stack.Navigator>
                           )}
                        </Tab.Screen>
                     </Tab.Navigator>
                  )}
               </Stack.Screen>
            </Stack.Navigator>
         )}
      </NavigationContainer>
   );
}
