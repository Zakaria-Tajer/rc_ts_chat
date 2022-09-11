import { View, Text, StyleSheet, Pressable, TextInput, KeyboardAvoidingView, GestureResponderEvent } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { Fontisto, EvilIcons } from '@expo/vector-icons';
import { AuthSwitch, StackSwitch } from '../../redux/slices/SwitchSlice';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RouteParams } from '../../types/RooteTypes';
import AuthLayout from '../../Layouts/Layout';
import { API_URL } from '../../types/Urls';
import { isValidBool, isValidUser } from '../../constants/isValidUser';



const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(6, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
});

export const Login = () => {

    useEffect(() => {
        isValidUser()
        if (isValidBool == true) dispatch(StackSwitch({ users: true }))
    }, [])


    const dispatch: AppDispatch = useDispatch()
    const [isErrors, setIsErrors] = useState<boolean>(false)

    const Inscription = () => {
        dispatch(AuthSwitch({ switchForm: true }))
    }

    const login = async (values: any) => {

        const result = await fetch(`${API_URL}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: values.email,
                password: values.password,
            })
        }).then((res) => res.json())
        .catch(err => console.log(err))
        console.log(result);
        const { Message, Token } = result
        if (Message == 'success') {

            await AsyncStorage.setItem('Access_Token', Token)
            dispatch(StackSwitch({ users: true }))
        } else {
            setIsErrors(true)
        }
    }

    return (
        <AuthLayout>
            <KeyboardAvoidingView style={styles.formContainer}>
                <View style={styles.switcherContainer}>
                    <Text style={styles.switch} >CONNEXION</Text>
                    <Text onPress={Inscription} style={{ paddingLeft: 20, fontFamily: 'Montserrat-Medium', fontSize: 13, paddingBottom: 3, color: 'white' }}>INSCRIPTION</Text>
                </View>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={SignupSchema}
                    onSubmit={values =>
                        login(values)
                        // console.log(values)

                    }
                >
                    {({ handleChange, handleSubmit, handleBlur, values, errors, touched }) => (
                        <><View style={styles.inputsContainer}>

                            <View style={styles.inputs}>
                                <TextInput
                                    placeholder="Email"
                                    placeholderTextColor={'gray'}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    style={styles.inputsPlaceholder}

                                />
                                <View style={styles.icons}>
                                    <Fontisto name="email" size={24} color="gray" />
                                </View>
                                {
                                    errors.email && touched.email ?
                                        (
                                            <View style={styles.errorMsgContainer}>
                                                <Text style={styles.errorMsg}>{errors.email}</Text>
                                            </View>
                                        )
                                        : null
                                }
                            </View>
                            <View style={styles.inputs}>
                                <TextInput
                                    placeholder="Mot de passe"
                                    placeholderTextColor={'gray'}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    style={styles.inputsPlaceholder}
                                    secureTextEntry

                                />
                                <View style={styles.icons}>
                                    <EvilIcons name="unlock" size={36} color="gray" />
                                </View>

                            </View>
                            {isErrors ? <View className='w-10/12 mt-7 h-8 border-[#ad0808] mb-4 border-2 rounded-lg justify-center items-center'>
                                <Text className='text-[#ad0808]' style={{ fontFamily: 'Montserrat-Medium', fontWeight: '600' }}>Identifiant ou mot de passe incorrect</Text>
                            </View> : null}
                            <View className={`w-full justify-center items-center h-fit  space-y-4 ${isErrors ? 'mt-2' : 'mt-10'}`}>
                                <Pressable onPress={handleSubmit}>
                                    <View className='w-44 h-[65px] bg-[#ad0808] rounded-full items-center justify-center'>
                                        <Text className='text-white font-semibold' style={{ fontFamily: 'Montserrat-Medium' }}>Connexion</Text>
                                    </View>
                                </Pressable>
                                <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 16, color: '#606060' }}>J'ai oublie mon mot de passe</Text>
                            </View>

                        </View>

                            <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center' }}>
                                <Pressable>
                                    <View style={styles.secBtn}>
                                        <Text style={{ color: '#ad0808', fontFamily: 'Montserrat-Medium', fontWeight: '500', fontSize: 16 }}>Nouveau sur Houay ?</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </>
                    )}

                </Formik>
            </KeyboardAvoidingView>

        </AuthLayout>
    )
}






const styles = StyleSheet.create({

    formContainer: {
        width: '100%',
        height: '90%',
        paddingLeft: 20,
        paddingTop: 40
    },
    switcherContainer: {
        flexDirection: 'row',
    },
    switch: {
        borderBottomWidth: 3,
        fontFamily: 'Montserrat-Medium',
        fontSize: 13,
        paddingBottom: 5,
        color: 'white',
        borderColor: 'white'
    },
    inputsContainer: {
        marginTop: 20,
        width: '95%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        height: 380,
        borderRadius: 10,
        alignItems: 'center',
        paddingTop: 20
    },
    inputs: {
        paddingVertical: 20,
        borderBottomWidth: 2,
        borderColor: 'gray',
        width: '90%',
        marginTop: 10,
        fontSize: 1
    },
    icons: {
        position: 'absolute',
        right: 0,
        bottom: 20
    },
    button: {
        width: 190,
        height: 65,
        backgroundColor: '#ad0808',
        marginTop: 80 ? 40 : 50,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    secBtn: {
        width: 240,
        height: 60,
        borderRadius: 40,
        marginTop: 20,
        borderColor: '#ad0808',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputsPlaceholder: {
        fontSize: 16,
        fontFamily: 'Montserrat-Medium'
    },
    errorMsg: {
        color: 'red'
    },
    errorMsgContainer: {
        width: '100%',
        justifyContent: 'flex-start',
        paddingLeft: 15,
        paddingTop: 3,
        position: 'absolute',
        bottom: -25,
        left: -15
    }


});