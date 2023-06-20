/* eslint-disable prettier/prettier */
import React from "react";
import NavigationStrings from "../constants/NavigationStrings";
import { AllOrder, Checkout, Home, ItemsDetails, OrderInformation, OrderStatus, } from "../Screen";
import Main from "../tabs/Main/Main";
import AddToCart from "../tabs/AddToCart/AddToCart";
import Profile from "../tabs/Profile/Profile";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function MainStack() {
    console.log("this is my mainstack file")
    return (
        <Stack.Navigator screenOptions={{ presentation: 'card', headerShown: false }}>

            <Stack.Screen
                name={NavigationStrings.HOME}
                component={Home}
            />
            <Stack.Screen
                name={NavigationStrings.MAIN}
                component={Main}
            />
            <Stack.Screen
                name={NavigationStrings.ADD_TO_CART}
                component={AddToCart}
            />
            <Stack.Screen
                name={NavigationStrings.PROFILE}
                component={Profile}
            />

            <Stack.Screen
                name={NavigationStrings.ITEMS_DETAILS}
                component={ItemsDetails}
            />
            <Stack.Screen
                name={NavigationStrings.CHECKOUT}
                component={Checkout}
            />
            <Stack.Screen
                name={NavigationStrings.ORDER_INFORMATION}
                component={OrderInformation}
            />
            <Stack.Screen
                name={NavigationStrings.ALL_ORDER}
                component={AllOrder}
            />
            <Stack.Screen
                name={NavigationStrings.ORDER_STATUS}
                component={OrderStatus}
            />
        </Stack.Navigator>
    )

}