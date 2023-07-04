
import React, { useRef, useEffect, } from 'react';
import { View, StyleSheet, Text, Pressable, Image, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
// import Web3 from 'web3';
// import { ethers } from 'ethers';



const Wallet = () => {
    const [Address, setAddress] = React.useState('');
    const [userAdd, setuserAdd] = React.useState('');
    const [appAdd, setAppAdd] = React.useState('');
    const [Coin, setCoin] = React.useState('');
    const [backendcoin, setbackendcoin] = React.useState('');
    const [Eth, setEth] = React.useState('');


    // setAppAdd('0x2d33ED59a1a483b557669CeE2a06655DB85f2f69')




    const navigation = useNavigation();

    // const fromAddress = '0x2d33ED59a1a483b557669CeE2a06655DB85f2f69'; // Replace with the sender's wallet address
    // const toAddress = userAdd; // Replace with the recipient's wallet address
    // const amountToSend = ethers.utils.parseEther('0.1'); // Replace with the amount to send in Ether
    // const wallet = new ethers.Wallet(web3.currentProvider);

    const Transtion = async () => {

        console.log(Coin, "user")
        console.log(backendcoin, "backend")

        if (backendcoin >= Coin) {

            // // Sign the transaction using Metamask
            // wallet.sendTransaction({
            //     to: toAddress,
            //     value: amountToSend,
            //     gasLimit: 21000,
            //     gasPrice: web3.utils.toWei('10', 'gwei'),
            //     from: fromAddress,
            // }).then((tx) => {
            //     console.log(tx);
            // }).catch((error) => {
            //     console.error(error);
            // });



        } else (
            Alert.alert("You have insufficient Coin ")
        )



    }
    const saveaddress = async () => {
        console.log(Address)
        try {
            firestore()
                .collection('Metaaddress')
                .doc(auth().currentUser.uid)
                .set({

                    MetaAddress: Address,
                    AppAdd: "0x2d33ED59a1a483b557669CeE2a06655DB85f2f69",

                })

                .then(() => {
                    console.log('address add');
                });

        } catch (error) {
            console.log(error, 'firebase collection err')

        }







    }


    firestore()
        .collection('Metaaddress')
        .doc(auth().currentUser.uid)
        .get()
        .then(querySnapshot => {
            setAppAdd(querySnapshot._data.AppAdd)
            setuserAdd(querySnapshot._data.MetaAddress)


            // console.log(userAdd)

        });


    firestore()
        .collection('Coin')
        .doc(auth().currentUser.uid)
        .get()
        .then(querySnapshot => {
            // console.log(querySnapshot._data.Coin)
            setbackendcoin(querySnapshot._data.Coin)
            //  console.log(coin, "coin")
        });



    const convert = async () => {

        { setEth(0.0001 / 100 * Coin).toFixed(2) }
        //  console.log(Eth,"eth")


    }




    return (
        <View style={{ backgroundColor: '#AAEAFF', flex: 1 }}>
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
                            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white', width: "90%", textAlign: 'center' }}>
                                Connect Wallet</Text>
                        </View>
                    </View>
                </View>

            </View>
            <View style={{ alignItems: 'center', marginTop: 50, }}>

                <TouchableOpacity

                    style={[styles.roundButton2, { height: 320 }]}>
                    <Image
                        style={{
                            width: 120,
                            height: 120,
                            //marginHorizontal: 10,
                        }}
                        source={require('../assests/image/meta.png')}
                    />
                    <Text style={{ fontSize: 24, textAlign: "center", fontWeight: 'bold', color: '#004aad', textAlign: 'center' }}>MetaMask</Text>
                    <Text style={styles.text2}>Paste your Wallet Address here.</Text>


                    <TextInput
                        style={[styles.input, { margin: 12, }]}
                        onChangeText={(Address) => setAddress(Address)}
                        // value={number}
                        placeholder="MetaMask Address"
                    // keyboardType="numeric"
                    />

                    <Button style={{ marginBottom: 15, borderRadius: 20, width: '50%', marginHorizontal: 60, alignItems: 'center', color: 'white', marginTop: 150 }} title="Save" color='#004aad' onPress={() => saveaddress()} />
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', marginTop: 20, }}>

                <TouchableOpacity

                    style={styles.roundButton2}>

                    <Text style={{ fontSize: 24, textAlign: "center", fontWeight: 'bold', color: '#004aad', textAlign: 'center' }}>Coin Transfer To Ethereum</Text>

                    <Text style={[styles.text2, { right: 30, marginTop: 10 }]}>Please enter 5000 coin minimum</Text>

                    <TextInput
                        style={[styles.input, { fontWeight: 'bold', fontSize: 15, color: "black" }]}
                        onChangeText={(Coin) => setCoin(Coin)}
                        // value={number}
                        placeholder="Coin"
                        keyboardType="numeric"
                    />


                    <TouchableOpacity
                        onPress={() => convert()}
                    >
                        <Image
                            style={{
                                width: 50,
                                height: 50,
                                //marginHorizontal: 10,
                            }}
                            source={require('../assests/image/trans.png')}
                        />

                    </TouchableOpacity>

                    <View style={[styles.input, { marginBottom: 10, flexDirection: 'row', alignItems: 'center' }]}>

                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: "black" }} > {(Eth)} </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: "black" }} >Ethereum Sepolia</Text>

                    </View>
                    <Button style={{ marginBottom: 15, borderRadius: 20, width: '50%', marginHorizontal: 60, alignItems: 'center', color: 'white', marginTop: 150 }} title="Transfer" color='#004aad' onPress={() => Transtion()} />


                </TouchableOpacity>
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
    roundButton2: {

        width: '90%',

        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        elevation: 20,

    },
    input: {
        height: 45,
        width: 300,
        // margin: 12,
        borderWidth: 2,
        padding: 10,
        borderRadius: 10,
    },
    text2: {
        fontSize: 15,
        color: '#5d90d4',
        fontWeight: 'bold',
        //marginHorizontal: 20,
        // marginBottom: 10,

    },
})

export default Wallet;
