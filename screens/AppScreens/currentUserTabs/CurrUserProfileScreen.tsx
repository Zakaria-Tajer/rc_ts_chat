import { View, Text, Pressable, Image, TextInput, Alert, Dimensions, Platform } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { RouteParams } from '../../../types/RooteTypes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { API_URL } from '../../../types/Urls';
import { useSelector } from 'react-redux';
import { RooteState } from '../../../redux/store';


type ProfileProps = NativeStackScreenProps<RouteParams, 'currentUserProfile'>;


const CurrUserProfileScreen = ({ route, navigation }: ProfileProps) => {


    const currentUserEmail = useSelector((state: RooteState) => state.dataHandler.currentUser)

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
                Alert.alert(result.msg)
            }

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
                        source={{ uri: 'https://images.pexels.com/photos/948873/pexels-photo-948873.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }}
                        className='w-full h-full bg-cover bg-center'
                    />
                    <Pressable className='w-full'>
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