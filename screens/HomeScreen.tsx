import React, { useEffect, useState } from 'react'
import TopBarTabs from '../navigation/TopBarTabs'
import Header from '../components/Header'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL } from '../types/Urls'
import { AppDispatch, RooteState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { setUsersData } from '../redux/slices/DataSlice'
import { collection, doc, DocumentData, getDoc, onSnapshot, QueryDocumentSnapshot, QuerySnapshot, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../constants/firebase'

const HomeScreen = () => {
  const dispatch: AppDispatch = useDispatch()

  const getUsers = async () => {
    const token = await AsyncStorage.getItem('Access_Token')

    const result = await fetch(`${API_URL}getAllUsers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jwttoken: token
      })
    }).then((res) => res.json())
    console.log("HomseScreen", result);
    
    const data = await getDoc(doc(collection(db, "users"), `${result.currentUserId}`))

    if (result.status == 200) {
      setDoc(doc(db, "users", `${result.currentUserId}`), {
        email: result.currentUserEmail,
        lastSeen: serverTimestamp(),
        profilePicture: data?.data()?.profilePicture ? data.data()?.profilePicture : ""
      }, { merge: true })
        .then((res) => {
          console.log(res);
          
        })
        .catch((err) => console.log(err))
    }

    dispatch(setUsersData({ users: result.msg, currentUserId: result.currentUserId, currentUser: result.currentUserEmail }))
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