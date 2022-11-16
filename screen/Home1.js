import React from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, Pressable, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore'









const Home1 = () => {

    useEffect(() => {
        setUserData();
    }, [])


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

    const setUserData =  () => {
        console.log("new=============--------------")
         firestore()
        .collection('Users')
        // .get()
        // .add()
        .add({
            name: 'Ada Lovelace',
            age: 30,
        })
        .then((r) => {
            console.log('User added!');
        })
        .catch((e)=>{
            console.log(e,'eeeee added!');
        })
        console.log("new 22222222222222222222222=============--------------")
    }
    


    return (


        <View style={{ flex: 1, }}>

            <View style={{ backgroundColor: 'black' }}>


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
                            <Text style={{ fontSize: 28, fontWeight: 'bold', paddingLeft: 10, color: 'white', right: 25, left: 20 }}>Home</Text>
                        </View>
                    </View>
                </View>

            </View>






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
