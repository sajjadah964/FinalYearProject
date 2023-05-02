/* eslint-disable prettier/prettier */
import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './MainStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationStrings from '../constants/NavigationStrings';

const Stack = createNativeStackNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ presentation: 'card', headerShown: false }}
                initialRouteName={NavigationStrings.LOGIN}
            >
                {/* {user ? MainStack(Stack) : AuthStack(Stack)} */}
                {MainStack(Stack)}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;