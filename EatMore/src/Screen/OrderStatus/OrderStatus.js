/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../styles/Colors';
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
        const order = {
            items: cartList,
            cabinNumber: roomNumber,
            Department: userDepartment,
            Email: userEmail,
            orderBy: uid,
            Mobile: userMobile,
            Name: userName,
            totalPrice: total,
            orderDateTime: pakistanDate,
          };
        
          // Retrieve the current ordersInfo array from Firestore
          const userDoc = await firestore().collection("users").doc(uid).get();
          const currentOrdersInfo = userDoc.data()?.ordersInfo || [];
        
          // Append the new order to the existing ordersInfo array if cartList is not empty
          const updatedOrdersInfo = cartList.length > 0 ? [...currentOrdersInfo, order] : currentOrdersInfo;
        
          // Update the user document in Firestore with the updated ordersInfo array
          await firestore().collection("users").doc(uid).update({
            cart: [],
            ordersInfo: updatedOrdersInfo,
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
                <Text style={{color:Colors.primaryColor}}>Go To Home</Text>
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
