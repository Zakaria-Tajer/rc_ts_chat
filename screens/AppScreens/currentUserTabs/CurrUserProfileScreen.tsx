import { View, Text, Pressable, Image, TextInput, Alert, Dimensions, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { RouteParams } from '../../../types/RooteTypes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { API_URL } from '../../../types/Urls';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RooteState } from '../../../redux/store';
import * as DocumentPicker from 'expo-document-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../../constants/firebase';
import { convertToBlob } from '../../../utils/StorageFiles';
import { collection, serverTimestamp, doc, setDoc, getDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { setUsersData } from '../../../redux/slices/DataSlice';


type ProfileProps = NativeStackScreenProps<RouteParams, 'currentUserProfile'>;


const CurrUserProfileScreen = ({ route, navigation }: ProfileProps) => {
    const dispatch: AppDispatch = useDispatch()
    const [userId, setUserId] = useState<string>('')
    const [userImage, setUserImage] = useState<string>('')
    const currentUserEmail = useSelector((state: RooteState) => state.dataHandler.currentUser)
    const currentUserId = useSelector((state: RooteState) => state.dataHandler.currentUserId)
    const [isUpdated, setIsUpdated] = useState<boolean>(false)



    const getProfilePic = async () => {
        // onSnapshot(collection(db, "users"), (snapShot) => {
        //     // console.log(snapShot.docs);
        //     snapShot.docs.map((doc) => ({
        //         id: doc.id,
        //         ...doc.data()
        //     })).map((snap) => {
        //         console.log({ ...snap });
        //         dispatch(setUsersData({ dataArrayPairs: [{ userId: snap.id, userData: { ...snap } }] }))
        //     })
        // })
        const Profile = doc(collection(db, "users"), `${currentUserId}`)
        const ProfileResponses = await getDoc(Profile)

        if (ProfileResponses.data()?.profilePicture !== undefined) {
            setUserImage(ProfileResponses.data()?.profilePicture)
            setIsUpdated(!isUpdated)
        } else {
            console.log('cannot update Profile Image');

        }
    }

    useEffect(() => {
        getProfilePic()
        setUserId(currentUserId as any)
    }, [currentUserId, isUpdated])


    const [name, setName] = useState<string>('')
    const [entreprise, setEntreprise] = useState<string>('')
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [secondPhoneNumber, setSecondPhoneNumber] = useState<string>('')
    const [tel_Set, setTel_SET] = useState<string>('')

    const updateProfile = async () => {
        if (name === "" && entreprise === "" && phoneNumber === "" && secondPhoneNumber === "" && tel_Set === "") {
            Alert.alert("Please complete the fields below")
        } else {
            const result = await fetch(`${API_URL}updateProfile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: currentUserEmail,
                    firstName: name,
                    entreprise: entreprise,
                    phoneNumber: phoneNumber,
                    Tele_Sip: tel_Set,
                    secondNumber: secondPhoneNumber

                })
            }).then((res) => res.json())
            console.log(result);
            if (result.msg == 'Profile updated') {
                setIsUpdated(!isUpdated)
                Alert.alert(result.msg)
            }

        }

    }

    const UpdateProfileImage = async () => {
        const docs = await DocumentPicker.getDocumentAsync({
            type: 'image/*',
        })
        console.log(docs);

        const { name, uri } = docs as DocumentPicker.DocumentResult | any
        const fileRef = ref(storage, `userProfile/${currentUserId}-${name}`);
        const uploaded = await uploadBytes(fileRef, await convertToBlob(uri))
        if (uploaded) {

            await getDownloadURL(uploaded.ref).then(async (url) => {
                await setDoc(doc(db, "users", `${userId}`), {
                    profilePicture: url,
                    lastSeen: serverTimestamp()
                }, { merge: true })
                    .then(async () => {
                        await fetch(`${API_URL}updateProfile`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                email: currentUserEmail,
                                ProfileImage: url
                            })
                        }).then((res) => res.json())
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })




        }
    }

    return (
        <SafeAreaView>
            <View className='w-full h-full bg-gray-100'>
                <View className='w-full h-56 bg-white relative items-center justify-center'>
                    <View className='absolute top-0 flex-row justify-between pt-3 px-4 z-10 w-full'>
                        <Pressable onPress={() => {
                            navigation.goBack()
                        }}>
                            <AntDesign name="arrowleft" size={30} color="black" />
                        </Pressable>
                        <Text className='text-lg' style={{ fontFamily: 'Montserrat-Medium', fontWeight: "600" }}>MODIFIER</Text>
                        <Ionicons name="checkmark" size={24} color="red" />
                    </View>
                    <Image
                        source={{ uri: userImage !== "" ? userImage : 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
                        className='w-full h-full bg-cover bg-center'
                    />
                    <Pressable className='w-full' onPress={UpdateProfileImage}>
                        <View className='w-16 h-16 bg-white absolute -bottom-7 right-8 rounded-full items-center justify-center shadow-2xl'>
                            <MaterialIcons name="photo-filter" size={36} color="black" />
                        </View>
                    </Pressable>
                </View>


                <View className='w-full mt-10 h-fit space-y-4'>
                    <View className='w-full'>
                        <View className='flex-row  items-center bg-white py-4 pl-10 space-x-10 border-t-[1px] border-b-[1px] border-gray-300'>
                            <Text style={{ fontFamily: 'Montserrat-Medium', fontWeight: '700' }} className='text-[#ad0808]'>NOM</Text>
                            <TextInput
                                placeholder='Serge'
                                style={{ fontFamily: 'Montserrat-Medium' }}
                                className='w-1/2 text-base'
                                onChangeText={e => setName(e)}
                                maxLength={8}
                            />
                        </View>
                        <View className='flex-row items-center bg-white py-4 pl-10 space-x-10 border-b-[1px] border-gray-300'>
                            <Text style={{ fontFamily: 'Montserrat-Medium', fontWeight: '700' }} className='text-[#ad0808]'>ENTREPRISE</Text>
                            <TextInput
                                placeholder=''
                                style={{ fontFamily: 'Montserrat-Medium' }}
                                className='w-1/2 text-base'
                                onChangeText={e => setEntreprise(e)}
                                maxLength={15}
                            />
                        </View>
                    </View>
                    <View className='w-full'>
                        <View className='flex-row items-center bg-white py-4 pl-10 space-x-10 border-t-[1px] border-b-[1px] border-gray-300'>
                            <Text style={{ fontFamily: 'Montserrat-Medium', fontWeight: '700' }} className='text-[#ad0808]'>TELEPHONE</Text>
                            <TextInput
                                placeholder='01 45 85 65 48'
                                style={{ fontFamily: 'Montserrat-Medium' }}
                                className='w-1/2 text-base'
                                onChangeText={e => setPhoneNumber(e)}
                                maxLength={10}
                                keyboardType='numeric'
                            />
                        </View>
                        <View className='flex-row items-center bg-white py-4 pl-10 space-x-10 border-b-[1px] border-gray-300'>
                            <Text style={{ fontFamily: 'Montserrat-Medium', fontWeight: '700' }} className='text-[#ad0808]'>TEL.SIP</Text>
                            <TextInput
                                placeholder='58 95'
                                style={{ fontFamily: 'Montserrat-Medium' }}
                                className='w-1/2 text-base'
                                keyboardType='numeric'
                                onChangeText={e => setTel_SET(e)}
                                maxLength={4}
                            />
                        </View>
                        <View className='flex-row items-center bg-white py-4 pl-10 space-x-10 border-t-[1px] border-gray-300'>
                            <Text style={{ fontFamily: 'Montserrat-Medium', fontWeight: '700' }} className='text-[#ad0808]'>TELEPHONE 2</Text>
                            <TextInput
                                placeholder=''
                                style={{ fontFamily: 'Montserrat-Medium' }}
                                className='w-1/2 text-base'
                                keyboardType='numeric'
                                onChangeText={e => setSecondPhoneNumber(e)}
                                maxLength={10}
                            />
                        </View>
                    </View>
                </View>

                <View className='w-full mt-5 items-center space-y-4 justify-center'>
                    <Pressable onPress={updateProfile}>
                        <View className='bg-[#ad0808] w-40 py-4 rounded-full items-center justify-center'>
                            <Text className='text-white text-base' style={{ fontFamily: 'Montserrat-Medium', fontWeight: '500' }}>Enregister</Text>
                        </View>
                    </Pressable>
                    <Pressable>
                        <View className='items-center flex-row space-x-2'>
                            <MaterialCommunityIcons name="delete-forever-outline" size={24} color="#ad0808" />
                            <Text className='text-[#ad0808] text-center' style={{ fontFamily: 'Montserrat-Medium', fontWeight: '500' }}>Supprimer le contact</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default CurrUserProfileScreen