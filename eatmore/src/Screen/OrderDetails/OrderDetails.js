/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View, Modal, Button, TouchableOpacity } from 'react-native'
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
import { RadioButton } from 'react-native-paper';
const OrderDetails = () => {
    const navigation = useNavigation();

    const [isLoading, setisLoading] = useState(true);
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
    const [textSelected, setTextSelected] = useState(false);

    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            {isLoading ? <Loader isLoading={isLoading} /> :
                <View style={styles.container}>
                    <CustomHeader
                        headerTitle={'Checkout'}
                        headerImgStyle={styles.headerImgStyle}
                    />
                    <View style={styles.mainContentView}></View>
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
    mainContentView :{
        display:'flex',
        flex:1,
        justifyContent:'space-evenly',
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
    }
});

export default OrderDetails;
