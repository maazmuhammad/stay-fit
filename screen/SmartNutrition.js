import React from 'react';
import { View, StyleSheet, Text,Pressable,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SmartNutrition = () => {
    const navigation = useNavigation();
    return (
        <View>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <View style={{ backgroundColor: '#F81250', height: 50, width:'90%', marginTop: 10, borderRadius: 10, marginHorizontal: 20,alignItems: 'center' }}>
                    <Text style={{ fontSize: 34 , fontWeight: 'bold', paddingLeft: 10, color:'white' }}>Smart Nutrition</Text>
                </View>
            </View> */}

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <View style={{ backgroundColor: '#F81250', height: 50, width: '90%', marginTop: 10, borderRadius: 10, marginHorizontal: 20, }}>
                    <View style={{ flexDirection: 'row' }}>

                        <Pressable style={{ right: 20 }}
                            onPress={() => navigation.openDrawer()}
                        >
                            <Image
                                style={styles.button1}
                                source={require('../assests/image/menu.png')}
                            />

                        </Pressable>
                        <Text style={{ fontSize: 34, fontWeight: 'bold', paddingLeft: 10, color: 'white' }}>Smart Nutrition</Text>
                    </View>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    button1: {
        maxWidth: 30,
        width: 30,
        height: 30,
        marginTop: 10,
        marginHorizontal: 30,
        //backgroundColor: 'orange'
    },
})

export default SmartNutrition;
