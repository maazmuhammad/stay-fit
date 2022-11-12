import React from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, Pressable, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';









const Home1 = () => {


    const navigation = useNavigation();
    // const Dnav = useDrawerNav();






    const navigatetoHome = () => {

        navigation.navigate('Home')


    }
    const navigatetoSmartNutrition = () => {
        navigation.navigate('Smart')


    }
    const OnLogoutPressed = () => {

        navigation.navigate('Login')


    }
    const onDrawer = () => {




    }




    return (


        <View style={{ flex: 1, }}>
            <Pressable style={{ backgroundColor: 'black' }}
                onPress={() => navigation.openDrawer()}
            >
                <Image
                    style={styles.button1}
                    source={require('../assests/image/menu.png')}
                />

            </Pressable>




            <View style={styles.screen}>
                <TouchableOpacity
                    onPress={() => navigatetoHome()}
                    style={styles.roundButton2}>
                    <Text style={{ fontSize: 31, textAlign: "center", fontWeight: 'bold', color: 'white' }}>Activity Summary</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigatetoSmartNutrition()}
                    style={styles.roundButton2}>
                    <Text style={{ fontSize: 31, textAlign: "center", fontWeight: 'bold', color: 'white' }}>Smart Nutrition</Text>
                </TouchableOpacity>

            </View>



        </View >
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },

    roundButton2: {
        marginTop: 20,
        width: 180,
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#F81250',
    },
    button1: {
        maxWidth: 30,
        width: 30,
        height: 30,
        marginTop: 10,
        marginHorizontal: 30,
        //backgroundColor: 'orange'
    },


})

export default Home1;
