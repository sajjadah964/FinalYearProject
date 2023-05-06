import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ManageItem = () => {
  return (
    <View style={styles.container}>
      <Text>ManageItem</Text>
    </View>
  )
}

export default ManageItem

const styles = StyleSheet.create({
    container : {
        backgroundColor:'red',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})