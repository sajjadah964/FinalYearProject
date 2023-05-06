import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import CustomHeader from '../../components/CustomHeader'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import Colors from '../../styles/Colors';
import TextInputWithLabel from '../../components/TextinputWithLable';
import fontFamily from '../../styles/fontFamily';
import CustomPkgBtn from '../../components/CustomPkgBtn';
import CustomModal from '../../constants/CustomModal';
import imagePath from '../../constants/imagePath';
import Loader from '../../components/Loader';

const AddItem = () => {
    const [isLoading, setisLoading] = useState(false);

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [points, setPoints] = useState('');
    const [description, setDescription] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0)
    const selectCategory = (index) => {
        setSelectedIndex(index)
    }
    const getButtonStyle = (index) => {
        if (index === selectedIndex) {
            return styles.selectedButton;
        } else {
            return styles.unselectedButton;
        }
    };
    // LOADING CODE
    // useEffect(() => {
    //     setTimeout(() => {
    //         setisLoading(false);
    //     }, 1000);
    // }),
    //     [];
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {isLoading ? <Loader isLoading={isLoading} /> :
                <View style={styles.container}>
                    <CustomHeader
                        // leftImg={imagePath.icBack}
                        headerTitle={'Add Items'}
                    // headerImgStyle={styles.headerImgStyle}
                    />
                    <ScrollView style={{ flex: 1 }}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                    >
                    <View style={styles.FormInputView}>

                        <TextInputWithLabel
                            // label={'Department'}
                            labelTextStyle={styles.labelTextStyle}
                            inputStyle={styles.inputStyle}
                            placeHolder="Name"
                            inlineInputStyle={styles.inlineInputStyle}
                            placeholderTextColor='rgba(0, 0, 0, 0.3)'
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInputWithLabel
                            // label={'Gender'}
                            labelTextStyle={styles.labelTextStyle}
                            inputStyle={styles.inputStyle}
                            placeHolder="Item Price"
                            inlineInputStyle={styles.inlineInputStyle}
                            placeholderTextColor='rgba(0, 0, 0, 0.3)'
                            value={price}
                            onChangeText={setPrice}
                        />
                        <TextInputWithLabel
                            // label={'City'}
                            labelTextStyle={styles.labelTextStyle}
                            inputStyle={styles.inputStyle}
                            placeHolder="Item Points"
                            inlineInputStyle={styles.inlineInputStyle}
                            placeholderTextColor='rgba(0, 0, 0, 0.3)'
                            value={points}
                            onChangeText={setPoints}
                        />
                        <TextInputWithLabel
                            // label={'Address'}
                            labelTextStyle={styles.labelTextStyle}
                            inputStyle={{ ...styles.inputStyle, ...styles.descInputStyle }}
                            placeHolder="Enter Your Description"
                            inlineInputStyle={styles.inlineInputStyle}
                            placeholderTextColor='rgba(0, 0, 0, 0.3)'
                            value={description}
                            onChangeText={setDescription}
                        />
                        <View style={styles.categoryView}>
                            <Text style={styles.categorylabel}>Select Your Category</Text>
                            <View style={styles.categoryBtnView}>
                                < CustomPkgBtn
                                    btnText={'All Items'}
                                    textStyle={{ ...styles.textStyle, ...styles.categoryTextStyle, color: selectedIndex == 0 ? '#FFF' : '#A8A7A7' }}
                                    btnStyle={{ ...styles.btnStyle, ...getButtonStyle(0) }}
                                    onPress={() => selectCategory(0)}
                                />


                                <CustomPkgBtn
                                    btnText={'Burger'}
                                    textStyle={{ ...styles.textStyle, ...styles.categoryTextStyle, color: selectedIndex == 1 ? '#FFF' : '#A8A7A7' }}
                                    btnStyle={{ ...styles.btnStyle, ...getButtonStyle(1) }}
                                    onPress={() => selectCategory(1)}
                                />


                                <CustomPkgBtn
                                    btnText={'pIzza'}
                                    textStyle={{ ...styles.textStyle, ...styles.categoryTextStyle, color: selectedIndex == 2 ? '#FFF' : '#A8A7A7' }}
                                    btnStyle={{ ...styles.btnStyle, ...getButtonStyle(2) }}
                                    onPress={() => selectCategory(2)}
                                />

                            </View>
                        </View>
                        <View style={styles.addImageView}>
                            <Text style={styles.categorylabel}>Add Your Image</Text>
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <TouchableOpacity style={styles.addImageStyle}
                                    activeOpacity={0.7}
                                >
                                    <Image
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        source={imagePath.icAddImage}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <CustomPkgBtn
                            btnText={'Upload Item'}
                            textStyle={{ ...styles.textStyle }}
                            btnStyle={{ ...styles.btnStyle }}
                        />
                    </View>
                    </ScrollView>
                </View>
            }
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: moderateScale(26),
        backgroundColor: '#FFf'
        // backgroundColor: 'red'
    },
    labelTextStyle: {
        color: 'rgba(0, 0, 0, 0.5)'
    },
    headerImgStyle: {
        tintColor: Colors.black
    },
    inputStyle: {
        borderBottomWidth: 0,
        width: '100%',
        height: moderateScale(45),
        backgroundColor: '#F8F8F8',
        borderRadius: moderateScale(8),
        marginBottom: moderateVerticalScale(20),
        textAlignVertical: 'top',
    },
    inlineInputStyle: {
        // paddingVertical: verticalScale(8),
        flex: 1,
        fontSize: scale(16),
        paddingHorizontal: moderateScale(15)
    },
    btnStyle: {
        width:'95%',
        height: moderateScale(48),
        backgroundColor: '#50379E',
        marginTop: moderateVerticalScale(22),
        marginBottom:moderateVerticalScale(90)
    },
    descInputStyle: {
        height: moderateVerticalScale(80),
    },
    categorylabel: {
        fontSize: scale(10),
        color: 'rgba(0, 0, 0, 0.65)',
        marginBottom: moderateVerticalScale(14)
    },
    categoryBtnView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    // categoryBtnStyle: {
    //     height: moderateVerticalScale(37),
    //     width: moderateScale(95),
    //     marginTop: moderateVerticalScale(1),
    //     borderRadius: moderateScale(11),
    //     backgroundColor: '#F2EFEF'
    // },
    categoryTextStyle: {
        fontSize: scale(13),
        color: '#A8A7A7',
    },
    selectedButton: {
        backgroundColor: '#7E58F4',
        height: moderateVerticalScale(37),
        width: moderateScale(95),
        borderRadius: moderateScale(11),
        marginTop: moderateVerticalScale(1),
        color: '#FFFFFF', // add this line
        marginBottom:moderateVerticalScale(25)
    },
    unselectedButton: {
        marginTop: moderateVerticalScale(1),
        backgroundColor: '#F2EFEF',
        height: moderateVerticalScale(37),
        width: moderateScale(95),
        borderRadius: moderateScale(11),
        marginTop: moderateVerticalScale(1),
        marginBottom:moderateVerticalScale(25)
    },
    addImageStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2EFEF',
        width: moderateScale(117),
        height: moderateVerticalScale(117),
    }
})
export default AddItem;