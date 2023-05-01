import React from "react";
import NavigationStrings from "../constants/NavigationStrings";
import { AllOrder, Checkout, Home, InitialScreen, ItemsDetails, Login, OrderInformation, Signup, } from "../Screen";
import Main from "../tabs/Main/Main";
import Search from "../tabs/Search/Search";
import AddToCart from "../tabs/AddToCart/AddToCart";
import Profile from "../tabs/Profile/Profile";
export default function (Stack) {
    return (
        <>
        {/* INITIAL SCREEN  */}
            <Stack.Screen
                name={NavigationStrings.LOGIN}
                component={Login}
            />
            <Stack.Screen
                name={NavigationStrings.HOME}
                component={Home}
            />
            <Stack.Screen
                name={NavigationStrings.INITIAL_SCREEN}
                component={InitialScreen}
            />
            <Stack.Screen
                name={NavigationStrings.SIGNUP}
                component={Signup}
            />
            <Stack.Screen
                name={NavigationStrings.MAIN}
                component={Main}
            />
            <Stack.Screen
                name={NavigationStrings.SEARCH}
                component={Search}
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
        </>
    )

}