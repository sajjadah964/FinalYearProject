/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View, Modal, Button, TouchableOpacity, FlatList } from 'react-native'
import CustomHeader from '../../components/CustomHeader'
import Colors from '../../styles/Colors'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import TextInputWithLabel from '../../components/TextinputWithLable'
import imagePath from '../../constants/imagePath'
import CustomPkgBtn from '../../components/CustomPkgBtn';
import CustomModal from '../../constants/CustomModal';
import { useNavigation } from '@react-navigation/native';
import NavigationStrings from '../../constants/NavigationStrings';
import Loader from '../../components/Loader';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { number } from 'prop-types';

let uid = '';
const Checkout = () => {
    const navigation = useNavigation();
    const [ModalVisible, setModalVisible] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const [cartList, setCartList] = useState([]);
    const [deliveryFess, setDeliveryFees] = useState(30);
    const [roomNumber, setroomNumber] = useState('');
    const [department, setDepartment] = useState('');
    const toggleModal = () => {
        setModalVisible(!ModalVisible);
    };
    useEffect(() => {
        setTimeout(() => {
            setisLoading(false);
        }, 1000);
    }),
        [];

    useEffect(() => {
        getCartItems();
    }, []);

    const getCartItems = async () => {
        setisLoading(true);
        try {
            const uid = await AsyncStorage.getItem('USERID');
            const userSnapshot = await firestore().collection('users').doc(uid).get();
            const user = userSnapshot.data();
            if (user && user.cart) {
                setCartList(user.cart);
            }
        } catch (error) {
            console.log("Error fetching cart items:", error);
        } finally {
            setisLoading(false);
        }
    };

    const getSubTotal = () => {
        let subTotal = 0;
        cartList.map(item => {
            subTotal = subTotal + item.data.quantity * item.data.price;
        });
        return subTotal;
    };
    const getTotalBill = () => {
        let totalBill = 0;
        totalBill = totalBill + getSubTotal() + deliveryFess;
        return totalBill;
    }
    const payNow = async () => {
        console.log("checkout cart list data ", cartList)
        try {
            const name = await AsyncStorage.getItem('NAME');
            const email = await AsyncStorage.getItem('EMAIL');
            const number = await AsyncStorage.getItem('NUMBER');
            uid = await AsyncStorage.getItem('USERID');
            navigation.navigate(NavigationStrings.ORDER_STATUS, {
                cartList: cartList,
                total: getTotalBill(),
                status: 'success',
                roomNumber: roomNumber,
                userDepartment: department,
                userName: name,
                userEmail: email,
                userMobile: number,
                uid: uid
            });
        } catch (error) {
            navigation.navigate(NavigationStrings.ORDER_STATUS, {
                status: 'failed',
            });
        }

    };


    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            <View style={styles.container}>
                <CustomHeader
                    leftImg={imagePath.icBack}
                    headerTitle={'Checkout'}
                    headerImgStyle={styles.headerImgStyle}
                />
                <View style={styles.mainContentView}>
                    <View>
                        <TextInputWithLabel
                            placeholder="Department Name"
                            value={department}
                            onChangeText={(department) => setDepartment(department)}
                        />
                        <TextInputWithLabel
                            placeholder="Room number"
                            value={roomNumber}
                            onChangeText={(roomNumber) => setroomNumber(roomNumber)}
                        />
                        <TouchableOpacity style={styles.paymentMethodView} activeOpacity={0.8} onPress={() => toggleModal()}>
                            <Text style={styles.paymentMethodText}>Cash on delivery</Text>
                        </TouchableOpacity>
                        <View style={styles.subtotal}>
                            <Text style={{ fontSize: 22, fontWeight: '600', color: 'black', marginBottom: 10 }}>Order Summary</Text>
                            <View style={styles.ItemHeadingView}>
                                <Text style={styles.headingStyle}>Item Name</Text>
                                <Text style={styles.headingStyle}> Qty</Text>
                                <Text style={styles.headingStyle}> Price</Text>
                            </View>
                            <View>
                                <FlatList
                                    data={cartList}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <View style={styles.nameView}>
                                                <View style={styles.ItemView}>
                                                    <Text style={[styles.totalPrice, { marginBottom: 0 }]}> {item.data.name}</Text>
                                                    <Text style={styles.totalPrice}> {item.data.quantity}</Text>
                                                    <Text style={styles.totalPrice}> {item.data.price * item.data.quantity}</Text>
                                                </View>
                                            </View>
                                        );
                                    }}
                                />
                            </View>

                            <View style={{ justifyContent: 'center' }}>
                                <View style={styles.totalPriceView}>
                                    <Text style={styles.total}>Total Price</Text>
                                    <Text style={styles.total}>{'Rs:' + getTotalBill()}</Text>
                                </View>
                                <View style={[styles.totalPriceView, { marginTop: -3 }]}>
                                    <Text style={styles.total}>Total Item</Text>
                                    <Text style={styles.total}>{cartList.length}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View>
                        <CustomPkgBtn
                            btnText={'Place Order'}
                            textStyle={{ ...styles.textStyle }}
                            btnStyle={{ ...styles.btnStyle }}
                            onPress={payNow}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: moderateScale(26),
        backgroundColor: '#FEFEFE'
    },
    mainContentView: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-evenly',
        // backgroundColor:'red'
    },
    headerImgStyle: {
        tintColor: Colors.black
    },
    inputStyle: {
        borderBottomWidth: 0,
        width: '100%',
        height: moderateScale(60),
        backgroundColor: '#EFEDED',
        borderRadius: moderateScale(8),
        marginBottom: moderateVerticalScale(15),
    },
    inlineInputStyle: {
        paddingHorizontal: moderateScale(16),
        fontSize: scale(16),
        color: 'rgba(0, 0, 0, 0.5)'
    },
    paymentMethodView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: moderateScale(60),
        backgroundColor: '#EFEDED',
        borderRadius: moderateScale(8),
        paddingHorizontal: moderateScale(16),
        marginBottom: moderateVerticalScale(30),
    },
    paymentMethodText: {
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: scale(16),
    },
    orderSummaryView: {
        marginBottom: moderateVerticalScale(23),
    },
    orderSummaryContent: {
        width: moderateScale(300),
        height: moderateScale(120),
        backgroundColor: '#EFEDED',
        borderRadius: moderateScale(8),
        paddingHorizontal: moderateVerticalScale(16),
        justifyContent: 'center',
    },
    singleContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    singleContentText: {
        fontSize: scale(15),
        fontWeight: '600',
        color: Colors.black
    },
    orderSummaryLabel: {
        fontSize: scale(16),
        fontWeight: '600',
        marginBottom: moderateVerticalScale(16),
        color: Colors.black
    },
    btnStyle: {
        width: moderateScale(200),
        height: moderateScale(48),
        backgroundColor: '#50379E',
        marginTop: moderateVerticalScale(26),
    },

    radioButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#000',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioSelected: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#000',
    },
    radioUnselected: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#fff',
    },
    paymentTextView: {
        width: moderateScale(200),
        height: moderateScale(40),
        borderRadius: moderateScale(10),
        borderWidth: 1,
        borderColor: Colors.primaryColor,
        padding: moderateScale(6)
    },
    paymentViewName: {
        fontWeight: '600',
        fontSize: scale(10),
        color: Colors.primaryColor,
        marginBottom: moderateVerticalScale(1)
    },
    paymentViewDesc: {
        fontWeight: '600',
        fontSize: scale(6),
        color: Colors.primaryColor,
    },

    totalPriceView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
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
        // flex:0.5,
        fontSize: scale(15),
        fontWeight: '500',
        color: 'rgba(0, 0, 0, 0.5)'
    },
    subtotal: {
        backgroundColor: 'rgba(239, 237, 237, 1)',
        padding: 15,
        borderRadius: 15,
    },
    ItemHeadingView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.32)',
        paddingVertical: 6,
        borderTopWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.32)',
    },
    headingStyle: {
        fontSize: 17,
        color: '#333',
        fontWeight: '700'
    },
    ItemView: {
        // flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor:'red',
    }

});

export default Checkout;
