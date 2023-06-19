/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
const Orders = () => {
    const [orderList, setOrderList] = useState([]);
    useEffect(() => {
        getOrders();
    }, []);
    const getOrders = async () => {
        const uid = await AsyncStorage.getItem('USERID');
        // console.log(uid)
        const user = await firestore().collection('users').doc(uid).get();
        console.log("this is the order info", JSON.stringify(user._data.ordersInfo));
        setOrderList(user._data.ordersInfo);
    };

    return (
        <View style={styles.container}>
            <View style={styles.orderHeaderView}>
                <Text style={styles.headerText}>My Orders</Text>
            </View>
            <FlatList
                data={orderList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.orderItem}>
                        <Text style={styles.orderText}>
                            {item.orderDateTime}
                        </Text>
                        <FlatList
                            data={item.items}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.itemView}>
                                    <Image
                                        source={{ uri: item.data.imageUrl }}
                                        style={styles.itemImage}
                                    />
                                    <View>
                                        <Text style={styles.nameText}>{item.data.name}</Text>
                                        <Text style={styles.detailsText}>
                                            {'Price: ' + item.data.price + ', Qty: ' + item.data.quantity+ ', Points: ' + item.data.points}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                )}
            />
        </View>
    );
};

export default Orders;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerText: {
        fontSize: 24,
        fontWeight: '500',
        color: 'black',
    },
    orderHeaderView: {
        height: 60,
        backgroundColor: '#fff',
        padding: 10,
        elevation: 3,
        justifyContent: 'center',
    },
    orderItem: {
        width: '90%',
        borderRadius: 10,
        elevation: 5,
        alignSelf: 'center',
        backgroundColor: '#fff',
        marginTop: 20,
        marginBottom: 10,
    },
    orderText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginLeft: 20,
        marginTop: 10,
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    itemView: {
        margin: 10,
        width: '100%',
        flexDirection: 'row',
        padding:5
    },
    nameText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginLeft: 20,
        marginTop: 5,
    },
    detailsText: {
        fontSize: 14,
        color: '#000',
        marginLeft: 20,
        marginTop: 5,
    },
});