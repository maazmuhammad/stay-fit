import React, { useRef, useEffect, } from 'react';
import { View, StyleSheet, Text, Pressable, Image, ToastAndroid, TouchableHighlight, Alert, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Button } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
// import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import axios from "axios";
import * as Progress from 'react-native-progress';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
const SmartNutrition = () => {
    const [Pic, SetPic] = React.useState('');
    const navigation = useNavigation();
    const [data, setdata] = React.useState([]);
    const [isloading, setisloading] = React.useState(false);

    const setToastMsg = msg => {
        ToastAndroid.showWithGravity(
            msg,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        )
    }

    const uploadImage = () => {
        let options = {
            mediaType: 'photo',
            quality: 1,
            includeBase64: true,
        }
        launchImageLibrary(options, response => {
            if (response.didCancel) {
                setToastMsg('Cancelled image selection')
            } else if (response.errorCode == 'permission') {
                setToastMsg('permission not satisfied')
            } else if (response.errorCode == 'others') {
                setToastMsg(response.errorMessage);
            }
            else if (response.assets[0].fileSize > 2097152) {
                Alert.alert(
                    'Maximum image  size exceeded',
                    'please choose image under 2 MB',
                    [{ text: 'OK' }],
                )
            } else {
                SetPic(response.assets[0].base64);
                // const reference = storage().ref('maazimages');
                // console.log(SetPic,"pic")
            }

        })
    }

    const removeImage = () => {
        SetPic('')
        setToastMsg('Image removed')
    }
    useEffect(() => {

    }, [])


    const UploadtoStorage = async () => {
        // console.log(Pic,"pic url")
        setisloading(true);



        try {
            const reference = await storage().ref('uploadImage' + new Date().getTime());
            await reference.putString('data:image/png;base64,' + Pic, 'data_url');
            const Url = await reference.getDownloadURL();

            console.log(Url)
            if (Url) {


                const { data } = await axios.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBlhJ4hz7I--0bXggs-PjZ72F3g5W9BNB0',
                    {
                        "requests": [
                            {
                                "image": {
                                    "source": {
                                        "imageUri": Url
                                    }
                                },
                                "features": [
                                    {
                                        "type": "LABEL_DETECTION"
                                    }
                                ]
                            }
                        ]

                    }





                )
                console.log(data, 'api response')
                console.log(data.responses[0].labelAnnotations)
                setdata(data.responses[0].labelAnnotations)

                console.log(data.responses[0].labelAnnotations[0])



                const ages = (data.responses[0].labelAnnotations[0])

                if (ages.description === 'Food') {

                    setdata(data.responses[0].labelAnnotations)

                } else {
                    Alert.alert('upload picture is unrelated')
                }



            }

        } catch (error) {
            console.log(error)
        }
        finally { setisloading(false) }








    }

    // useEffect(() => {

    //     console.log(URL,"URL")
    //     console.log(SetPic,'uri')
    // }, []);


    return (
        <View style={{ backgroundColor: '#AAEAFF', flex: 1 }}>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <View style={{ backgroundColor: '#F81250', height: 50, width:'90%', marginTop: 10, borderRadius: 10, marginHorizontal: 20,alignItems: 'center' }}>
                    <Text style={{ fontSize: 34 , fontWeight: 'bold', paddingLeft: 10, color:'white' }}>Smart Nutrition</Text>
                </View>
            </View> */}

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
                            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white', width: "90%", textAlign: 'center' }}>Smart Nutritionist</Text>
                        </View>
                    </View>
                </View>

            </View>

            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <TouchableHighlight
                    onPress={() => uploadImage()}
                    underlayColor='rgba(248,18,80.1)'>
                    {/* <Avatar.Image



                        size={300}
                        source={{ uri: 'data:image/png;base64,' + Pic }}
                        backgroundColor='#d2d2d2'
                       
                        
                    /> */}
                    <View style={styles.Avatar}>
                        {
                            !!Pic
                                ?
                                <Image
                                    source={{ uri: 'data:image/png;base64,' + Pic }}
                                    style={styles.AvatarImage}
                                />

                                :
                                <View style={{alignItems:'center',marginTop:50}}>
                                    <Image
                                        style={{
                                            width: 100,
                                            height: 100,
                                        }}
                                        source={require('../assests/image/upload.png')}
                                    />

                                    <Text style={[styles.AvatarImage, { color: 'blue', textAlign: 'center', fontSize: 24, fontWeight: 'bold' }]}>Upload Image</Text>
                                </View>
                        }

                    </View>
                </TouchableHighlight>
            </View>
            <View style={{ marginTop: 20, alignSelf: 'center', width: 300 }} >
                {/* <Button mode='contained' onPress={() => uploadImage()} style={{ marginRight: 5 , backgroundColor:'#F81250' }}>
                    Upload Image
                </Button>

                <Button mode='contained' onPress={() => removeImage()} style={{backgroundColor:'#F81250' }}>
                    Remove Image
                </Button> */}
                {
                    isloading
                        ?
                        <ActivityIndicator size={'large'} color='#004aad' />
                        :
                        <Button mode='contained' onPress={() => UploadtoStorage()} style={{ backgroundColor: '#004aad' }}>
                            Analyze
                        </Button>
                }
            </View>
            <FlatList
                data={data}

                renderItem={(itemd) => {
                    // console.log(itemd, "itemd")
                    return (
                        <View style={styles.item}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>

                                <Text style={styles.text}>{itemd.item.description}</Text>
                                {/* itemd?item.score
                            && */}
                                <Text style={styles.text}>{Number(itemd.item.score * 100).toFixed()}%</Text>

                            </View>

                            <Progress.Bar color='white' progress={itemd.item.score} width={325} />
                        </View>
                    );



                }}
                // keyExtractor={(item) => {
                //     return item.id;
                // }}
                alwaysBounceVertical={false}

            />






        </View>
    );
}

const styles = StyleSheet.create({
    button1: {
        maxWidth: 30,
        width: 30,
        height: 30,
    },
    Avatar: {
        backgroundColor: 'white',
        height: 300,
        width: 300,
        borderRadius: 300,
        alignItems:'center'
        
    },

    AvatarImage: {
        height: 300,
        width: 300,
        borderRadius: 300,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    item: {
        margin: 8,
        padding: 8,
        borderRadius: 6,
        backgroundColor: '#004aad',

    },

})

export default SmartNutrition;
