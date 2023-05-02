/* eslint-disable prettier/prettier */
import React, { useState, useContext, useEffect } from 'react';
import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, moderateVerticalScale } from 'react-native-size-matters';
import imagePath from '../../constants/imagePath';
import TextInputWithLabel from '../../components/TextinputWithLable';
import Colors from '../../styles/Colors';
import CategoryList from './CategoryList';
import TopItemList from './TopItemList';
import NavigationStrings from '../../constants/NavigationStrings';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Loader from '../../components/Loader';

const numColumns = 2;
const Main = () => {
    const [isLoading, setisLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setisLoading(false);
        }, 1000);
    }, []);
    const navigation = useNavigation()
    const [isFocused, setIsFocused] = useState(false);
    const [selectedItem, setSelectedItem] = useState(0);
    const logout = () => {
        isFocused== (false)
    }
    const logoutData = () => {
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
    const onItemPress = (id) => {
        setSelectedItem(id);
    }
    const getStyle = (index) => {
        if (index == selectedItem) {
            return { backgroundColor: '#7E58F4', };
        }
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
    const renderItem = ({ item, index }) => {
        // console.log(item)
        console.log(index)
        return (
            <TouchableOpacity
                style={[styles.categoriesViewStyle,]}
            >
                <TouchableOpacity style={[styles.categoriesListStyle, getStyle(index)]}
                    onPress={() => onItemPress(index)}
                    activeOpacity={0.8}
                >
                    <View style={{
                        width: moderateScale(60),
                        height: moderateScale(60),
                    }}>
                        <Image
                            style={{
                                width: moderateScale(60),
                                height: moderateScale(60),
                            }}
                            source={item.url}
                        />
                    </View>
                </TouchableOpacity>
                <Text style={{
                    fontSize: scale(16),
                    fontWeight: '400',
                    color: index == selectedItem ? '#7E58F4' : Colors.black,
                    textAlign: 'center'
                }}>{item.itemName}
                </Text>
            </TouchableOpacity>
        )
    }
    const topItemList = ({ item, index }) => {
        console.log(item, 'top item list')
        return (
            <TouchableOpacity
                style={[styles.mainTopItemView, (index + 1) % 2 === 0 ? { marginRight: 0 } : null]}
                onPress={() => goToDetails(item, index)}
                activeOpacity={0.7}
            >
                <View style={styles.singleItem}>
                    <View style={{ alignItems: 'center' }}>
                        <Animatable.Image
                            source={item.itemUrl}
                            duraton="1500"
                            animation="bounce"
                        />
                    </View>
                    <View style={{
                        paddingHorizontal: moderateScale(15)
                    }}>
                        <Text style={styles.itemNameStyle}>{item.itemName}</Text>
                        <View style={styles.itemPriceDetail}>
                            <Text style={styles.itemPriceStyle}>Rs.{item.itemPrice}</Text>
                            <Animatable.Image
                                source={item.plusIcon}
                            />
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
                        <TouchableOpacity onPress={() => moveToScreen(NavigationStrings.ALL_ORDER)} activeOpacity={0.8}>
                            <Text style={styles.headerTitleStyle}>Menu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => logoutData()}
                            activeOpacity={0.7}
                        >
                            <Image
                                source={imagePath.icUserProfileLogo}
                            />
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

                    <View
                        style={[styles.categoriesViewStyle]}
                    >
                        <Text style={styles.categoriesTextStyle}>Categories</Text>
                        <FlatList
                            horizontal
                            data={CategoryList}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={() => <View style={{ marginLeft: moderateScale(20) }} />}
                        />
                    </View>

                    <View
                        style={styles.topItemViewStyle}
                    >
                        <Text style={styles.topItemListHeading}>Top Items</Text>

                        <FlatList
                            data={TopItemList}
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
        alignItems: 'center',
        marginBottom: moderateVerticalScale(20),
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
        // width: moderateScale(300),
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
        flex: 1,
        // backgroundColor: 'red',
    },
    singleItem: {
        width: '100%',
        height: '100%',
        borderRadius: moderateScale(15),
        backgroundColor: '#D9D9D9',
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
        fontWeight: '400',
        color: Colors.black,
        marginBottom: moderateVerticalScale(10)
    },
    itemPriceStyle: {
        fontSize: scale(15),
        fontWeight: '400',
        color: Colors.black
    }

})
export default Main;
