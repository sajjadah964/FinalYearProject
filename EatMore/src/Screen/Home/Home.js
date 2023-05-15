/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { Dimensions } from 'react-native';
import AddToCart from '../../tabs/AddToCart/AddToCart';
import Profile from '../../tabs/Profile/Profile';
import Search from '../../tabs/Search/Search';
import Main from '../../tabs/Main/Main';
const Home = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <View style={styles.container}>
      {selectedTab == 0 ? (
        <Main />
      ) : selectedTab == 1 ? (
        <Search />
      ) : selectedTab == 2 ? (
        <AddToCart />
      ) : (
        <Profile />
      )}
      <View style={{alignContent:'center',alignItems:'center',justifyContent:'center'}}>
      <View style={styles.bottomTabView}>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(0);
          }}>
          <Image
            source={
              selectedTab == 0
                ? require('../../assets/images/home-fill.png')
                : require('../../assets/images/home.png')
            }
            style={styles.bottomIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(1);
          }}>
          <Image
            source={
              selectedTab == 1
                ? require('../../assets/images/search.png')
                : require('../../assets/images/search.png')
            }
            style={styles.bottomIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(2);
          }}>
          <Image
            source={
              selectedTab == 2
                ? require('../../assets/images/add-cart-fill.png')
                : require('../../assets/images/add-cart.png')
            }
            style={styles.bottomIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(3);
          }}>
          <Image
            source={
              selectedTab == 3
                ? require('../../assets/images/person-fill.png')
                : require('../../assets/images/person.png')
            }
            style={styles.bottomIcon}
          />
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'red'
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
    left: '50%',
    transform: [{ translateX: -Dimensions.get('window').width * 0.4 }],
    borderRadius: 30,
    marginBottom:20
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
});
