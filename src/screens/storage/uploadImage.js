import { View, Text, Linking, ActivityIndicator, StatusBar, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import storage from '@react-native-firebase/storage';
import { launchCamera, launchImageLibrary, } from 'react-native-image-picker';
import { useTheme } from '@react-navigation/native';
import ImageLoading from '../../components/imageLoading';
import CustomButton, { CustomButton2 } from '../../components/customButton';
import { CodeSnippet } from '../../components/codeSnippet';
import { fontSize } from '../../components/fontSize';
import ShowIndicator from '../../components/ShowIndicator';
import { underline } from '../../components/underline';
import { linkInText } from '../../components/link';
import { TextInput } from '../../components/textInput';
import toast from '../../components/toast';
import Title from '../../components/Title';
import SubBoxText from '../../components/boxText';
import auth from '@react-native-firebase/auth'
import CollapsableCard from '../../components/collapsableCard';
import { BannerStorage } from '../../admob/adUnitId';
import BN from '../../components/bottomNavigation';

let Upload = () => {

    const { colors } = useTheme()

    const [imageURI, setImageURI] = useState("")
    const [imageName, setImageName] = useState('')

    const [downloadURL, setDownloadURL] = useState('')

    const [disabled, setdisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(0)
    const [totalFileSize, setTotalFileSize] = useState(0)
    const [button, setButton] = useState(false)

    const uploadImage = () => {

        setLoading(true)
        setdisabled(true)

        storage().ref(`Users/${imageName}`).putFile(imageURI.uri).then((user) => {
            setLoading(false)
            setUploading(((user.bytesTransferred) / 1048576).toFixed(2))
            setTotalFileSize(((user.totalBytes) / 1048576).toFixed(2))

            storage().ref('Users/').child(imageName).getDownloadURL().then(user => {
                setDownloadURL(user);
                setdisabled(false)
            })
        }).catch((err) => {
            setLoading(false)
            alert(err.message)
        })
    }


    const ImageLibrary = async () => {
        await launchImageLibrary({
            mediaType: 'photo',
            includeBase64: true,
            selectionLimit: 1,
            maxHeight: 400,
            maxWidth: 400,
            quality: 1
        }).then(user => {
            if (user) {
                setImageURI(user.assets[0])
                setButton(true)
            }
        })
    }

    const Camera = async () => {
        await launchCamera({
            mediaType: 'photo',
            includeBase64: true,
            durationLimit: 5,
            cameraType: 'back',

        }).then(user => {
            if (user) {
                setImageURI(user.assets[0])
                setButton(true)
            }
        })
    }

    return (
        <View>
            <View style={{ alignItems: 'center' }}>
                <ImageLoading backgroundColor={colors.background} uri={imageURI.uri} height={150} width={150} />
            </View>
            <TextInput style={{ textAlign: "center", width: '100%' }} label={'Enter Image Name'} onChangeText={setImageName} />
            <View style={{ flexDirection: 'row' }}>
                <CustomButton flex={1} onPress={() => ImageLibrary()} title='Pick Image' />
                <CustomButton flex={1} onPress={() => Camera()} title='Open Camera' />
            </View>

            {loading ? <View>
                <Text style={{ color: colors.mainText, textAlign: 'center' }}>{uploading + " mb " + '/' + totalFileSize + " mb"}</Text>
                <ActivityIndicator size={'large'} color={colors.primary} />
            </View> : button ? <CustomButton title='Upload' onPress={() => {
                if (imageName.length == 0) {
                    toast('enter image name first')
                } else { uploadImage() }
            }} /> : null}

            <SubBoxText color={colors.background} text={"This image will upload in Users/imageName-folder directory"} />
            <SubBoxText color={'#236d8099'} text={"You can also use this download link in while form filling to save profile photo link or something else in your firestore database"} />
            <SubBoxText color={'#80232399'} text={"Please don't upload any sensetive or personal photo, This is just for your understanding"} />
            <CustomButton2 title='Download Link' color={colors.primary} disabled={disabled} onPress={() => { Linking.openURL(downloadURL) }} />
        </View>
    )
}


let Delete = () => {

    const { colors } = useTheme()

    const [deleteImageName, setDeleteImageName] = useState('')


    const delteImage = async () => {
        await storage().ref(`Users/${deleteImageName}`).delete().then(work => toast('item deleted')).catch((error) => {
            alert(error.message)
        })
    }

    return (
        <View>
            <Text style={{ color: colors.mainText, fontSize: fontSize.subtitle }}></Text>

            <SubBoxText color={colors.background} text={"You can delete content in your firebase storage within your app by using .delete() method"} />

            <SubBoxText color={'#80362999'} text={"Please don't delete these {'user-0-5'} images, these for your help/Guidance"} />
            <TextInput style={{ textAlign: "center", width: '100%' }} label={'Enter Image Name'} onChangeText={setDeleteImageName} />
            <CustomButton2 title='Delete Image' color={colors.primary} onPress={() => { delteImage() }} />
        </View>
    )
}


const UploadImage = () => {

    const { colors } = useTheme()

    const [userList, setUserList] = useState([])

    const listItem = () => {
        storage().ref().child('Users/').listAll()
            .then(res => {
                setUserList([])
                res.items.forEach((item) => {
                    item.getDownloadURL().then(user => {
                        setUserList((re) => [...re, { name: item.name, link: user }].sort())
                    })
                })
            })
            .catch(err => {
                alert(err.message);
            })
    }

    let List = () => {
        return (
            <View>
                <Text style={{ color: colors.mainText, fontSize: fontSize.subtitle }}></Text>

                <SubBoxText color={colors.background} text={"This list show you all content stored in your firebase storage cloud"} />
                <CustomButton2 title='Show List..?' color={colors.primary} onPress={() => { listItem() }} />
                <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
                    {userList.map(((u, i) => {
                        return <TouchableOpacity key={i} onPress={() => { Linking.openURL(u.link) }} style={{ width: "40%", backgroundColor: colors.card, margin: 10, padding: 10, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
                            <ImageLoading uri={u.link} width={100} height={100} />
                            <Text style={{ color: colors.mainText }}>{u.name}</Text>
                        </TouchableOpacity>
                    }))}
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
            <ScrollView style={{ flex: 1 }} >
                <Title text={auth().currentUser ? `${auth().currentUser.email}` : 'no user signed In'} />
                <Title text={'Live demonstration of how Firebase Storage works'} />

                <CollapsableCard data={<Upload />} title={'Show Image Upload'} />
                <CollapsableCard data={<Delete />} title={'Show Image Delete'} />
                <CollapsableCard data={<List />} title={'Show List'} />

            </ScrollView >
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <BannerStorage />
            </View>
        </View>
    )
}

const Guidance = () => {

    const { colors } = useTheme()

    const s = StyleSheet.create({
        textStyle: {
            fontSize: fontSize.mainTitle,
            paddingVertical: 10,
            backgroundColor: colors.card,
            padding: 10,
            color: colors.mainText,
            paddingTop: StatusBar.currentHeight
        },
        otheruse: {
            fontSize: fontSize.subtitle,
            padding: 10,
            paddingBottom: 0,
            color: colors.mainText,
        },
    });

    let upload = `async ()=> {
    await storage().ref('Users/<imageName>').putFile('<imageUri-local>')
}`

    let task = `async ()=> {
await storage().ref('Users/<imageName>').putFile('<imageUri>').then((user) => {
    console.log(user.bytesTransferred),
    console.log(user.totalBytes)
})`

    let list = `async ()=> {
    await storage().ref().child('Users/').listAll().then(result => {

    result.items.forEach(userData => {

        userData.getDownloadURL().then(downloadLink => { 
        // i use this userData.getDownloadURL() separate, 
        // i want to convert promise object to string value
        
            setUserList((re) => [...re, { name: userData.name, link: downloadLink }])
        })
    })
}).catch(err => {
    alert(err.message);
})`

    let multipleBucket = `import storage, { firebase } from '@react-native-firebase/storage';

const defaultStorageBucket = storage();
const secondaryStorageBucket = firebase.app().storage('gs://my-secondary-bucket.appspot.com');`

    let deleteImage = `async () => {
    await storage().ref(Users/<ImageName>).delete()
}`

    return (
        <View style={{ flex: 1 }}>

            <ScrollView style={{ flex: 1 }} stickyHeaderIndices={[0, 6, 8, 11, 14, 18]} >

                <View><Text style={s.textStyle}>Upload Image</Text></View>

                <Text style={[s.otheruse, { fontWeight: 'bold' }]}>In nested folders path</Text>
                <Text style={s.otheruse}>upload images in nested folder you have to put your folder path {underline('ref("images/<fileName>")')}</Text>

                <Text style={[s.otheruse, { fontWeight: 'bold' }]}>In home location</Text>
                <Text style={s.otheruse}>upload images in home you have to put empty {underline('ref()')} or you can use empty {underline('ref("/")')}</Text>
                <CodeSnippet data={upload} ViewHeight={110} copyCommand={upload} button />

                <View><Text style={s.textStyle}>Get image</Text></View>
                <Text style={s.otheruse}>you can get image from these dependencies{'\n'}
                    {linkInText('image picker with crop tool', '', 'https://www.npmjs.com/package/react-native-image-crop-picker')}{'\n'}
                    or{'\n'}{linkInText('image picker without crop tool', '', 'https://www.npmjs.com/package/react-native-image-picker')}{'\n'}
                    after installing on of them dependency get image data in the form of {underline('uri')}
                </Text>

                <View><Text style={s.textStyle}>Get Task / options</Text></View>
                <Text style={s.otheruse}>you can get the information from storage(), file total size , total size uplaoded etc...</Text>
                <CodeSnippet data={task} ViewHeight={160} copyCommand={task} button />

                <View><Text style={s.textStyle}>Get List</Text></View>
                <Text style={s.otheruse}>you can get list of all items in your firebase storage cloud by using {underline('.listAll()')} method{'\n'}You can explore more which information this module hold related to firebase storage</Text>
                <CodeSnippet data={list} ViewHeight={360} copyCommand={list} />

                <View><Text style={s.textStyle}>Multiple Buckets</Text></View>
                <Text style={s.otheruse}>This is a paid feature</Text>
                <Text style={s.otheruse}>A single Firebase project can have multiple storage buckets. The module will use the default bucket if no bucket argument is passed to the storage instance. To switch buckets, provide the module with the gs:// bucket URL found on the Firebase Console, under Storage {'>'} Files.</Text>
                <CodeSnippet data={multipleBucket} ViewHeight={140} copyCommand={multipleBucket} button />

                <View><Text style={s.textStyle}>Delete Image</Text></View>
                <Text style={s.otheruse}>You can delete content in your firebase storage within your app by using .delete() method</Text>
                <CodeSnippet data={deleteImage} ViewHeight={110} copyCommand={deleteImage} button />

            </ScrollView >

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <BannerStorage />
            </View>

        </View>
    )
}

const Guide = () => {
    const [delay, setDelay] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setDelay(true)
        }, 10);
    }, [])

    if (!delay) {
        return <ShowIndicator />
    } else {
        return <Guidance />
    }
}


const Data = () => {

    return (
        <BN fc={UploadImage} sc={Guide} />
    );
}

export default Data