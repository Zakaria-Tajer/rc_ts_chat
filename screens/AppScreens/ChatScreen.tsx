import { View, Text, Image, TextInput, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Feather, Octicons } from '@expo/vector-icons';
import Messenger from '../../components/Chat/Messenger';
import Reciver from '../../components/Chat/Reciver';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RouteParams } from '../../types/RooteTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const ChatScreen = () => {


    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    
    const route = useRoute<RouteProp<RouteParams>>()
    
    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>()


    const NavigateBack = () => {
        navigation.goBack()
        console.log(route.params);
    }


    return (
        <SafeAreaView>
            <View className='bg-gray-200 h-full relative'>
                <View className='w-full bg-white h-20 justify-center pl-4'>
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
                        <View>
                            <Text className='text-xl font-bold'>{route.params?.reciverUserId}</Text>
                            <Text className=''>Typing...</Text>
                        </View>
                    </View>
                </View>

                <View className='space-y-4 mt-5'>

                    <Messenger text={text} />

                    <View className='w-full items-end'>
                        <Reciver text={text} />
                    </View>


                    <View className='items-center'>
                        <Text className='py-1 px-3 rounded-full bg-gray-400' style={{ fontFamily: 'Montserrat-Medium' }}>Hier</Text>
                    </View>

                </View>

                <View className='absolute items-center  flex-row justify-evenly bottom-0 bg-white w-full h-24 border-t-[1px] border-gray-300'>
                    <View className='relative w-[330px]'>
                        <TextInput
                            placeholder='Redigez un message...'
                            className=' w-full py-4 rounded-full pl-5 text-md border-[1px] border-gray-200'
                            style={{ fontFamily: 'Montserrat-Medium' }}
                        />
                        <View className='absolute right-6 top-4'>
                            <Feather name="paperclip" size={28} color="gray" />
                        </View>
                    </View>
                    <View className='py-4 px-4 bg-[#ad0808] rounded-full items-center justify-center'>
                        <Octicons name="paper-airplane" size={24} color="white" />
                    </View>
                </View>






            </View>
        </SafeAreaView>
    )
}

export default ChatScreen