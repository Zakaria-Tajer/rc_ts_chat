import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { EvilIcons, Fontisto, AntDesign, Feather } from '@expo/vector-icons';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { AuthSwitch, StackSwitch } from '../../redux/slices/SwitchSlice';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { API_URL } from '../../App';
import { RouteParams } from '../../types/RooteTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthLayout from '../../Layouts/Layout';

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(4, 'Too Short!')
        .max(10, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(3, 'Too Short!')
        .max(10, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phoneNumber: Yup.string()
        .min(10, 'Too Short!')
        .max(10, '')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
});


export const Register = () => {


    const [emailError, setEmailError] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>()
    const dispatch: AppDispatch = useDispatch()
    const [borderColor, setBorderColor] = useState<any>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        image: ''
    })

    const Connexion = () => {
        dispatch(AuthSwitch({ switchForm: false }))
    }

    const register = async (values: any) => {

        const result = await fetch(`${API_URL}register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phoneNumber: values.phoneNumber,
                pass: values.password,
            })
        }).then((res) => res.json())

        console.log(result);
        const { Message, Token } = result
        if (Message == 'Email Already Exists try another one') {
            setEmailError(true)
            setMessage(Message)
        } else if (Message == 'success') {
            async () => {
                try {
                    await AsyncStorage.setItem('Access_Token', Token)
                } catch (e) {
                    console.log(e);   
                }
            }
            dispatch(StackSwitch({ users: true }))
        }

    }



    const switchToLogin = () => {
        dispatch(AuthSwitch({ switchForm: false }))
    }



    return (
        <AuthLayout>
            <KeyboardAvoidingView style={styles.formContainer}>
                <View style={styles.switcherContainer}>
                    <Text onPress={Connexion} style={{ paddingRight: 20, fontFamily: 'Montserrat-Medium', fontSize: 13, paddingBottom: 3, color: 'white' }}>CONNEXION</Text>
                    <Text style={styles.switch}>INSCRIPTION</Text>
                </View>
                <Formik
                    initialValues={{ firstName: '', lastName: '', email: '', phoneNumber: '', password: '' }}
                    validationSchema={SignupSchema}
                    onSubmit={values =>
                        register(values)
                    }
                >
                    {({ handleChange, handleSubmit, handleBlur, values, errors, touched }) => (
                        <>
                            <View style={styles.inputsContainer}>

                                <View style={styles.inputs}>
                                    <TextInput
                                        placeholder="Prenom"
                                        placeholderTextColor={'gray'}
                                        onChangeText={handleChange('firstName')}
                                        onBlur={handleBlur('firstName')}
                                        value={values.firstName}
                                        style={styles.inputsPlaceholder}
                                    />
                                    <View style={styles.icons}>
                                        <AntDesign name="user" size={24} color={borderColor ? borderColor : "gray"} />
                                    </View>
                                    {
                                        errors.firstName && touched.firstName ?
                                            (
                                                <View style={styles.errorMsgContainer}>
                                                    <Text style={styles.errorMsg}>{errors.firstName}</Text>
                                                </View>
                                            )
                                            : null
                                    }
                                </View>
                                <View style={styles.inputs}>
                                    <TextInput
                                        placeholder="Nom"
                                        placeholderTextColor={'gray'}
                                        onChangeText={handleChange('lastName')}
                                        onBlur={handleBlur('lastName')}
                                        value={values.lastName}
                                        style={styles.inputsPlaceholder}

                                    />
                                    <View style={styles.icons}>
                                        <AntDesign name="user" size={24} color={borderColor ? borderColor : "gray"} />
                                    </View>
                                    {
                                        errors.lastName && touched.lastName ?
                                            (
                                                <View style={styles.errorMsgContainer}>
                                                    <Text style={styles.errorMsg}>{errors.lastName}</Text>
                                                </View>
                                            )
                                            : null
                                    }
                                </View>
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
                                            : emailError && (
                                                <View style={styles.errorMsgContainer}>
                                                    <Text style={styles.errorMsg}>{message}</Text>
                                                </View>
                                            )
                                    }
                                </View>
                                <View style={styles.inputs}>
                                    <TextInput
                                        placeholder="Telephone"
                                        placeholderTextColor={'gray'}
                                        onChangeText={handleChange('phoneNumber')}
                                        onBlur={handleBlur('phoneNumber')}
                                        value={values.phoneNumber}
                                        style={styles.inputsPlaceholder}

                                    />
                                    <View style={styles.icons}>
                                        <Feather name="phone-call" size={24} color="gray" />
                                    </View>
                                    {
                                        errors.phoneNumber && touched.phoneNumber ?
                                            (
                                                <View style={styles.errorMsgContainer}>
                                                    <Text style={styles.errorMsg}>{errors.phoneNumber}</Text>
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
                                    // onFocus={() => setBorderColor('red')}

                                    />
                                    <View style={styles.icons}>
                                        <EvilIcons name="unlock" size={36} color="gray" />
                                    </View>
                                    {
                                        errors.password && touched.password ?
                                            (
                                                <View style={styles.errorMsgContainer}>
                                                    <Text style={styles.errorMsg}>{errors.password}</Text>
                                                </View>
                                            )
                                            : null
                                    }
                                </View>

                                <Pressable onPress={handleSubmit} style={styles.button}>
                                    <Text style={{ color: 'white', fontFamily: 'Montserrat-Medium', fontWeight: '600', fontSize: 16 }}>Valider</Text>
                                </Pressable>
                            </View>
                        </>
                    )}

                </Formik>
                <Text style={{ textAlign: 'center', marginTop: 25, fontFamily: 'Montserrat-Medium', color: '#ad0808' }} onPress={switchToLogin}>J'ai deja un compte</Text>
            </KeyboardAvoidingView>
        </AuthLayout>
    )
}


const styles = StyleSheet.create({

    formContainer: {
        width: '100%',
        height: '90%',
        paddingLeft: 20,
        paddingTop: 20
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
        borderColor: 'white',
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
        height: 540,
        borderRadius: 10,
        alignItems: 'center',
        paddingTop: 0
    },
    inputs: {
        paddingVertical: 24,
        borderBottomWidth: 2,
        borderColor: 'gray',
        width: '90%',
        marginTop: 10,
        fontSize: 1,
        position: 'relative'
    },
    icons: {
        position: 'absolute',
        right: 0,
        bottom: 20
    },
    button: {
        width: 160,
        height: 60,
        backgroundColor: '#ad0808',
        marginTop: 30,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputsPlaceholder: {
        fontSize: 15,
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