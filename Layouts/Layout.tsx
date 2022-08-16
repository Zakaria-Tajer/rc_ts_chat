import { View, Text, StyleSheet, Image, ImageBackground, TextInput, Pressable, KeyboardAvoidingView } from 'react-native'
import React, { FC } from 'react'
import { Layouts } from '../interfaces/Layouts';



const AuthLayout = ({ children }: Layouts) => {

    return (
        <ImageBackground source={require('../assets/images/fond.jpg')} style={{width: '100%', height: '100%'}}>
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/images/logo.png')} style={styles.logo} />
                </View>
                {children}
            </KeyboardAvoidingView>
        </ImageBackground>
    )
}

export default AuthLayout


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    logoContainer: {
        width: '100%',
        height: 130,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    logo: {
        width: 800,
        height: '100%',
    },
    formContainer: {
        width: '100%',
        height: '90%',
        paddingLeft: 20,
        paddingTop: 30
      },
      switcherContainer: {
        flexDirection: 'row',
      },
      switch: {
        borderBottomWidth: 3,
        fontFamily: 'Montserrat-Medium',
        fontSize: 13,
        paddingBottom: 3
      },

});