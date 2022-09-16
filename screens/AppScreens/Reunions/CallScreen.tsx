import { View, Text, Pressable, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import uuid from 'react-native-uuid';
import { Camera, CameraType } from 'expo-camera';
import { io } from "socket.io-client";
import { CHAT_API_URL } from '../../../types/Urls';
import { useSelector } from 'react-redux';
import { RooteState } from '../../../redux/store';
import RNSimplePeer from "react-native-simple-peer";
import { mediaDevices, RTCPeerConnection, RTCIceCandidate, RTCSessionDescription, registerGlobals, } from "react-native-webrtc"


const configuration = { "iceServers": [{ "url": "stun:stun.l.google.com:19302" }] };

let socket: any
const CallScreen = () => {
  
  
  async function enumerateSources() {
  const is =   await mediaDevices.getUserMedia({ video: true, audio: true })
    console.log(is);
    
    if (navigator
      && navigator.mediaDevices
      && typeof navigator.mediaDevices.enumerateDevices === 'function') {
      try {
        /* open a generic stream to get permission to see devices; 
         * Mobile Safari insists */
        const stream = await navigator.mediaDevices.getUserMedia(
          { video: true, audio: true })
        let devices = await navigator.mediaDevices.enumerateDevices()
        const cameras = devices.filter(device => {
          return device.kind === 'videoinput'
        })
        if (cameras.length >= 1) console.log('cameras avail')
        const mics = devices.filter(device => {
          return device.kind === 'audioinput'
        })
        if (mics.length >= 1) console.log('mics avail')

        /* release stream */
        const tracks = stream.getTracks()
        if (tracks) {
          for (let t = 0; t < tracks.length; t++) tracks[t].stop()
        }
        return ({ cameras, mics })
      } catch (error: any) {
        /* user refused permission, or media busy, or some other problem */
        console.error(error.name, error.message)
        return { cameras: [], mics: [] }
      }
    }
    else throw ('media device stuff not available in this browser')
  }


  const [allUsers, setAllUsers] = useState<any>([])
  const [currentUserData, setCurrentUserData] = useState<any>({})
  const [isActiveCamera, setIsActiveCamera] = useState<boolean>(false)
  const getStreams = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync()
    if (status == "granted") {
      setIsActiveCamera(true)
      
    } else {
      setIsActiveCamera(false)
    }


  }




  const userId = useSelector((state: RooteState) => state.dataHandler.currentUserId)
  const getCurrentUser = async () => {
    const result = await fetch(`${CHAT_API_URL}getDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: userId
      })
    }).then((res) => res.json())
    // console.log("current user Result", result);
    setCurrentUserData(result.message)

  }


  useEffect(() => {
    getCurrentUser()
    
    socket = io("https://9fa7-196-75-111-13.eu.ngrok.io")
    console.log("connected");
    
    socket.on("connection", () => console.log("connected"))
    
    
    socket.on("all-users", (users: any) => {
      
      users.map((connectedUsers: any) => {
        setAllUsers((prev: any) => [...prev, connectedUsers])
        
      })
      
    })
    
    
    
  }, [])
  
  const joinRoom = () => {
    enumerateSources()
    // socket.emit("join-room", { roomId: `dededeede`, userId: `${currentUserData._id}`, userFullName: `${currentUserData.firstName} ${currentUserData.lastName}` })
    
    // getStreams()
    
    


  }
  console.log(allUsers[0]);

 

  return (
    <SafeAreaView>
      {isActiveCamera ? (
        <View className='w-full h-full  items-center justify-center'>
          <View className='w-full relative h-2/3 items-center justify-center'>
            <Camera
              type={CameraType.front}
              className={allUsers.length == 1 ? 'w-full h-full' : 'w-44 h-44'}
            >
            </Camera>
            {allUsers.length === 1 ? (
              <View className='absolute bottom-0'>
                <Text className='text-lg text-white'>{allUsers[0].fullName}</Text>
              </View>
            ): (
                <View className='items-center space-y-4 space-x-1 justify-center flex-row flex-wrap'>
                  {allUsers.map((user: any, i: any) => (
                    <View key={i} className='w-44 h-44 border-[1px] border-gray-400 justify-center items-center flex-row flex-wrap'>
                      <Text>{user.fullName}</Text>
                    </View>
                  ))}
                </View>
            )}
          </View>
        </View>
      ) : (
        <View className='w-full h-full items-center justify-center'>
          <Text>Call Id: </Text>
          <Pressable onPress={joinRoom}>
            <View className='w-40 h-10 bg-gray-400 rounded items-center justify-center'>
              <Text className='text-lg text-white'>Call</Text>
            </View>
          </Pressable>

        </View>
      )}


    </SafeAreaView>
  )
}

export default CallScreen