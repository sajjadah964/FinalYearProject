import { StyleSheet, Text, View } from 'react-native'
import React from 'react';

const Orders = () => {
  return (
    <View style={styles.container}>
      <Text>Search</Text>
    </View>
  )
}

export default Orders;

const styles = StyleSheet.create({
  container : {
    backgroundColor:'red',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
}
})