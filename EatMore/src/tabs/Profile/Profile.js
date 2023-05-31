/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { FlatList, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import AddToCart from '../../tabs/AddToCart/AddToCart';
// import Profile from '../../tabs/Profile/Profile';
import Search from '../../tabs/Search/Search';
import Main from '../../tabs/Main/Main';
// import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { moderateScale, moderateVerticalScale, scale, } from 'react-native-size-matters';
import CustomHeader from '../../components/CustomHeader';
import imagePath from '../../constants/imagePath';
import CustomPkgBtn from '../../components/CustomPkgBtn';
import Colors from '../../styles/Colors';
import { Image } from 'react-native-animatable';
import Loader from '../../components/Loader';
import TextInputWithLabel from '../../components/TextinputWithLable';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const [selectedIndex, setSelectedIndex] = useState('1');
  const [isLoading, setisLoading] = useState(true);
  const isFocused = useIsFocused();
  const [user,setUser]=useState([]);
  // LOADING CODE
  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 1000);
  }),
    [];
    // useEffect(() => {

    // }),
    //   [];

    let uid = '';
    useEffect(() => {
      getCartItems();
  }, [isFocused]);

  const getCartItems = async () => {
      uid = await AsyncStorage.getItem('USERID');
      const user = await firestore().collection('users').doc(uid).get();
      setUser(user._data)
      console.log('this is the new user',user)
      console.log('this is the new user',user._data.email);
      console.log('this is the new user',user._data.name);
  };

  return (
    <SafeAreaView style={{ flex: 1, }}>
      {isLoading ? <Loader isLoading={isLoading} /> :
        <View style={styles.container}>
          <CustomHeader
            leftImg={imagePath.icBack}
            headerTitle={'Profile'}
            headerImgStyle={styles.headerImgStyle}
          />
          <ScrollView style={{}}>
            <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
              <View style={styles.profileView}>
                <Image
                  style={{
                    width: moderateScale(150),
                    height: moderateScale(150),
                    marginBottom: 20,
                  }}
                  source={imagePath.icUserImg}
                />
                <Text style={styles.cardText}>Hello {user.name}!</Text>

              </View>
              <View style={styles.formView}>
                <View style={styles.inputStyle}>
                  <Image source={require('../../assets/images/profileIcon.png')} style={styles.imgFirst} />
                <Text style={styles.cardText}>{user.name}</Text>
                </View>
                <View style={styles.inputStyle}>
                  <Image source={require('../../assets/images/profileEmail.png')} style={styles.imgFirst} />
                <Text style={styles.cardText}>{user.email}</Text>
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
    // paddingHorizontal: moderateScale(26),
    paddingLeft: 20,
    paddingRight: 20,
    height: '100%',
    backgroundColor: '#FEFEFE',
  },
  container1: {
    flex: 1,
  },
  bottomTabView: {
    flexDirection: 'row',
    height: 60,
    width: '80%',
    backgroundColor: '#F2EFEF',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    // top: 10,
    left: '54%',
    transform: [{ translateX: -Dimensions.get('window').width * 0.4 }],
    borderRadius: 30,
    marginBottom: 20
  },

  bottomTab: {
    width: '20%',
    // height: '100%',
    alignItems: 'center',
  },
  bottomIcon: {
    width: 25,
    height: 25,
  },
  cardText: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 13,
    textTransform: 'capitalize',
    color: 'rgba(0, 0, 0, 0.8)'
  },
  profileView: {
    // height: 150,
    width: '100%',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30
  },
  headerImgStyle: {
    tintColor: Colors.black
  },
  imgFirst: {
    zIndex: 2,
    top: 7,
    // left: 15,
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
    color: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: scale(24),
    fontWeight: '600',
  },
  btnStyle: {
    width: '50%',
    height: moderateScale(43),
    borderRadius: moderateScale(25),
    backgroundColor: Colors.primaryColor,
    marginBottom: 150,
  },
  inputStyle: {
    borderBottomWidth: 0,
    width: '100%',
    backgroundColor: '#EFEDED',
    borderRadius: moderateScale(8),
    paddingLeft: 20,
    flexDirection: 'row',
    zIndex: 1,
    marginBottom: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  inputStyleLast: {
    borderBottomWidth: 0,
    width: '100%',
    backgroundColor: '#EFEDED',
    borderRadius: moderateScale(8),
    paddingLeft: 40,
    zIndex: 1,
    marginBottom: 30
  },
  inlineInputStyle: {
    flex: 1,
    fontSize: scale(16),
  },

})