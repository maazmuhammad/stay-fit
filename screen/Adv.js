
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Pressable, Image, Text, TouchableOpacity ,Alert} from 'react-native';


import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

import firestore from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth';

import { useNavigation } from '@react-navigation/native';


const adUnitId = TestIds.INTERSTITIAL


const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});


const Adv = () => {
  const [loaded, setLoaded] = useState(false);
  const [coin, setcoin] = useState();
  const navigation = useNavigation();


  useEffect(() => {
    firestore()
      .collection('Coin')
      .doc(auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        // console.log(querySnapshot._data.Coin)
        setcoin(querySnapshot._data.Coin)

        console.log(coin, "coin")
      });


    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;

  }, []);

  // No advert ready to show yet
  if (!loaded) {
    return null;
  }
  const addcoin = () => {
    firestore()
      .collection('Coin')
      .doc(auth().currentUser.uid)
      .update({

        Coin: coin + 50,


      })
      
        Alert.alert("Congratulations!! You get 50 coin ")
      



  }


  return (




    <View style={{ flex: 1, alignItems: "center", backgroundColor: '#AAEAFF' }} >

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ backgroundColor: '#004aad', width: '90%', marginTop: 10, borderRadius: 10, marginHorizontal: 20, padding: '3%' }}>
          <View style={{ flexDirection: 'row', alignContent: 'center' }}>

            <Pressable style={{}}
              onPress={() => navigation.openDrawer()}
            >
              <Image
                style={styles.button1}
                source={require('../assests/image/menu.png')}
              />

            </Pressable>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white', width: "90%", textAlign: 'center' }}>Advertisement</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity

        style={styles.roundButton2}>
        <Image
          style={{
            width: 100,
            height: 100,
            marginBottom: 30,
          }}
          source={require('../assests/image/social.png')}
        />
        <Button
          title="Play Ads"
          onPress={() => {
            interstitial.show();
            addcoin();

          }
          }

        />

      </TouchableOpacity>





    </View>



  );
}

const styles = StyleSheet.create({

  roundButton2: {
    marginTop: 150,
    width: '80%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#004aad',
    elevation: 20,

  },
  button1: {
    maxWidth: 30,
    width: 30,
    height: 30,
    // marginHorizontal: 30,
    //backgroundColor: 'orange'
  },
})

export default Adv;

