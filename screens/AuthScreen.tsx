import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RooteState } from '../redux/store'
import { Register } from '../components/Auth/Register'
import { Login } from '../components/Auth/Login'

import EmailVerificationScreen from './EmailVerificationScreen'
import { StackSwitch } from '../redux/slices/SwitchSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AuthScreen = () => {


  const switcher = useSelector((state: RooteState) => state.switchHandler.switchForm)
  const dispatch: AppDispatch = useDispatch()


  const verifyToken = async () => {
    try {

      const token = await AsyncStorage.getItem("Access_Token")
      const result = await fetch(`192.168.1.9:3000/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token
        })
      }).then((res) => res.json())
      
      console.log(result);




    } catch (error) {
      console.log(error);

    }


  }


  useEffect(() => {
    verifyToken()
  }, [])



  return (

    <>
      {switcher ? <Register /> : <Login />}
      {/* <EmailVerificationScreen /> */}
    </>

  )
}

export default AuthScreen
