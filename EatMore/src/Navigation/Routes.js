/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationStrings from '../constants/NavigationStrings';
import auth from '@react-native-firebase/auth';
import AuthStack from './AuthStack';
import MainStack from './MainStack'

const Stack = createNativeStackNavigator();

function Routes() {
    const [user, setUser] = useState('')
    useEffect(() => {
        auth().onAuthStateChanged((userExist) => {
            if (userExist) {
                setUser(userExist)
            } else {
                setUser('')
            }
        })
    }, []);
    return (
        <NavigationContainer>
            {/* <Stack.Navigator
                screenOptions={{ presentation: 'card', headerShown: false }}
                initialRouteName={NavigationStrings.INITIAL_SCREEN}
            >
                {user ? MainStack(Stack) : AuthStack(Stack)}
                {MainStack(Stack)}
            </Stack.Navigator> */}
            <Stack.Navigator screenOptions={{ presentation: 'card', headerShown: false }}>
                {user ? (
                    <Stack.Screen name={NavigationStrings.MAIN_STACK} component={MainStack} />
                ) : (
                    <Stack.Screen name={NavigationStrings.AUTH_STACK} component={AuthStack} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;