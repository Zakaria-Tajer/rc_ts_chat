import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import { API_URL } from '../../App';
import AuthLayout from '../../Layouts/Layout';



const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(6, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
});


const resetPass = async (values: any) => {
    const result = await fetch(`${API_URL}login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            newPassword: values.newPassword,
            newPassReset: values.newPass,
        })
    }).then((res) => res.json())

    console.log(result);
    
}

const ResetPassword = () => {
    return (
        <AuthLayout>
            <KeyboardAvoidingView style={styles.formContainer}>
                <View style={styles.switcherContainer}>
                    <Text style={styles.switch} >CREATION D'UN NOUVEAU MOT DE PASSE</Text>
                </View>
                <Formik
                    initialValues={{ newPassword: '', newPassReset: '' }}
                    validationSchema={SignupSchema}
                    onSubmit={values => resetPass(values)}
                >
                    {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                        <><View style={styles.inputsContainer}>

                            <View style={styles.inputs}>
                                <TextInput
                                    placeholder="Nouveau mot de passe"
                                    placeholderTextColor={'gray'}
                                    onChangeText={handleChange('newPassword')}
                                    onBlur={handleBlur('newPassword')}
                                    value={values.newPassword}
                                    style={styles.inputsPlaceholder}

                                />
                                <View style={styles.icons}>
                                    <EvilIcons name="unlock" size={36} color="gray" />
                                </View>

                            </View>
                            <View style={styles.inputs}>
                                <TextInput
                                    placeholder="Ressaisir"
                                    placeholderTextColor={'gray'}
                                    onChangeText={handleChange('newPassReset')}
                                    onBlur={handleBlur('newPassReset')}
                                    value={values.newPassReset}
                                    style={styles.inputsPlaceholder}

                                />
                                <View style={styles.icons}>
                                    <AntDesign name="sync" size={24} color="gray" />
                                </View>
                            </View>

                            <Pressable onPress={handleSubmit}>
                                <View style={styles.button}>
                                    <Text style={{ color: 'white', fontFamily: 'Montserrat-Medium', fontWeight: '600', fontSize: 16 }}>Enregistrer</Text>
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

export default ResetPassword


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
        height: 370,
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
        marginTop: 90,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    secBtn: {
        width: 240,
        height: 70,
        borderRadius: 40,
        marginTop: 20,
        borderColor: '#ad0808',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputsPlaceholder: {
        fontSize: 18,
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