import { View, Text, Image, TextInput, Pressable, ScrollView, ScrollViewProps } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Feather, Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RouteParams } from '../../types/RooteTypes';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChatUserDetails } from '../../interfaces/Data';
import { addDoc, collection, doc, DocumentData, getDoc, onSnapshot, orderBy, query, QueryDocumentSnapshot, QuerySnapshot, serverTimestamp, setDoc, Timestamp } from "firebase/firestore";
import { RooteState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { db } from '../../constants/firebase';
import getRecipientEmail from '../../utils/getRecipientEmail';
import { useCollection } from 'react-firebase-hooks/firestore';
import Message from '../../components/Chat/Message';


type ProfileProps = NativeStackScreenProps<RouteParams, 'ChatScreen'>;


const ChatScreen = ({ route }: ProfileProps) => {


    const [message, setMessage] = useState<string>('')
    const [userDetails, setUserDetails] = useState<any>([]);
    const [allMsgs, setAllMsgs] = useState<any>([]);
    let arrUserDetails: any = []
    let snapArray: any = []

    const scrollRef = useRef<ScrollView | null>(null)
    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>()
    const currentUser = useSelector((state: RooteState) => state.dataHandler)
    const pressedUser = useSelector((state: RooteState) => state.dataHandler)
    const chatData = useSelector((state: RooteState) => state.chatHandler)
    const NavigateBack = () => {
        navigation.navigate("HomeScreen")
    }


    const ref = doc(collection(db, "chats"), `${chatData.chatId}`)
    const messagesRes = query(collection(ref, "messages"), orderBy('timestamp', "asc"))

    const getChat = async () => {

        onSnapshot(messagesRes, (snapshot: QuerySnapshot<DocumentData>) => {
            snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
                id: doc.id,
                ...doc.data()
            })).map((msg) => {
                snapArray.push(
                    {
                        ...msg,
                        timestamp: Timestamp.fromDate(new Date()).toDate().getTime()
                    }
                )
                setAllMsgs(snapArray)

            })
        })

        const chatRes = await getDoc(ref)
        const chat = {
            id: chatRes.id,
            ...chatRes.data()

        }
        console.log(chat, allMsgs);

    }

    useEffect(() => {
        getChat()

        arrUserDetails.push(pressedUser.pressedUser);
        setUserDetails(arrUserDetails);

    }, [currentUser.currentUser])

    const recipientEmail = getRecipientEmail(chatData.chatUsers, currentUser.currentUser)
    const [messagesSnapshot] = useCollection(messagesRes)



    const showMessage = () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map(message => (
                <Message
                    key={message.id}
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),
                    }}

                />
            ))
        } else {
            snapArray?.map((message: any) => (
                <Message
                    key={message.id}
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),
                    }}

                />
            ))
        }
    }

    const sendMessage = async () => {
        const groupeCollections = collection(ref, "messages")
        setDoc(doc(collection(db, "users"), currentUser.currentUserId), {
            lastSeen: serverTimestamp()
        }, { merge: true })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))


        addDoc(groupeCollections, {
            timestamp: serverTimestamp(),
            message: message,
            user: currentUser.currentUser,
        }).then((res) => console.log(res))
            .catch((err) => console.log(err))


        setMessage("")
    }



    return (
        <SafeAreaView>
            <View className='bg-gray-200 h-full relative'>
                <View className='w-full bg-white  py-2 justify-center pl-4'>
                    <View className='flex-row items-center space-x-3'>
                        <Pressable onPress={NavigateBack}>
                            <AntDesign name="arrowleft" size={28} color="black" />
                        </Pressable>
                        <View className='w-14 h-14 bg-white ml-4 mt-2 rounded-full'>
                            <Image
                                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
                                className='w-fit h-full object-contain'
                            />
                        </View>
                        {userDetails?.map((user: ChatUserDetails) => {
                            return (
                                <View key={user._id.toString()}>
                                    <Text className='text-xl font-bold' >{user.firstName}{" "}{user.lastName}</Text>
                                    <Text className=''>Typing...</Text>
                                </View>
                            )
                        })}
                    </View>
                </View>

                <ScrollView
                    className='mb-4 h-[50%] '
                    ref={scrollRef}
                    onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })
                    }>
                    <>
                        {showMessage()}
                    </>
                </ScrollView>

                <View className='items-center  flex-row justify-evenly bg-white w-full h-fit py-4 border-t-[1px] border-gray-300'>
                    <View className='relative w-3/4'>
                        <TextInput
                            placeholder='Redigez un message...'
                            className=' w-full py-4 rounded-full pl-5 text-md border-[1px] border-gray-200'
                            style={{ fontFamily: 'Montserrat-Medium' }}
                            onChangeText={e => setMessage(e)}
                            value={message}
                        />
                        <View className='absolute right-6 top-4'>
                            <Feather name="paperclip" size={28} color="gray" />
                        </View>
                    </View>
                    <Pressable onPress={sendMessage} disabled={!message}>
                        <View className='py-4 px-4 bg-[#ad0808] rounded-full items-center justify-center'>
                            <Octicons name="paper-airplane" size={24} color="white" />
                        </View>
                    </Pressable>
                </View>






            </View>
        </SafeAreaView>
    )
}

export default ChatScreen