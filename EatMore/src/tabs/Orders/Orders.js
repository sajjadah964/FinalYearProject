/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, FlatList, Image,RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
const Orders = () => {
    const [orderList, setOrderList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    useEffect(() => {
        getOrders();
    }, []);
    const getOrders = async () => {
        setRefreshing(true);
        const uid = await AsyncStorage.getItem('USERID');
        const user = await firestore().collection('users').doc(uid).get();
        console.log("this is the order info", JSON.stringify(user._data.ordersInfo));
        setOrderList(user._data.ordersInfo);
        setRefreshing(false);
    };
    const handleRefresh = () => {
        if (!refreshing) {
            getOrders();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.orderHeaderView}>
                <Text style={styles.headerText}>My Orders</Text>
            </View>
            <View style={{ marginBottom: 150 }}>
                <FlatList
                    data={orderList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.orderItem}>
                            <Text style={styles.orderText}>
                                {item.orderDateTime}
                            </Text>
                            <Text style={styles.orderText}>
                                {'Price: ' + item.totalPrice}
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
                                                {'Qty: ' + item.data.quantity + ', Points: ' + item.data.points}
                                            </Text>
                                        </View>
                                    </View>
                                )}
                            />
                            {item.items[0].additionalItems ? (
                                <View style={styles.rowContainer}>
                                    {item.items[0].additionalItems.map((additionalItem) => (
                                        <View style={styles.additionalItemContainer} key={additionalItem.id}>
                                            <Text style={styles.additionalItemName}>{additionalItem.name}</Text>
                                            {/* <Text style={styles.additionalItemPrice}>{additionalItem.price}</Text> */}
                                        </View>
                                    ))}
                                </View>
                            ) : null}
                        </View>
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                        />
                    }
                />
            </View>
        </View >
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
        padding: 5
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
    rowContainer: {
        flexDirection: 'row',
        marginLeft: 76,
        marginBottom: 10,
      },
    additionalItemName: {
        fontSize: 14,
        color: '#000',
        marginLeft:10
    },
    additionalItemPrice: {
        fontSize: 14,
        color: '#abcabc',
        marginLeft: 10,
    },
});