/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useId } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ToastAndroid, Button, ScrollView } from 'react-native'
import CustomHeader from '../../components/CustomHeader';
import Colors from '../../styles/Colors';
import imagePath from '../../constants/imagePath';
import { moderateScale, scale, moderateVerticalScale } from 'react-native-size-matters';
import CustomPkgBtn from '../../components/CustomPkgBtn';
import NavigationStrings from '../../constants/NavigationStrings';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Loader from '../../components/Loader';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

let uid = '';
const AddToCart = () => {
    const isFocused = useIsFocused();
    const [cartList, setCartList] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [deliveryFess, setDeliveryFees] = useState(30);
    const navigation = useNavigation();

    useEffect(() => {
        getCartItems();
    }, [isFocused]);
    const getCartItems = async () => {
        setisLoading(true);
        uid = await AsyncStorage.getItem('USERID');
        const user = await firestore().collection('users').doc(uid).get();
        setCartList(user._data.cart);
        setisLoading(false);
    };

    const addItem = async (item, index) => {
        console.log("add item to cart")
        console.log("add item to cart")
        console.log("add item to cart")
        console.log(item)
        const user = await firestore().collection('users').doc(uid).get();
        console.log(user._data.cart);
        let tempCart = [];
        tempCart = user._data.cart; // Initialize tempCart with existing cart items, or an empty array if it doesn't exist
        console.log(tempCart)
        let existingItemIndex = tempCart.findIndex(itm => itm.id === item.id);
        if (existingItemIndex !== -1) {
            // Item already exists in the cart, update its quantity
            tempCart[existingItemIndex].data.quantity += 1;
        }
        firestore().collection('users').doc(uid).update({
            cart: tempCart,
        });
        getCartItems();

        console.log("add item to cart")
        console.log("add item to cart")
        console.log("add item to cart")
    };

    const removeItem = async item => {
        const user = await firestore().collection('users').doc(uid).get();
        console.log(user._data);
        let tempCart = [];
        tempCart = user._data.cart; // Initialize tempCart with existing cart items, or an empty array if it doesn't exist

        let existingItemIndex = tempCart.findIndex(itm => itm.id === item.id);

        if (existingItemIndex !== -1) {
            // Item already exists in the cart, update its quantity
            tempCart[existingItemIndex].data.quantity -= 1;
        }
        firestore().collection('users').doc(uid).update({
            cart: tempCart,
        });

        getCartItems();
    };
    const deleteItem = async index => {
        const user = await firestore().collection('users').doc(uid).get();
        let tempCart = [];
        tempCart = user._data.cart;
        tempCart.splice(index, 1);
        ToastAndroid.show('Item deleted from the cart', ToastAndroid.SHORT);
        firestore().collection('users').doc(uid).update({
            cart: tempCart,
        });
        getCartItems();
    };
    const getSubTotal = () => {
        let subTotal = 0;
      
        if (!cartList || !Array.isArray(cartList)) {
          return subTotal; // Return 0 if cartList is undefined or not an array
        }
      
        cartList.forEach(item => {
          let additionalItemsTotal = 0;
      
          if (item.additionalItems && item.additionalItems.length > 0) {
            item.additionalItems.forEach(additionalItem => {
              additionalItemsTotal += additionalItem.price;
            });
          }
      
          const itemTotal = item.data.quantity * item.data.price + additionalItemsTotal;
          subTotal += itemTotal;
        });
      
        return subTotal;
      };
    const getTotalBill = () => {
        let totalBill = 0;
        totalBill = totalBill + getSubTotal() + deliveryFess;
        return totalBill;
    }

    const moveToScreen = (screen) => {
        navigation.navigate(screen)
    }
    const renderItem = ({ item, index }) => {
        console.log('this is the add cart item', item)
        console.log(item.data.imageUrl)
        return (
            <View style={{
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(239, 237, 237, 1)',
                padding: 5,
                borderRadius: 10
            }}>
                <View style={styles.itemImageStyle}>
                    <Animatable.Image
                        source={{ uri: item.data.imageUrl }}
                        resizeMode="stretch"
                        animation="bounce"
                        duraton="2000"
                        style={{ width: 70, height: 70, borderRadius: 10 }}
                    />
                </View>

                <View style={styles.cartItemFlex}>
                    <View style={{
                    }}>
                        <Text style={styles.cartItemNameStyle}>{item.data.name}</Text>
                        <Text style={styles.cartItemPriceStyle}>Rs.{item.data.price}</Text>
                        {/* <Text style={styles.cartItemPriceStyle}>Rs.{item.}</Text> */}
                       {item.additionalItem ?
                        <View style={{ flexDirection: 'row' }}>
                        {item.additionalItems.map((additionalItem, additionalIndex) => (
                            <View key={additionalIndex} style={styles.additionalItemContainer}>
                                <Text style={styles.additionalItemName}>{additionalItem.name}</Text>
                                <Text style={styles.additionalItemPrice}>Rs.{additionalItem.price}</Text>
                            </View>
                        ))}
                    </View> 
                    :null

                       }
                        <View style={styles.CounterView}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                    if (item.data.quantity > 1) {
                                        removeItem(item);
                                    } else {
                                        deleteItem(index);
                                    }
                                }}
                            >
                                <Image
                                    style={styles.counterImgStyle}
                                    source={imagePath.icMinus}
                                />
                            </TouchableOpacity>
                            <Text style={{
                                marginHorizontal: moderateScale(10),
                                fontSize: scale(20),
                                fontWeight: '400',
                            }}>{item.data.quantity}</Text>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                    addItem(item);
                                }}
                            >
                                <Image
                                    style={styles.counterImgStyle}
                                    source={imagePath.icPLus}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => deleteItem(index)}
                    >
                        <Image
                            style={{ height: 25, width: 25, top: 3, right: 7 }}
                            source={imagePath.icDeleteCart}
                            resizeMode="stretch"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Loader isLoading={isLoading} />
            <View style={styles.container}>
                <CustomHeader
                    leftImg={imagePath.icBack}
                    headerTitle={'Items in Cart'}
                    headerImgStyle={styles.headerImgStyle}
                />
                <ScrollView
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}

                >
                    <View style={styles.cartItemStyle}>
                        <FlatList
                            data={cartList}
                            renderItem={renderItem}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={() => <View style={{ marginBottom: moderateScale(20) }} />}
                        />
                    </View>

                    {cartList.length > 0 ?
                        <View style={{ flex: 0.5, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 22, fontWeight: '600', color: 'black', marginBottom: 10 }}>Order Summary</Text>
                            <View style={styles.subtotal}>
                                <View style={styles.totalPriceView}>
                                    <Text style={styles.totalPriceHeading}>Total Items</Text>
                                    <Text style={styles.totalPrice}> {cartList.length}</Text>
                                </View>
                                <View style={styles.totalPriceView}>
                                    <Text style={styles.totalPriceHeading}>Subtotal</Text>
                                    <Text style={styles.totalPrice}> {'Rs:' + getSubTotal()}</Text>
                                </View>
                                <View style={styles.totalPriceView}>
                                    <Text style={styles.totalPriceHeading}>Delivery Fee</Text>
                                    <Text style={styles.totalPriceHeading}>{deliveryFess}</Text>
                                </View>
                                <View style={styles.totalPriceView}>
                                    <Text style={styles.total}>Total</Text>
                                    <Text style={styles.total}>{'Rs:' + getTotalBill()}</Text>
                                </View>
                                {/* <Text style={styles.totalPrice}> {'Items(' + cartList.length + ')\nPrice:' + getTotal()}</Text> */}
                            </View>
                            <CustomPkgBtn
                                onPress={() => { moveToScreen(NavigationStrings.CHECKOUT) }}
                                textStyle={{ ...styles.textStyle }}
                                btnStyle={{ ...styles.btnStyle }}
                                btnText={'Checkout'}
                            />
                        </View>
                        : null
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default AddToCart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: moderateScale(26),
        backgroundColor: '#FEFEFE'
    },
    headerImgStyle: {
        tintColor: Colors.black,
    },
    cartItemStyle: {
        flex: 1,
        marginBottom: 40,
    },
    CounterView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: moderateScale(70),
    },
    cartItemNameStyle: {
        fontSize: scale(18),
        fontWeight: '500',
        color: Colors.black,
    },
    cartItemPriceStyle: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: scale(18),
        fontWeight: '500',
    },
    itemImageStyle: {
        flex: 0.4,
        borderRadius: moderateScale(15),
        width: '100%',
        height: moderateScale(90),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: moderateScale(15),
    },
    counterImgStyle: {
        width: moderateScale(18),
        height: moderateScale(18)
    },
    cartItemFlex: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    totalPriceView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.32)',
        marginBottom: 10,
    },
    totalPriceHeading: {
        fontSize: scale(15),
        fontWeight: '400',
        color: 'rgba(0, 0, 0, 0.5)',
    },
    total: {
        color: 'rgba(71, 45, 156, 1)',
        fontSize: 18,
        fontWeight: '600'
    },
    totalPrice: {
        fontSize: scale(15),
        fontWeight: '500',
        color: 'rgba(0, 0, 0, 0.5)'
    },
    subtotal: {
        backgroundColor: 'rgba(239, 237, 237, 1)',
        padding: 15,
        borderRadius: 15,
    },
    btnStyle: {
        width: moderateScale(200),
        height: moderateScale(48),
        backgroundColor: '#50379E',
        marginTop: moderateVerticalScale(26),
    },
    additionalItemContainer: {
        flexDirection: 'column',
        marginRight: 10,
      },
      additionalItemName: {
        fontWeight: 'bold',
        marginRight: 5,
      },
      additionalItemPrice: {
        color: 'gray',
      },
})