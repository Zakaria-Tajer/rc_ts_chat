import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ResetPassword from '../components/Auth/ResetPassword'

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <ResetPassword />
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})