import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { moderateScale, moderateVerticalScale, scale, } from 'react-native-size-matters';
import CustomHeader from '../../components/CustomHeader';
import imagePath from '../../constants/imagePath';
import CustomPkgBtn from '../../components/CustomPkgBtn';
import Colors from '../../styles/Colors';
import { Image } from 'react-native-animatable';
import Loader from '../../components/Loader';
import TextInputWithLabel from '../../components/TextinputWithLable';

const Profile = () => {

    const [selectedIndex, setSelectedIndex] = useState('1');
    const [isLoading, setisLoading] = useState(true);
    // LOADING CODE
    useEffect(() => {
        setTimeout(() => {
            setisLoading(false);
        }, 1000);
    }),
        [];
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {isLoading ? <Loader isLoading={isLoading} /> :
                <View style={styles.container}>
                    <CustomHeader
                        headerTitle={"Account"}
                    />
                    <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
                        <View style={styles.profileView}>
                            <Image
                                style={{
                                    width: moderateScale(100),
                                    height: moderateScale(100),
                                    marginBottom: moderateVerticalScale(20)
                                }}
                                source={imagePath.icUserImg}
                            />
                            <Text style={styles.title}>Samantha</Text>
                        </View>
                        <View style={styles.formView}>
                            <TextInputWithLabel
                                label={'Name'}
                                labelTextStyle={styles.labelTextStyle}
                                inputStyle={styles.inputStyle}
                                placeHolder="Enter your name"
                                inlineInputStyle={styles.inlineInputStyle}
                                placeholderTextColor='rgba(0, 0, 0, 0.3)'
                            />
                            <TextInputWithLabel
                                label={'Department'}
                                labelTextStyle={styles.labelTextStyle}
                                inputStyle={styles.inputStyle}
                                placeHolder="Enter your department"
                                inlineInputStyle={styles.inlineInputStyle}
                                placeholderTextColor='rgba(0, 0, 0, 0.3)'
                            />
                            <TextInputWithLabel
                                label={'Designation'}
                                labelTextStyle={styles.labelTextStyle}
                                inputStyle={styles.inputStyle}
                                placeHolder="Enter your designation"
                                inlineInputStyle={styles.inlineInputStyle}
                                placeholderTextColor='rgba(0, 0, 0, 0.3)'
                            />
                        </View>
                        <View>
                            <CustomPkgBtn
                                btnText={'Submit'}
                                textStyle={{ ...styles.textStyle }}
                                btnStyle={{ ...styles.btnStyle, ...styles.subscribeBtnStyle }}
                            />
                        </View>
                    </View>
                </View>
            }
        </SafeAreaView>
    )
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: moderateScale(26),
        backgroundColor: '#FEFEFE'
    },
    profileView: {
        backgroundColor: '#EFEDED',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: moderateVerticalScale(30),
        borderRadius: moderateScale(8)
    },
    title: {
        fontSize: scale(24),
        fontWeight: '600',
    },
    btnStyle: {
        width: moderateScale(200),
        height: moderateScale(43),
        borderRadius: moderateScale(10),
        backgroundColor: Colors.primaryColor
    },
    inputStyle: {
        borderBottomWidth: 0,
        width: '100%',
        height: moderateScale(45),
        backgroundColor: '#EFEDED',
        borderRadius: moderateScale(8),
        marginBottom: moderateVerticalScale(15),
    },
    inlineInputStyle: {
        // paddingVertical: verticalScale(8),
        flex: 1,
        fontSize: scale(16),
        paddingHorizontal: moderateScale(15)
    },

})