import { View, Text, Pressable, Alert, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import uuid from 'react-native-uuid';
import { Camera, CameraType } from 'expo-camera';
import { io } from "socket.io-client";
import { CHAT_API_URL } from '../../../types/Urls';
import { useSelector } from 'react-redux';
import { RooteState } from '../../../redux/store';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals
} from 'react-native-webrtc';


let socket: any
const CallScreen = () => {


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

  const [remoteStream, setRemoteStream] = useState<any>(null);
  const [localStream, setLocalStream] = useState<any>(null);
  const [webcamStarted, setWebcamStarted] = useState(false);
  const [channelId, setChannelId] = useState<any>(null);
  const pc = useRef<any>();
  const servers = {
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };



  const startWebcam = async () => {
    pc.current = new RTCPeerConnection(servers);
    const local:any = await mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    pc.current.addStream(local);
    setLocalStream(local);

    const remote:any = new MediaStream();
    setRemoteStream(remote);

    // Push tracks from local stream to peer connection
    local.getTracks().forEach((track: any) => {
      pc.current.getLocalStreams()[0].addTrack(track);
    });

    // Pull tracks from peer connection, add to remote video stream
    pc.current.ontrack = (event: any) => {
      event.streams[0].getTracks().forEach((track: any) => {
        remote.addTrack(track);
      });
    };

    pc.current.onaddstream = (event: any) => {
      setRemoteStream(event.stream);
    };
  };






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
    // socket.emit("join-room", { roomId: `dededeede`, userId: `${currentUserData._id}`, userFullName: `${currentUserData.firstName} ${currentUserData.lastName}` })

    // getStreams()

    startWebcam()

  }






  console.log(localStream?.toURL());






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
            ) : (
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
      {localStream && (
        <RTCView
          streamURL={localStream?.toURL()}
          // style={styles.stream}
          objectFit="cover"
          mirror
        />
      )}


    </SafeAreaView>

  )
}

export default CallScreen

