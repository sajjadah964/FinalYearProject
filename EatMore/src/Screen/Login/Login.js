import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ToastAndroid,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import { moderateScale, scale, moderateVerticalScale } from 'react-native-size-matters';
import CustomPkgBtn from '../../components/CustomPkgBtn';
import imagePath from '../../constants/imagePath';
import Colors from '../../styles/Colors';
import { useNavigation } from '@react-navigation/native';
import TextInputWithLabel from '../../components/TextinputWithLable';
import NavigationStrings from '../../constants/NavigationStrings';
import * as Animatable from 'react-native-animatable';
import auth from '@react-native-firebase/auth';
import Loader from '../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = () => {
    const [isLoading, setisLoading] = useState(false);
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isVisible, setVisible] = useState(true);
    const [textWidth, setTextWidth] = useState(null);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const moveToScreen = (screen) => {
        navigation.navigate(screen);
    };

    const onTextLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        setTextWidth(width);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Reset email and password fields when screen is loaded
            setEmail('');
            setPassword('');
        });
        // Clean up the listener
        return unsubscribe;
    }, [navigation]);

    const handleUserLogin = async () => {
        // setisLoading(true)
        if (!email || !password) {
            ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
            return;
        }

        try {
            setisLoading(true);
            const result = await auth().signInWithEmailAndPassword(email, password);
            ToastAndroid.show('Logged in successfully', ToastAndroid.SHORT);
            setEmailError('');
            setPasswordError('');
            setisLoading(false);
            await AsyncStorage.setItem('USERID', result.user.uid);
            await AsyncStorage.setItem('EMAIL', email);
            await AsyncStorage.setItem('NAME', result.user.name);
            await AsyncStorage.setItem('NUMBER', result.user.number);
            navigation.navigate(NavigationStrings.HOME);
        } catch (error) {
            console.log('error', error);
            ToastAndroid.show('Login Failed', ToastAndroid.SHORT);
            if (error.code === 'auth/invalid-email') {
                setEmailError('Invalid email address');
            } else if (error.code === 'auth/wrong-password') {
                setPasswordError('Incorrect password');
            } else if (error.code === 'auth/user-not-found') {
                ToastAndroid.show('User not Found', ToastAndroid.SHORT);
            } else {
                setEmailError('');
                setPasswordError('');
            }
            setisLoading(false);
        }
    };

    const handleEmailChange = (text) => {
        setEmail(text);
        if (!text) {
            setEmailError('Email is required');
        } else if (!validateEmail(text)) {
            setEmailError('Invalid email address');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
        if (!text) {
            setPasswordError('Password is required');
        } else if (!validatePassword(text)) {
            setPasswordError('Password must contain at least 6 characters');
        } else {
            setPasswordError('');
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Loader isLoading={isLoading} />
            <KeyboardAvoidingView style={{ flex: 1 }} enabled>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
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
                        flex: 1,
                        position: 'relative',
                        bottom: 80,
                        left: 0,
                        right: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        // height:windowHeight-430
                    }}>
                        <View style={styles.formView}>
                            <View style={{ marginTop: moderateVerticalScale(40) }}>
                                <CustomPkgBtn
                                    textStyle={{ ...styles.textStyle }}
                                    btnStyle={{ ...styles.btnStyle }}
                                    btnText={'Login'}
                                />
                            </View>
                            <TextInputWithLabel
                                placeHolder="Enter Email"
                                onChangeText={handleEmailChange}
                                inputStyle={{ marginBottom: moderateVerticalScale(10) }}
                                keyboardType="email-address"
                                value={email}
                            />
                            {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
                            <TextInputWithLabel
                                placeHolder="Password"
                                onChangeText={handlePasswordChange}
                                secureTextEntry={isVisible}
                                rightIcon={isVisible ? imagePath.icHide : imagePath.icShow}
                                onPressRight={() => setVisible(!isVisible)}
                                inputStyle={{ marginBottom: moderateVerticalScale(14) }}
                                value={password}
                            />
                            {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

                            <TouchableOpacity
                                style={styles.forgotPassView}
                                onPress={() => {
                                    moveToScreen(NavigationStrings.RESET_PASSWORD);
                                }}
                            >
                                <Text style={styles.forgotPassStyle}>Forgot Password</Text>
                            </TouchableOpacity>

                            <CustomPkgBtn
                                textStyle={{ ...styles.textStyle, ...styles.customTextStyle }}
                                btnStyle={{ ...styles.btnStyle, ...styles.customStyle }}
                                btnText={'Login'}
                                onPress={handleUserLogin}
                                disabled={!email || !password || emailError || passwordError || isLoading}
                            />
                            <TouchableOpacity
                                style={styles.loginSignview}
                                onPress={() => {
                                    moveToScreen(NavigationStrings.SIGNUP);
                                }}
                            >
                                <Text style={styles.loginSignText} onLayout={onTextLayout}>
                                    No Account! Sign up here
                                </Text>
                                {textWidth ? <View style={[styles.line, { width: textWidth }]} /> : null}
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    eatmoreLogo: {
        height: moderateScale(350),
        backgroundColor: Colors.primaryColor,
        borderBottomLeftRadius: moderateScale(80),
        borderBottomRightRadius: moderateScale(80),
    },
    formView: {
        backgroundColor: Colors.white,
        width: (windowWidth - 45),
        height: (windowHeight - 270),
        borderRadius: moderateScale(39),
        borderWidth: 1,
        borderColor: 'rgba(71, 45, 156, 0.8)',
        paddingHorizontal: moderateScale(25)
    },
    loginLogoStyle: {
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    error: {
        color: 'red',
        // marginBottom: 10,
    },
    loginLogoView: {
        marginTop: moderateVerticalScale(100),
        alignItems: 'center',
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
        marginBottom: moderateVerticalScale(20),
        backgroundColor: Colors.primaryColor
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
        height: 1,
        backgroundColor: Colors.primaryColor,
        // width: '73%',
    },

});

export default Login;
