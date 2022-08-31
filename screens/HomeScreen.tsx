import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

import TopBarTabs from '../navigation/TopBarTabs'
import Header from '../components/Header'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL } from '../types/Urls'
import { AppDispatch } from '../redux/store'
import { useDispatch } from 'react-redux'
import { setUsersData } from '../redux/slices/DataSlice'
import BotBarTabs from '../navigation/BotBarTabs'

const HomeScreen = () => {
  const dispatch: AppDispatch = useDispatch()

  const getUsers = async () => {
    const token = await AsyncStorage.getItem('Access_Token')
    console.log(token);
    
    const result = await fetch(`${API_URL}getAllUsers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jwttoken: token
      })
    }).then((res) => res.json())
    if (result.status == 200) {
      dispatch(setUsersData({ users: result.msg, currentUser: result.currentUserEmail }))
      console.log(result);
    }

  }


  useEffect(() => {
    getUsers()

    
  }, [])

  return (
    <>
      <Header />
      <TopBarTabs />
    </>

  )
}

export default HomeScreen