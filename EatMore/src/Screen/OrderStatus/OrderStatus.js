/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
const OrderStatus = (props) => {
    const navigation = useNavigation();
    const options = { timeZone: 'Asia/Karachi' };
    const pakistanDate = new Date().toLocaleString('en-US', options);
    const {
        cartList,
        roomNumber,
        userName,
        userEmail,
        userMobile,
        userDepartment,
        status,
        uid,
        total,
    } = props.route.params;
    console.log("list items",cartList);
    console.log("list room number",roomNumber);
    console.log("list department",userDepartment);
    console.log("list name",userName);
    console.log("list email",userEmail);
    console.log("list mobile",userMobile);
    console.log("list total",total);
    console.log("list uid",uid);
    useEffect(() => {
        if (status == 'success') {
            placeOrder();
        }
    }, []);
    const placeOrder = async () => {
        let tempOrders = [];
        tempOrders.push({
            items:cartList,
            cabinNumber:roomNumber,
            Department:userDepartment,
            Email:userEmail,
            orderBy:uid,
            Mobile:userMobile,
            Name:userName,
            totalPrice:total,
            orderDateTime: pakistanDate,
        })
        firestore().collection('users').doc(uid).update({
            cart: [],
            ordersInfo: tempOrders,
        });
        firestore()
      .collection('orders')
      .add({
        data: {
            items:cartList,
            cabinNumber:roomNumber,
            Department:userDepartment,
            Email:userEmail,
            uid:uid,
            Mobile:userMobile,
            Name:userName,
            totalPrice:total,
            orderDateTime: pakistanDate,
        },
        orderBy: uid,
      });
    };
    return (
        <View style={styles.container}>
            <Image
                source={
                    status == 'success'
                        ? require('../../assets/images/success.gif')
                        : require('../../assets/images/failed.gif')
                }
                style={styles.icon}
            />
            <Text style={styles.msg}>
                {status == 'success'
                    ? 'Order Placed Successfully !!'
                    : 'Order Failed !!'}
            </Text>
            <TouchableOpacity
                style={styles.backToHome}
                onPress={() => {
                    navigation.navigate('Home');
                }}>
                <Text>Go To Home</Text>
            </TouchableOpacity>
        </View>
    );
};

export default OrderStatus;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: '70%',
        height: '40%',
        alignSelf: 'center',
    },
    msg: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
        marginTop: -50,
    },
    backToHome: {
        width: '50%',
        height: 50,
        borderWidth: 0.5,
        marginTop: 30,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
