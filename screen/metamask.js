import React from 'react';
import { View, StyleSheet, Text, Pressable, Image, TouchableOpacity,Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Metamask = () => {

    const metamask = async () => {

       // Linking.openURL('whatsapp://app');
        Linking.openURL('MetaMask://app');



    }

    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, }}>
            <View style={{ backgroundColor: '#AAEAFF' }}>


                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#004aad', width: '90%', marginTop: 10, borderRadius: 10, marginHorizontal: 20, padding: '3%' }}>
                        <View style={{ flexDirection: 'row' }}>

                            <Pressable style={{}}
                                onPress={() => navigation.openDrawer()}

                            >
                                <Image
                                    style={styles.button1}
                                    source={require('../assests/image/menu.png')}
                                />

                            </Pressable>
                            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white', width: "90%", textAlign: 'center' }}>MetaMask</Text>
                        </View>
                    </View>
                </View>

            </View>
            <View style={styles.screen}>

                <Text style={styles.text1}>Follow these Steps</Text>
                <Text style={styles.text2}>* Download Metamask Wallet App.</Text>
                <Text style={styles.text2}>* Click on create Metamask.</Text>
                <Text style={styles.text2}>* Create your metamask wallet Account. </Text>
                <Text style={styles.text2}>* Copy your wallet address. </Text>
                <Text style={styles.text2}>* Go to Connect Wallet Screen and paste your wallet adderss there. </Text>



                <View style={{alignItems:'center'}}>

                    <TouchableOpacity
                        onPress={() => metamask()}
                        style={styles.roundButton2}>
                        <Image
                            style={{
                                width: 100,
                                height: 100,
                                //marginHorizontal: 10,
                            }}
                            source={require('../assests/image/meta.png')}
                        />
                        <Text style={{ fontSize: 24, textAlign: "center", fontWeight: 'bold', color: '#004aad', textAlign: 'center' }}>Create MetaMask Wallet</Text>
                    </TouchableOpacity>
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
        // marginHorizontal: 30,
        //backgroundColor: 'orange'
    },
    screen: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#AAEAFF'
    },
    text1: {
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: 25,
        color: '#004aad',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 20
    },
    text2: {
        fontSize: 15,
        color: '#5d90d4',
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginBottom: 10,

    },
    roundButton2: {
        marginTop: 20,
        width: '90%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        elevation: 20,

    },

})

export default Metamask;
