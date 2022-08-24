import { View, Text, TextInput, Pressable, TouchableOpacity, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AuthLayout from '../Layouts/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RooteState } from '../redux/store'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RouteParams } from '../types/RooteTypes'
import { StackSwitch } from '../redux/slices/SwitchSlice'
import { UpdateValue } from '../constants/UpadateV'
import { API_URL } from '../types/Urls'
import AsyncStorage from '@react-native-async-storage/async-storage'




const isObjectValid = (obj: any) => {
    return Object.values(obj).every((val: any) => val.trim())
}

const CodeScreen = () => {


    const inputs = new Array(4).fill("")
    let newInputIndex: number = 0



    const dispatch: AppDispatch = useDispatch()
    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>()

    const [otp, setOtp] = useState<object | any>({ 0: '', 1: '', 2: '', 3: '' })
    const [activeOtpIndex, setActiveOtpIndex] = useState<number>(0)
    const [codeError, setCodeError] = useState<boolean>(false)

    const code = useSelector((state: RooteState) => state.switchHandler.verificationCode)

    const inputRef = useRef<TextInput>(null)

    const handleChange = (text: any, index: number): void => {
        const newOTP = { ...otp }
        newOTP[index] = text
        setOtp(newOTP)


        const lastInputIndex = inputs.length - 1

        if (!text) newInputIndex = index === 0 ? 0 : index - 1
        else newInputIndex = index === lastInputIndex ? lastInputIndex : index + 1
        setActiveOtpIndex(newInputIndex)

    }



    useEffect(() => {
        inputRef.current?.focus()
        console.log(code);

    }, [activeOtpIndex])



    const verifyCode = async () => {
        Keyboard.dismiss();
    
            const email = await AsyncStorage.getItem('email_verfication')

            let values: string = ''
            if (isObjectValid(otp)) {

                Object.values(otp).forEach(val => {
                    values += val
                })
            }

            if (values == code) {
                
                const result = await fetch(`${API_URL}Update`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        isValidate: true
                    })
                }).then((res) => res.json())
                console.log(result);
                if (result.Message == 'success') dispatch(StackSwitch({ users: true }))

            } else {
                setCodeError(true)
            }
       

    }



    return (
        <AuthLayout>
            <View className='mt-10 w-full h-full items-center space-y-4'>
                <View className='w-full pl-5 flex-row'>
                    <Text className='w-fit text-white' style={{ borderBottomWidth: 3, borderColor: 'white', paddingBottom: 10 }}>CONTROLE DE VOTRE IDENTITE</Text>
                </View>
                <View className='h-[430px] w-11/12 bg-white rounded-lg'>
                    <View className='w-full  flex-row justify-center space-x-4 flex pt-20 relative'>
                        {inputs.map((_: any, index: any) => {
                            return (
                                <View key={index}>
                                    <TextInput
                                        keyboardType='numeric'
                                        className='w-12 h-12 border-b-2 bg-transparent 
                                            outline-none text-center text-xl border-gray-400 transition'
                                        maxLength={1}
                                        value={otp[index]}
                                        onChangeText={text => handleChange(text, index)}
                                        ref={activeOtpIndex === index ? inputRef : null}
                                    />

                                </View>
                            )
                        })}
                    </View>
                    <View className=' flex items-center'>
                        <Text className='text-center pt-8 text-lg leading-6' style={{ fontFamily: 'Montserrat-Medium' }}>Renseignez le code a 4 chiffres que{"\n"} vous avzez recu par email</Text>
                        {
                            codeError ? (
                                <View className='w-10/12 mt-7 mx-auto h-8 border-[#ad0808] mb-4 border-2 rounded-lg justify-center items-center'>
                                    <Text className='text-[#ad0808]' style={{ fontFamily: 'Montserrat-Medium', fontWeight: '600' }}>Identifiant ou mot de passe incorrect</Text>
                                </View>
                            ) : null
                        }

                    </View>
                    <View className='items-center'>
                        <TouchableOpacity onPress={verifyCode}>
                            <View className='w-44 h-[70px] bg-[#ad0808] mt-8 rounded-full items-center justify-center'>
                                <Text className='text-white font-semibold' style={{ fontFamily: 'Montserrat-Medium' }}>Valider</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </AuthLayout>
    )
}

export default CodeScreen