/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
const OrderStatus = (props) => {
    const navigation = useNavigation();
    const {
        cartList,
        address,
        userName,
        userEmail,
        userMobile,
        uid,
        total,
    } = props.route.params;
    useEffect(() => {
        if (props.route.params.status == 'success') {
            placeOrder();
        }
    }, []);
    const placeOrder = async () => {
        // let tempOrders = [];
        let user = await firestore()
            .collection('users')
            .doc(props.route.params.uid)
            .get();
        // if (user._data && user._data.orders) {
        //     tempOrders = user._data.orders;
        // }
        // tempOrders.push({
        //     items: cartList,
        //     address: address,
        //     orderBy: userName,
        //     userEmail: userEmail,
        //     userMobile: userMobile,
        //     userId: uid,
        //     // orderTotal: total,
        // });
        firestore().collection('users').doc(uid).update({
            cart: [],
            // orders: tempOrders,
        });
        // firestore()
        //     .collection('orders')
        //     .set({
        //         data: {
        //             items: cartList,
        //             address: address,
        //             orderBy: userName,
        //             userEmail: userEmail,
        //             userMobile: userMobile,
        //             userId: uid,
        //             // orderTotal: total,
        //         },
        //         // orderBy: uid,
        //     });
    };
    return (
        <View style={styles.container}>
            <Image
                source={
                    props.route.params.status == 'success'
                        ? require('../../assets/images/success.gif')
                        : require('../../assets/images/failed.gif')
                }
                style={styles.icon}
            />
            <Text style={styles.msg}>
                {props.route.params.status == 'success'
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
