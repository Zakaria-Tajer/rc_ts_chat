import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RooteState } from '../redux/store'
import { Register } from '../components/Auth/Register'
import { Login } from '../components/Auth/Login'

const AuthScreen = () => {


  const switcher = useSelector((state: RooteState) => state.switchHandler.switchForm)

  return (

    <>
      {switcher ? <Register /> : <Login />}
    </>

  )
}

export default AuthScreen
