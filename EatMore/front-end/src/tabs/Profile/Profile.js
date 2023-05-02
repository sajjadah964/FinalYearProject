/* eslint-disable prettier/prettier */
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
                            leftImg={imagePath.icBack}
                            headerTitle={'Profile'}
                            headerImgStyle={styles.headerImgStyle}
                        />
                        <ScrollView>
                            <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
                                <View style={styles.profileView}>
                                    <Image
                                        style={{
                                            width: moderateScale(66),
                                            height: moderateScale(66),
                                        }}
                                        source={imagePath.icUserImg}
                                    />
                                    <View>
                                        <Text style={styles.cardText}>John Cena</Text>
                                        <Text style={styles.cardText}>John345@gmail.com</Text>
                                        <Text style={styles.cardText}>300 points</Text>
                                    </View>
                                </View>
                                <View style={styles.formView}>
                                    <Text style={styles.labelTextStyle}>Full Name</Text>
                                    <View>
                                    <Image source={require('../../assets/images/profileIcon.png')} style={styles.imgFirst}/>
                                        <TextInputWithLabel
                                            inputStyle={styles.inputStyle}
                                            placeHolder="Name"
                                            style={styles.placeHolder}
                                            inlineInputStyle={styles.inlineInputStyle}
                                            placeholderTextColor='rgba(0, 0, 0, 0.3)'
                                        />
                                        <Image source={require('../../assets/images/profileEdit.png')} style={styles.imgSecond}/>
                                    </View>
                                    <Text style={styles.labelTextStyle}>Email</Text>
                                    <View>
                                    <Image source={require('../../assets/images/profileEmail.png')} style={styles.imgFirst}/>
                                        <TextInputWithLabel
                                            inputStyle={styles.inputStyle}
                                            style={styles.placeHolder}
                                            placeHolder="Email"
                                            inlineInputStyle={styles.inlineInputStyle}
                                            placeholderTextColor='rgba(0, 0, 0, 0.3)'
                                        />
                                        
                                    <Image source={require('../../assets/images/profileEdit.png')} style={styles.imgSecond}/>
                                    {/* </View> */}
                                    <Text style={styles.labelTextStyle}>Password</Text>
                                    {/* <View> */}
                                        
                                    <Image source={require('../../assets/images/profileSecurity.png')} style={styles.imgFirst}/>
                                        <TextInputWithLabel
                                            inputStyle={styles.inputStyle}
                                            style={styles.placeHolder}
                                            placeHolder="Password"
                                            inlineInputStyle={styles.inlineInputStyle}
                                            placeholderTextColor='rgba(0, 0, 0, 0.3)'
                                        />
                                        
                                    <Image source={require('../../assets/images/profileEdit.png')} style={styles.imgSecond}/>
                                    {/* </View> */}
                                    
                                    <Text style={styles.labelTextStyle}>Language</Text>
                                    {/* <View> */}
                                        
                                    <Image source={require('../../assets/images/profileLanguage.png')} style={styles.imgFirst}/>
                                        <TextInputWithLabel
                                            inputStyle={styles.inputStyle}
                                            style={styles.placeHolder}
                                            placeHolder="Language"
                                            inlineInputStyle={styles.inlineInputStyle}
                                            placeholderTextColor='rgba(0, 0, 0, 0.3)'
                                        />
                                        <Image source={require('../../assets/images/profileEdit.png')} style={styles.imgSecond}/>
                                        </View>
                                </View>
                                <View>
                                    <CustomPkgBtn
                                        btnText={'Submit'}
                                        textStyle={{ ...styles.textStyle }}
                                        btnStyle={{ ...styles.btnStyle, ...styles.subscribeBtnStyle }}
                                    />
                                </View>
                            </View>
                        </ScrollView>
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
        cardText: {
            fontSize: 16,
            fontWeight: '600',
            color: 'rgba(0, 0, 0, 0.8)'
        },
        profileView: {
            backgroundColor: '#EFEDED',
            borderBottomWidth: 1,
            borderColor: 'rgba(168, 167, 167, 1)',
            padding: 20,
            // paddingVertical: 20,
            marginBottom: 20,
            flexDirection: 'row',
            gap: 10,
            borderRadius: moderateScale(8),
        },
        headerImgStyle: {
            tintColor: Colors.black
        },
        imgFirst: {
            zIndex: 2,
            top: 30,
            left: 15,
        },
        imgSecond: {
            zIndex: 2,
            left: 300,
            bottom: 33
        },
        labelTextStyle: {
            fontSize: 10,
            fontWeight: '400',
            color: 'rgba(0, 0, 0, 0.5)'
        },
        placeHolder: {
            fontSize: 15,
            fontWeight: '400',
            color: 'rgba(0, 0, 0, 0.5)'
        },
        title: {
            fontSize: scale(24),
            fontWeight: '600',
        },
        btnStyle: {
            width: '100%',
            height: moderateScale(43),
            borderRadius: moderateScale(25),
            backgroundColor: Colors.primaryColor
        },
        inputStyle: {
            borderBottomWidth: 0,
            width: '100%',
            backgroundColor: '#EFEDED',
            borderRadius: moderateScale(8),
            paddingLeft: 40,
            zIndex: 1,
        },
        inlineInputStyle: {
            flex: 1,
            fontSize: scale(16),
            // paddingHorizontal: moderateScale(15)
        },
    
    })