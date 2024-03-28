import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import { createStackNavigator } from "@react-navigation/stack";
import {
 ApolloClient,
 ApolloLink,
 HttpLink,
 InMemoryCache,
} from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";

import Home from "./src/screens/home";
import CreateRecording from "./src/screens/create-recording";
import CreateAccount from "./src/screens/create-account";
import Login from "./src/screens/login";
import { getToken, USER_TOKEN_KEY } from "./src/utils";

const headerTitleStyle = {
 fontSize: 17,
 color: "#fff",
 fontWeight: "normal",
};

export default function App() {
 const [token, setToken] = useState(null);
 const Stack = createStackNavigator();

 useEffect(() => {
   (async function () {
     const data = await getToken(USER_TOKEN_KEY);
     setToken(data);
   })();
 }, []);

 const client = new ApolloClient({
   cache: new InMemoryCache(),
   link: ApolloLink.from([
     new HttpLink({
       # Replace this with an environment variable containing the URL to your deployed Strapi API
       uri: "http://localhost::1337/graphql",
       headers: token
         ? {
             Authorization: `Bearer ${token.jwt}`,
           }
         : null
     }),
   ]),
 });

 return (
   <NavigationContainer>
     <ApolloProvider client={client}>
       <StatusBar style="auto" />

       <Stack.Navigator>
         <Stack.Screen
           options={{
             title: "Login",
             headerShown: false,
             headerTitleStyle,
             headerLeftContainerStyle: {
               color: "#fff",
             },
             headerStyle: {
               backgroundColor: "#8c4bff",
             },
           }}
           name="login"
           component={Login}
         />

         <Stack.Screen
           options={{
             title: "CreateAccount",
             headerTitleStyle,
             headerShown: false,
             headerLeftContainerStyle: {
               color: "#fff",
             },
             headerStyle: {
               backgroundColor: "#8c4bff",
             },
           }}
           name="create-account"
           component={CreateAccount}
         />

         <Stack.Screen
           options={{
             headerStyle: {
               backgroundColor: "#8c4bff",
             },
             headerLeft: null,
             title: "My Recordings",
             headerTitleStyle,
           }}
           name="home"
           component={Home}
         />
         <Stack.Screen
           options={{
             title: "New Recording",
             headerTitleStyle,
             headerLeftContainerStyle: {
               color: "#fff",
             },
             headerStyle: {
               backgroundColor: "#8c4bff",
             },
           }}
           name="CreateRecording"
           component={CreateRecording}
         />
       </Stack.Navigator>
     </ApolloProvider>
   </NavigationContainer>
 );
}  