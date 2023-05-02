/* eslint-disable prettier/prettier */
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { moderateScale, scale, moderateVerticalScale } from 'react-native-size-matters';
import CustomPkgBtn from '../../components/CustomPkgBtn';
import imagePath from '../../constants/imagePath';
import Colors from '../../styles/Colors';
import TextInputWithLabel from '../../components/TextinputWithLable';
import NavigationStrings from '../../constants/NavigationStrings';
import * as Animatable from 'react-native-animatable';

const Signup = ({ navigation }) => {
    //   const navigation = useNavigation();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const [isVisible, setVisible] = useState(true);
    const [CVisible, setCVisible] = useState(true);
    const [textWidth, setTextWidth] = useState(null);

    const onTextLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        setTextWidth(width);
    };
    const moveToScreen = (screen) => {
        navigation.navigate(screen);
    }
    // const handleSignup = async (email, password) => {
    //     await register(email, password);
    //     // navigate to login screen
    //     navigation.navigate(NavigationStrings.LOGIN);
    //   };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, flexDirection: 'column', }}>
                <View style={styles.eatmoreLogo}>
                    <View style={styles.loginLogoView}>
                        <Animatable.Image
                            animation="bounceIn"
                            duraton="1500"
                            style={styles.loginLogoStyle}
                            source={imagePath.icLogo}
                        />
                    </View>
                </View>
                <View style={{
                    position: 'absolute',
                    bottom: 30,
                    left: 0,
                    right: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={styles.formView}>
                        <View style={{ marginTop: moderateVerticalScale(40) }}>
                            <CustomPkgBtn
                                textStyle={{ ...styles.textStyle }}
                                btnStyle={{ ...styles.btnStyle }}
                                btnText={'Sign Up'}
                            />
                        </View>
                        <TextInputWithLabel
                            placeHolder='Enter Name'
                            onChangeText={(userName) => setName(userName)}
                            style={styles.placeholder}
                        // inputStyle={{ marginBottom: moderateVerticalScale(10) }}
                        // keyboardType="email-address"
                        />
                        <TextInputWithLabel
                            placeHolder='Enter Email'
                            onChangeText={(userEmail) => setEmail(userEmail)}
                            style={styles.placeholder}
                            // inputStyle={{ marginBottom: moderateVerticalScale(10) }}
                            keyboardType="email-address"
                        />
                        <TextInputWithLabel
                            placeHolder={'Password'}
                            onChangeText={(userPassword) => setPassword(userPassword)}
                            style={styles.placeholder}
                            secureTextEntry={isVisible}
                            rightIcon={isVisible ? imagePath.icHide : imagePath.icShow}
                            onPressRight={() => setVisible(!isVisible)}
                        // inputStyle={{ marginBottom: moderateVerticalScale(14) }}
                        />

                        <TextInputWithLabel
                            placeHolder={'Confirm Password'}
                            onChangeText={(userPassword) => setConfirmPassword(userPassword)}
                            style={styles.placeholder}
                            secureTextEntry={CVisible}
                            rightIcon={CVisible ? imagePath.icHide : imagePath.icShow}
                            onPressRight={() => setCVisible(!CVisible)}
                            inputStyle={{ marginBottom: moderateVerticalScale(10) }}
                        />                       
                         <CustomPkgBtn
                            textStyle={{ ...styles.textStyle, ...styles.customTextStyle }}
                            btnStyle={{ ...styles.btnStyle, ...styles.customStyle }}
                            btnText={'Sign Up'}
                        // onPress={() => handleSignup(email,password)}
                        />
                        <TouchableOpacity
                            style={styles.loginSignview}
                            onPress={() => {
                                moveToScreen(NavigationStrings.LOGIN)
                            }}>
                            <Text style={styles.loginSignText} onLayout={onTextLayout}>
                                Already Account! Login here
                            </Text>
                            {textWidth ? <View style={[styles.line, { width: textWidth }]} /> : null}
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    eatmoreLogo: {
        // flex: 1,
        height: moderateScale(350),
        backgroundColor: Colors.primaryColor,
        borderBottomLeftRadius: moderateScale(80),
        borderBottomRightRadius: moderateScale(80),
    },
    formView: {
        backgroundColor: Colors.white,
        width: moderateScale(300),
        height: moderateScale(440),
        borderRadius: moderateScale(39),
        borderWidth: 1,
        borderColor: 'rgba(71, 45, 156, 0.8)',
        paddingHorizontal: moderateScale(25)
    },
    loginLogoStyle: {
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    loginLogoView: {
        marginTop: moderateVerticalScale(100),
        alignItems: 'center'
    },
    btnStyle: {
        width: moderateScale(130),
        height: moderateScale(36),
        justifyContent: 'center',
        backgroundColor: Colors.white,
        marginBottom: moderateVerticalScale(60),
        borderColor: Colors.primaryColor,
        borderWidth: 1,
    },
    textStyle: {
        color: Colors.primaryColor
    },
    forgotPassStyle: {
        color: Colors.primaryColor,
    },
    forgotPassView: {
        textAlign: 'right',
        display: 'flex',
        alignItems: 'flex-end',
        marginBottom: moderateVerticalScale(40)
    },
    customStyle: {
        marginBottom: moderateVerticalScale(10),
        backgroundColor: Colors.primaryColor
    },
    placeholder: {
        fontSize: 15,
        fontWeight: '400',
    },
    customTextStyle: {
        fontSize: scale(15),
        fontWeight: '500',
        color: Colors.white
    },
    loginSignview: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginSignText: {
        fontSize: scale(15),
        fontWeight: '500',
        color: Colors.primaryColor
    },
    line: {
        height: moderateScale(1),
        backgroundColor: Colors.primaryColor,
    },
})
export default Signup;

