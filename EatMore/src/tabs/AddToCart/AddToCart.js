import React, { useState, useEffect } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import CustomHeader from '../../components/CustomHeader';
import Colors from '../../styles/Colors';
import TopItemList from './TopItemList';
import imagePath from '../../constants/imagePath';
import { moderateScale, scale, moderateVerticalScale } from 'react-native-size-matters';
import CustomPkgBtn from '../../components/CustomPkgBtn';
import NavigationStrings from '../../constants/NavigationStrings';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Loader from '../../components/Loader';

const AddToCart = () => {
    const [count, setCount] = useState(0);
    const [isLoading, setisLoading] = useState(true);
    const navigation = useNavigation()
    const counter = (type) => {
        if (type == "increment") {
            setCount(count + 1)
        } else if (type == "decrement" && count > 0) {
            setCount(count - 1)
        }
    }
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
    const renderItem = ({ item, index }) => {
        return (
            <View style={{
                // flex: 1,
                // backgroundColor: 'blue',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <View style={styles.itemImageStyle}>
                    <Animatable.Image
                        source={imagePath.icCartBurger}
                        resizeMode="stretch"
                        animation="bounce"
                        duraton="2000"
                    />
                </View>
                <View style={styles.cartItemFlex}>
                    <View style={{
                    }}>
                        <Text style={styles.cartItemNameStyle}>{item.itemName}</Text>
                        <Text style={styles.cartItemPriceStyle}>Rs.{item.itemPrice}</Text>
                        <View style={styles.CounterView}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => counter('decrement')}
                            >
                                <Image
                                    style={styles.counterImgStyle}
                                    source={imagePath.icMinus}
                                // resizeMode="contain"
                                />
                            </TouchableOpacity>
                            <Text style={{
                                marginHorizontal: moderateScale(10),
                                fontSize: scale(20),
                                fontWeight: '400',
                            }}>{count}</Text>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => counter('increment')}
                            >
                                <Image
                                    style={styles.counterImgStyle}

                                    source={imagePath.icPLus}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => alert('delte')}
                    >
                        <Image
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
            {isLoading ? <Loader isLoading={isLoading} /> :
                <View style={styles.container}>
                    <CustomHeader
                        leftImg={imagePath.icBack}
                        headerTitle={'Items in Cart'}
                        headerImgStyle={styles.headerImgStyle}
                    />
                    {/* <View style={{ }}> */}
                    <View style={styles.cartItemStyle}>
                        <FlatList
                            data={TopItemList}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={() => <View style={{ marginBottom: moderateScale(20) }} />}
                        />
                    </View>

                    <View style={{ flex: 0.5, justifyContent: 'center' }}>
                        <View style={styles.totalPriceView}>
                            <Text style={styles.totalPriceHeading}>Total</Text>
                            <Text style={styles.totalPrice}>Rs.400</Text>
                        </View>
                        <CustomPkgBtn
                            onPress={() => { moveToScreen(NavigationStrings.CHECKOUT) }}
                            textStyle={{ ...styles.textStyle }}
                            btnStyle={{ ...styles.btnStyle }}
                            btnText={'Checkout'}
                        />
                    </View>
                    {/* </View> */}
                </View>

            }
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
        tintColor: Colors.black
    },
    cartItemStyle: {
        flex: 1,
        // backgroundColor:'blue'
    },
    CounterView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: moderateScale(70),
    },
    cartItemNameStyle: {
        fontSize: scale(20),
        fontWeight: '500',
        color: Colors.black,
    },
    cartItemPriceStyle: {
        color: Colors.primaryColor,
        fontSize: scale(20),
        fontWeight: '500',
    },
    itemImageStyle: {
        flex: 0.5,
        borderRadius: moderateScale(15),
        backgroundColor: '#D9D9D9',
        width: '100%',
        height: moderateScale(90),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: moderateScale(15),
    },
    counterImgStyle: {
        width: moderateScale(17),
        height: moderateScale(17)
    },
    cartItemFlex: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    totalPriceView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    totalPriceHeading: {
        fontSize: scale(20),
        fontWeight: '600',
        color: Colors.black
    },
    totalPrice: {
        fontSize: scale(20),
        fontWeight: '600',
        color: Colors.primaryColor
    },
    btnStyle: {
        width: moderateScale(200),
        height: moderateScale(48),
        backgroundColor: '#50379E',
        marginTop: moderateVerticalScale(26),
    },
})