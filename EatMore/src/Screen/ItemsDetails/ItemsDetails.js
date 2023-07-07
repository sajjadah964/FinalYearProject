/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native'
import CustomHeader from '../../components/CustomHeader';
import * as Animatable from 'react-native-animatable';
import imagePath from '../../constants/imagePath';
import Colors from '../../styles/Colors';
import Checkbox from "react-native-checkbox";
import CustomPkgBtn from '../../components/CustomPkgBtn';
// import CustomHeader from '../../components/CustomHeader';
import { scale, moderateVerticalScale, moderateScale } from 'react-native-size-matters';
import NavigationStrings from '../../constants/NavigationStrings';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Loader from '../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const ItemsDetails = (props) => {
    console.log('item details in routes', props.route.params.detail);
    // console.log(props.index)
    // const{navigation}={props
    const [isLoading, setisLoading] = useState(true);
    const navigation = useNavigation()
    const { name, price, imageUrl, points, description, quantity } = props.route.params.detail.data;
    const { index } = props.route.params.index;
    const [count, setCount] = useState(0);
    const isFocused = useIsFocused();
    const [cartCount, setCartCount] = useState(0);
    const [isChecked, setChecked] = useState(false);
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);
    const moveToScreen = (screen) => {
        navigation.navigate(screen)
    }
    // LOADING CODE
    useEffect(() => {
        setTimeout(() => {
            setisLoading(false);
        }, 1000);
    }),
        [];
    let uid = '';
    const onAddToCart = async (item) => {
        uid = await AsyncStorage.getItem('USERID');
        const user = await firestore().collection('users').doc(uid).get();
        let tempCart = user._data.cart || []; // Initialize tempCart with existing cart items, or an empty array if it doesn't exist

        const existingItemIndex = tempCart.findIndex((itm) => itm.id === item.id);

        if (existingItemIndex !== -1) {
            // Item already exists in the cart, update its quantity
            tempCart[existingItemIndex].quantity += 1;
        } else {
            // Item does not exist in the cart, add it as a new item
            // item.quantity = 1; // Set the initial quantity to 1
            const additionalItems = [];

            if (isChecked1) {
                additionalItems.push({ id: item.id + '_additional_1', name: 'Pepsi', price: 50 });
            }
            if (isChecked2) {
                additionalItems.push({ id: item.id + '_additional_2', name: 'Coffee', price: 30 });
            }
            if (isChecked3) {
                additionalItems.push({ id: item.id + '_additional_3', name: 'Icecream', price: 100 });
            }
    
            const newItem = {
                ...item,
                additionalItems: additionalItems.length > 0 ? additionalItems : []
            };
    
            tempCart.push(newItem);
        }

        await firestore().collection('users').doc(uid).update({
            cart: tempCart,
        });

        getCartItems();
    };

    useEffect(() => {
        getCartItems();
    }, [isFocused]);

    const getCartItems = async () => {
        uid = await AsyncStorage.getItem('USERID');
        const user = await firestore().collection('users').doc(uid).get();
        // console.log("this is user11", user._data.cart.length)
        setCartCount(user._data.cart.length);
    };

    const handleCheckboxChange = () => {
        setChecked(!isChecked);
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {isLoading ? <Loader isLoading={isLoading} /> :
                <ScrollView>
                    <View style={styles.container}>
                        {/* <StatusBar backgroundColor='#009387' barStyle="light-content" /> */}
                        <View style={{ paddingHorizontal: moderateScale(26), flexDirection: 'row', justifyContent: 'space-between' }}>
                            <CustomHeader
                                leftImg={imagePath.icBack}
                            />
                            <TouchableOpacity
                                style={{ top: 20 }}
                                onPress={() => moveToScreen(NavigationStrings.ADD_TO_CART)}>
                                <View style={{}}>
                                    <Image
                                        source={imagePath.icShoppingCart}
                                        style={{ height: 35, width: 35, alignItems: 'center', tintColor: 'white' }}
                                    />
                                </View>
                                <View style={{ height: 24, width: 24, backgroundColor: 'white', borderRadius: 12, alignItems: 'center', justifyContent: 'center', bottom: 43, left: 23 }}>
                                    <Text style={{ color: 'black' }}>{cartCount}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.header}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                            }}>
                                <Animatable.Image
                                    animation="bounceIn"
                                    duraton="1500"
                                    source={{ uri: imageUrl }}
                                    style={styles.logo}
                                    resizeMode="stretch"
                                />
                            </View>
                        </View>
                        <Animatable.View
                            style={[styles.footer, {
                                backgroundColor: Colors.white
                            }]}
                            animation="fadeInUpBig"
                        >
                            <View style={{ marginBottom: 20 }}>
                                <Text style={[styles.itemNameStyle, {
                                    color: Colors.black
                                }]}>{name}</Text>
                                <Text style={styles.itemPriceStyle}>Rs.{price}</Text>
                                <Text style={styles.itemPointStyle}>{points} points</Text>
                                <Text style={styles.description}>
                                    {description}
                                </Text>
                            </View>
                            <View>
                                <View style={styles.check1}>
                                    <View style={styles.check}>
                                        {/* Checkbox 1 */}
                                        <Checkbox
                                            label=""
                                            // status={isChecked1 ? 'checked' : 'unchecked'}
                                            checked={isChecked1}
                                            onChange={() => setIsChecked1(!isChecked1)}
                                        />
                                        <Image source={require('../../assets/images/cola.png')} style={{ height: 24, width: 20, marginHorizontal: 5 }} />
                                        <Text style={styles.checkText}>Pepsi</Text>
                                    </View>
                                    <Text style={{ color: 'black', fontWeight: 'bold' }}>50Rs</Text>
                                </View>
                                <View style={styles.check1}>
                                    <View style={styles.check}>
                                        <Checkbox
                                            label=""
                                            status={isChecked2 ? 'checked' : 'unchecked'}
                                            checked={isChecked2}
                                            onChange={() => setIsChecked2(!isChecked2)}
                                        />
                                        <Image source={require('../../assets/images/cofee.png')} style={{ height: 24, width: 20, marginHorizontal: 5 }} />
                                        <Text style={styles.checkText}>Coffee</Text>
                                    </View>
                                    <Text style={{ color: 'black', fontWeight: 'bold' }}>30Rs</Text>
                                </View>
                                <View style={styles.check1}>
                                    <View style={styles.check}>
                                        {/* Checkbox 3 */}
                                        <Checkbox
                                            label=""
                                            // status={isChecked3 ? 'checked' : 'unchecked'}
                                            checked={isChecked3}
                                            onChange={() => setIsChecked3(!isChecked3)}
                                        />
                                        <Image source={require('../../assets/images/icecream.png')} style={{ height: 24, width: 20, marginHorizontal: 5 }} />
                                        {/* <Text>{isChecked ? 'Checked' : 'Unchecked'}</Text> */}
                                        <Text style={styles.checkText}>Icecream</Text>
                                    </View>
                                    <Text style={{ color: 'black', fontWeight: 'bold' }}>100Rs</Text>
                                </View>
                            </View>
                            <View style={styles.button}>
                                <View style={{ justifyContent: 'center', flex: 1 }}>
                                    <CustomPkgBtn
                                        onPress={() => { onAddToCart(props.route.params.detail, index) }}
                                        textStyle={{ ...styles.textStyle }}
                                        btnStyle={{ ...styles.btnStyle }}
                                        btnText={'Add to Cart'}
                                    />
                                </View>

                            </View>

                        </Animatable.View>
                    </View>
                </ScrollView>
            }
        </SafeAreaView>
    )
}

export default ItemsDetails;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.26;

const styles = StyleSheet.create({
    check1: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    checkText: {
        fontSize: 20,
        color: 'black',
    },
    check: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    labelStyle: {
        color: 'black',
        fontWeight: 'bold'
        // textTransform: 'capitalize'
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        color: 'red',
        marginRight: 10
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: 'gray',
        marginRight: 8,
    },
    checkedCheckbox: {
        backgroundColor: 'black',
        borderColor: 'black',
    },
    container: {
        flex: 1,
        backgroundColor: Colors.primaryColor,
    },
    header: {
        flex: 1.5,
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: moderateScale(30),
        borderTopRightRadius: moderateScale(30),
        paddingVertical: moderateVerticalScale(50),
        paddingHorizontal: moderateScale(30)
    },
    logo: {
        width: '40%',
        height: 160,
        marginBottom: 60
    },
    itemNameStyle: {
        color: '#000',
        fontSize: scale(24),
        fontWeight: '500'
    },
    itemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    itemPriceStyle: {
        color: 'black',
        marginTop: moderateVerticalScale(5),
        fontWeight: '500',
        fontSize: 20
    }, itemPointStyle: {
        color: 'black',
        marginTop: moderateVerticalScale(5),
        fontWeight: '300',
        fontSize: 20,
    },
    button: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: moderateVerticalScale(40),
        alignItems: 'center',
    },
    CounterView: {
        // flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    btnStyle: {
        // flex:1,
        // justifyContent: 'center',
        width: moderateScale(150),
        height: moderateScale(45),
        // backgroundColor: Colors.primaryColor,
        borderRadius: moderateScale(42),
        borderColor: Colors.primaryColor,
        borderWidth: moderateScale(1),
        marginBottom: 30
    },
    textStyle: {
        fontWeight: '400',
        fontSize: 16,
        color: 'black',
        fontStyle: 'normal',
    },
    description: {
        color: Colors.black,
        fontSize: 14,
        fontWeight: '500'
    },
})