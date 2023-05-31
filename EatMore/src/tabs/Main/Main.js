/* eslint-disable prettier/prettier */
import React, { useState, useContext, useEffect } from 'react';
import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from 'react-native';
import { moderateScale, scale, moderateVerticalScale } from 'react-native-size-matters';
import imagePath from '../../constants/imagePath';
import TextInputWithLabel from '../../components/TextinputWithLable';
import Colors from '../../styles/Colors';
import NavigationStrings from '../../constants/NavigationStrings';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Loader from '../../components/Loader';
import auth from '@react-native-firebase/auth';
import CustomPkgBtn from '../../components/CustomPkgBtn';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const numColumns = 2;
const Main = () => {
    const [isLoading, setisLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setisLoading(false);
        }, 1000);
    }, []);
    const navigation = useNavigation()
    const isFocused = useIsFocused();
    const [setIsFocused] = useState(false);
    const [selectedItem, setSelectedItem] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const [items, setItems] = useState([]);
    const buttons = [
        {
            id: 1,
            title: 'Recent Items'
        },
        {
            id: 2,
            title: 'Burger'
        },
        {
            id: 3,
            title: 'Pizza'
        }
    ]
    let uid = '';
    useEffect(() => {
        firestore()
            .collection('items')
            .get()
            .then(querySnapshot => {
                console.log('Total users: ', querySnapshot.size);
                let tempData = [];
                querySnapshot.forEach(documentSnapshot => {
                    console.log(
                        'User ID: ',
                        documentSnapshot.id,
                        documentSnapshot.data(),
                    );
                    tempData.push({
                        id: documentSnapshot.id,
                        data: documentSnapshot.data(),
                    });
                });
                setItems(tempData);
            });
        // Stop listening for updates when no longer required
        // return () => subscriber();
    }, []);
    
    useEffect(() => {
        getCartItems();
    }, [isFocused]);

    const getCartItems = async () => {
        uid = await AsyncStorage.getItem('USERID');
        const user = await firestore().collection('users').doc(uid).get();
        setCartCount(user._data.cart.length);
    };
    //   const onAddToCart = async (item, index) => {
    //     console.log("this is the new item",item.data)
    //             uid = await AsyncStorage.getItem('USERID');
    //             console.log(uid);
    //     const user = await firestore().collection('users').doc(uid).get();
    //     console.log(user._data);
    //     let tempCart = [];
    //     tempCart = user._data.cart;
    //     if (tempCart.length > 0) {
    //         let existing = false;
    //         // tempCart.push(item);
    //         tempCart.map(itm => {
    //           if (itm.id == item.id) {
    //             existing = true;
    //             itm.data.quantity = itm.data.quantity + 1;
    //           }
    //         });
    //         if (existing == false) {
    //           tempCart.push(item);
    //         }
    //         firestore().collection('users').doc(uid).update({
    //           cart: tempCart,
    //         });
    //     }
    //     else{
    //         tempCart.push(item);
    //     }
    //     firestore().collection('users').doc(uid).update({
    //         cart:tempCart
    //     });
    //     getCartItems();
    //   };

    const onAddToCart = async (item, index) => {
        console.log("this is the new item", item.data);
        uid = await AsyncStorage.getItem('USERID');
        console.log(uid);
        const user = await firestore().collection('users').doc(uid).get();
        console.log(user._data);
        let tempCart = [];
        tempCart = user._data.cart; // Initialize tempCart with existing cart items, or an empty array if it doesn't exist

        let existingItemIndex = tempCart.findIndex(itm => itm.id === item.id);

        if (existingItemIndex !== -1) {
            // Item already exists in the cart, update its quantity
            tempCart[existingItemIndex].data.quantity += 1;
        } else {
            // Item does not exist in the cart, add it as a new item
            tempCart.push(item);
        }

        firestore().collection('users').doc(uid).update({
            cart: tempCart,
        });

        getCartItems();
    };

    const selectCategory = (index) => {
        setSelectedIndex(index)
    }

    const getButtonStyle = (index) => {
        if (index === selectedIndex) {
            return styles.selectedButton;
        } else {
            return styles.unselectedButton;
        }
    };

    const logoutData = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to Logout!',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => logout(),
                    style: 'cancel',
                },
            ],
            { cancelable: false }
        );
    }
    const logout = async () => {
        auth()
            .signOut()
            .then(() => {
                ToastAndroid.show('Logout Succcessfully', ToastAndroid.SHORT);
                navigation.navigate(NavigationStrings.MAIN_STACK, { screen: NavigationStrings.LOGIN });

            });
    }
    const onFocus = () => {
        setIsFocused(true)
        return (
            { backgroundColor: 'red', paddingHorizontal: 20 }
        )
    }
    const goToDetails = (item, index) => {
        // console.log('item details',detail);
        navigation.navigate(NavigationStrings.ITEMS_DETAILS, {
            detail: item,
            index, index
        });
    }
    const moveToScreen = (screen) => {
        navigation.navigate(screen)
    }
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        firestore()
            .collection('items')
            .get()
            .then(querySnapshot => {
                console.log('Total users: ', querySnapshot.size);
                let tempData = [];
                querySnapshot.forEach(documentSnapshot => {
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    tempData.push({
                        id: documentSnapshot.id,
                        data: documentSnapshot.data(),
                    })
                });
                setItems(tempData);
            });
    }
    const topItemList = ({ item, index }) => {
        // console.log(item, 'top item list')
        return (
            <TouchableOpacity
                style={[styles.mainTopItemView, (index + 1) % 2 === 0 ? { marginRight: 0 } : null]}
                onPress={() => goToDetails(item, index)}
                activeOpacity={0.7}
            >
                <View style={styles.singleItem}>
                    <View style={{ alignItems: 'center' }}>
                        <Animatable.Image
                            source={{ uri: item.data.imageUrl }}
                            duraton="1500"
                            animation="bounce"
                            style={{ width: 100, height: 100, marginBottom: 10 }}
                        />
                    </View>
                    <View style={{
                        paddingHorizontal: moderateScale(15)
                    }}>
                        <Text style={styles.itemNameStyle}>{item.data.name}</Text>
                        <Text style={styles.itemPriceStyle}>Rs.{item.data.price}</Text>
                        <View style={styles.itemPriceDetail}>
                            <Text style={[styles.itemStyle, {}]}>Points: {item.data.points}</Text>
                            <TouchableOpacity style={styles.addToCart} onPress={() => { onAddToCart(item, index) }}>
                                <Image source={require('../../assets/images/add-to-cart.png')}
                                />
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {isLoading ? <Loader isLoading={isLoading} /> :
                <View style={styles.container}>
                    <View style={styles.homeHeaderView}>
                        <TouchableOpacity
                            onPress={() => logoutData()}
                            activeOpacity={0.7}>
                            {/* <Text style={styles.headerTitleStyle}>Logut</Text> */}
                            <Image
                                source={imagePath.icUserProfileLogo}
                                style={{ height: 35, width: 35 }}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{}}
                            onPress={() => moveToScreen(NavigationStrings.ADD_TO_CART)}>
                            <View style={{}}>
                                <Image
                                    source={imagePath.icShoppingCart}
                                    style={{ height: 35, width: 35, alignItems: 'center',}}
                                />
                            </View>
                            <View style={{ height: 24, width: 24, backgroundColor: 'red', borderRadius: 12, alignItems: 'center', justifyContent: 'center', bottom: 43, left: 23 }}>
                                <Text style={{ color: 'white' }}>{cartCount}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.searchView}>
                        <TextInputWithLabel
                            placeHolder='Search'
                            placeholderTextColor="gray"
                            inputStyle={{ ...styles.inputSearchStyle, paddingHorizontal: isFocused ? moderateScale(20) : 0 }}
                            keyboardType="web-search"
                            searchIcon={isFocused ? null : imagePath.icSearchItem}
                            onFocus={() => onFocus()}
                            onBlur={() => setIsFocused(false)}
                        >
                        </TextInputWithLabel>
                    </View>
                    <View style={styles.categoryView}>
                        <View style={styles.categoryBtnView}>
                            {buttons.map((button, index) => {
                                return (
                                    <CustomPkgBtn
                                        key={index}
                                        btnText={button.title}
                                        textStyle={{ ...styles.textStyle, ...styles.categoryTextStyle, color: selectedIndex == index ? '#FFF' : '#A8A7A7' }}
                                        btnStyle={{ ...styles.btnStyle, ...getButtonStyle(index) }}
                                        onPress={() => selectCategory(index)}
                                    />
                                )
                            })
                            }
                        </View>
                    </View>
                    <View
                        style={styles.topItemViewStyle}
                    >
                        <Text style={styles.topItemListHeading}>Recent Items</Text>
                        <FlatList
                            data={items}
                            renderItem={topItemList}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={numColumns}
                            scrollEnabled={true}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={() => <View
                                style={{
                                    marginBottom: moderateVerticalScale(15),
                                    // alignItems:'center',

                                }}
                            />}
                        />
                    </View>
                </View>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: moderateScale(26),
        backgroundColor: '#FEFEFE'
    },
    homeHeaderView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: moderateVerticalScale(20),
        // alignItems: 'center',
        marginBottom: moderateVerticalScale(0),
    },
    headerTitleStyle: {
        fontSize: scale(36),
        fontWeight: '500',
        fontStyle: 'normal',
        color: Colors.black
    },
    searchView: {
        marginBottom: moderateVerticalScale(16),
    },
    inputSearchStyle: {
        height: moderateScale(43),
        borderRadius: moderateScale(30),
        backgroundColor: '#F2EFFF',
        borderBottomWidth: 0,
        paddingTop: 0, // remove default padding
        paddingBottom: 0, // remove default padding
    },
    categoriesViewStyle: {
        marginBottom: moderateVerticalScale(10)
    },
    addToCart: {

    },

    categoryBtnView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    categoryTextStyle: {
        fontSize: scale(13),
        color: '#A8A7A7',
    },
    selectedButton: {
        backgroundColor: '#7E58F4',
        height: moderateVerticalScale(37),
        width: moderateScale(95),
        borderRadius: moderateScale(11),
        marginTop: moderateVerticalScale(1),
        color: '#FFFFFF', // add this line
        marginBottom: moderateVerticalScale(25)
    },
    unselectedButton: {
        marginTop: moderateVerticalScale(1),
        backgroundColor: '#F2EFEF',
        height: moderateVerticalScale(37),
        width: moderateScale(95),
        borderRadius: moderateScale(11),
        // marginTop: moderateVerticalScale(1),
        marginBottom: moderateVerticalScale(25)
    },

    btnStyle: {
        width: '92%',
        height: moderateScale(48),
        backgroundColor: '#50379E',
        marginTop: moderateVerticalScale(22),
        marginBottom: moderateVerticalScale(90)
    },
    categoriesTextStyle: {
        fontSize: scale(24),
        fontWeight: '500',
        fontStyle: 'normal',
        color: Colors.black,
        marginBottom: moderateVerticalScale(14),
    },
    categoriesListStyle: {
        backgroundColor: '#D9D9D9',
        width: moderateScale(76),
        height: moderateScale(75),
        borderRadius: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainTopItemView: {
        flex: 1,
        flexDirection: 'row',
        marginRight: moderateScale(15),
        alignItems: 'center',
        justifyContent: 'center',
    },
    topItemViewStyle: {
        flex: 2,
        // backgroundColor: 'red',
        // marginBottom:80,
        paddingBottom: 85
    },
    singleItem: {
        width: '100%',
        height: '100%',
        borderRadius: moderateScale(15),
        backgroundColor: 'rgba(239, 238, 238, 0.85)',
        paddingVertical: moderateVerticalScale(20),
    },
    topItemListHeading: {
        fontSize: scale(24),
        fontWeight: '500',
        fontStyle: 'normal',
        color: Colors.black,
        marginBottom: moderateVerticalScale(14),
    },
    itemPriceDetail: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemNameStyle: {
        fontSize: scale(15),
        fontWeight: '500',
        color: Colors.black,
        // marginBottom: moderateVerticalScale(10)
    },
    itemPriceStyle: {
        fontSize: scale(15),
        fontWeight: '400',
        color: Colors.black
    },
    itemStyle: {
        fontSize: 12,
        fontWeight: '300',
        color: Colors.black,
        // color: 'rgba(0, 0, 0, 1)',
    }

})
export default Main;
