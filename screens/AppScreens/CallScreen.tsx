import { View, Text, TextInput, FlatList, Image, ScrollView, Keyboard, KeyboardAvoidingView, Platform, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Feather, AntDesign, Entypo, FontAwesome, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RooteState } from '../../redux/store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RouteParams } from '../../types/RooteTypes';
import { addDoc, collection, doc, DocumentData, getDoc, onSnapshot, query, QueryDocumentSnapshot, QuerySnapshot, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { API_URL, CHAT_API_URL } from '../../types/Urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPressedUsers, setUsersData } from '../../redux/slices/DataSlice';
import { db } from '../../constants/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getUserChatDetails } from '../../redux/slices/chatSlice';




type ProfileProps = NativeStackScreenProps<RouteParams, 'HomeScreen'>;

const CallScreen = ({ route, navigation }: ProfileProps) => {


  const textInputRef = useRef<TextInput>(null)
  const currentUser = useSelector((state: RooteState) => state.dataHandler.currentUser)
  const currentUserId = useSelector((state: RooteState) => state.dataHandler.currentUserId)
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [imagesData, setImagesData] = useState<any>([])
  const userDetails = useSelector((state: RooteState) => state.dataHandler)

  const imagesDataArray: Array<any> = []
  const dispatch: AppDispatch = useDispatch()

  const getCurrentUser = async () => {
    const result = await fetch(`${CHAT_API_URL}getDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: userDetails.currentUserId!
      })
    }).then((res) => res.json())
    // console.log("current user Result", result);



  }


  const usersQuery = query(collection(db, "users"), where("email", "!=", currentUser))
  const [messagesSnapshot] = useCollection(usersQuery)

  const getAllProfilePicture = async () => {
    const snaps = messagesSnapshot?.docs.find((user) => {
      return user.data()
    })
    // console.log(snaps?.data()?.profilePicture);
    if (snaps?.data()?.profilePicture === undefined || snaps?.data()?.profilePicture == "") {
      setImagesData(
        {
          profilePicture: "",
          email: snaps?.data()?.email
        }
      )
    } else {
      setImagesData(
        {
          profilePicture: snaps?.data()?.profilePicture,
          email: snaps?.data()?.email
        }
      )
    }
  }





  useEffect(() => {
    getAllProfilePicture()
    getCurrentUser()
    // updateInfos()
    // getProfilePic()
    // const keyboardDidShowListener = Keyboard.addListener(
    //   'keyboardDidShow',
    //   () => {
    //     setKeyboardVisible(true); // or some other action
    //   }
    // );
    // const keyboardDidHideListener = Keyboard.addListener(
    //   'keyboardDidHide',
    //   () => {
    //     setKeyboardVisible(false); // or some other action
    //     console.log('hidden');
    //   }
    // );

    // return () => {
    //   keyboardDidHideListener.remove();
    //   keyboardDidShowListener.remove();
    // };
  }, [currentUserId]);


  console.log(imagesData);


  const handleSearch = async (keyword: string) => {
    console.log(keyword);

    const result = await fetch(`${API_URL}searchProfile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        searchedKeyword: keyword
      })
    }).then((res) => res.json())
    console.log(result);

  }

  const userChatRef = query(collection(db, 'chats'), where("users", 'array-contains', currentUser))
  const [chatsSnapShot] = useCollection(userChatRef)

  const chatAlreadyExists = () =>
    !!chatsSnapShot?.docs.find(
      (chat: QueryDocumentSnapshot<DocumentData>) =>
        chat.data().users.find((user: any) => user === email)?.length > 0
    )


  const dbRef = collection(db, 'chats')

  const getUserChatPressed = async (userId: string, profileImage: any) => {

    const token = await AsyncStorage.getItem("Access_Token")
    const result = await fetch(`${CHAT_API_URL}getDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: userId,
        token
      })
    }).then((res) => res.json())
    if (result.status == 200) {
      setEmail(result.message.email)

      const snaps = chatsSnapShot?.docs.find(
        (chat: QueryDocumentSnapshot<DocumentData>) =>
          chat.data().users.find((user: any) => user === result.message.email
          ))

      dispatch(getPressedUsers({ pressedUser: result.message, pressedUserEmail: result.message.email }))
      dispatch(getUserChatDetails({
        chatId: snaps?.id,
        chatUsers: snaps?.data().users
      }))
    }

    if (!chatAlreadyExists()) {
      addDoc(dbRef, {
        users: [currentUser, email]
      })
        .then(res => {
          console.log(`new DocumentData: ${res.id}`)
        })
        .catch(err => console.log(err))
    } else {
      console.log('Already added');

    }

    navigation.navigate("ChatScreen", {
      imageProfileUrl: profileImage
    });


  }



  const getUserProfile = (UserId: string, profileImage: string, firstName: string, lastName: string, email: string) => {

    navigation.navigate("usersProfile", {
      contactUserId: UserId,
      imageProfileUrl: profileImage,
      firstName: firstName,
      lastName: lastName,
      email: email
    })

  }


  return (
    <View className='w-full bg-white h-full relative'>
      <View className='h-24 justify-center items-center flex-row relative '>
        <TextInput
          className='w-11/12 bg-white py-3 rounded-full pl-8 border-[1px] border-gray-400'
          placeholder='Rechercher une contact'
          style={{ fontFamily: 'Montserrat-Medium' }}
          ref={textInputRef}
          onChangeText={contact => handleSearch(contact)}
        />
        <View className='absolute right-10'>
          <Feather name="search" size={24} color="black" />
        </View>

      </View>

      <View className='h-4/6  overflow-hidden'>
        <FlatList
          keyExtractor={(item) => item._id}
          data={userDetails.users}
          renderItem={({ item }) => (
            <ScrollView style={{ width: '100%' }}>
              <Pressable onPress={() => getUserChatPressed(item._id, item.ProfileImage)}>
                <View className='flex-row justify-between mb-2 border-b-2 border-gray-300 py-3'>
                  <View className='flex-row items-center space-x-2'>
                    <Pressable key={item._id} onPress={() => getUserProfile(item._id, item.ProfileImage, item.firstName, item.lastName, item.email)}>
                      <View className='w-12 h-12 bg-white ml-4 mt-2 rounded-full'>
                        <Image
                          source={{ uri: item.ProfileImage  ? item.ProfileImage : 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
                          className='w-fit rounded-full h-full object-contain'
                        />
                      </View>
                    </Pressable>
                    <View className='space-y-1'>
                      <Text className='text-base' style={{ fontFamily: 'Montserrat-Medium' }}>{item.firstName}{" "}{item.lastName}</Text>
                      <Text className='' style={{ fontFamily: 'Montserrat-Medium' }}>{item.nums} <Text className='underline underline-offset-8 text-red-600'>Numero Sip</Text></Text>
                    </View>
                  </View>
                  <View className='space-x-6 flex-row h-full items-center justify-end pr-4 w-1/2 mt-1.5'>
                    <AntDesign name="videocamera" size={24} color="gray" />
                    <Entypo name="mobile" size={24} color="gray" />
                    <Entypo name="chevron-right" size={24} color="gray" />
                  </View>
                </View>
              </Pressable>
              <TextInput

                ref={textInputRef}
                className="hidden"
              />
            </ScrollView>

          )}
        />
      </View>
      <View className='h-1/6 space-x-8 items-center  justify-center flex-row'>
        <View>
          <Octicons name="three-bars" size={30} color="gray" />
        </View>
        <TouchableOpacity>
          <View className='px-5 py-5 rounded-full'>
            <MaterialCommunityIcons name="video-outline" size={30} color="#ad0808" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity >
          <View className='px-5 py-4 rounded-full bg-[#ad0808]'>
            <FontAwesome name="phone" size={30} color="white" />
          </View>
        </TouchableOpacity>
        <View>
          <Octicons name="three-bars" size={30} color="gray" />
        </View>

      </View>

    </View>
  )
}

export default CallScreen






