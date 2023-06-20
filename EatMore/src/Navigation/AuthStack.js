/* eslint-disable prettier/prettier */
import React from "react";
import NavigationStrings from "../constants/NavigationStrings";
import { Login, ResetPassword, Signup, SplashScreen } from "../Screen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function AuthStack() {
    console.log("this is my authstack file")
    return (
        <Stack.Navigator screenOptions={{ presentation: 'card', headerShown: false }} initialRouteName={NavigationStrings.SPLASH_SCREEN}>
            <Stack.Screen
                name={NavigationStrings.SPLASH_SCREEN}
                component={SplashScreen}
            />
            <Stack.Screen
                name={NavigationStrings.LOGIN}
                component={Login}
            />
            <Stack.Screen
                name={NavigationStrings.SIGNUP}
                component={Signup}

            />
            <Stack.Screen
                name={NavigationStrings.RESET_PASSWORD}
                component={ResetPassword}
            />
        </Stack.Navigator>
    )

}