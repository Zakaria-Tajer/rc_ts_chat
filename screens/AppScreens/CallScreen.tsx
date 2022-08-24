import { View, Text, TextInput, FlatList, Image, ScrollView, Keyboard, KeyboardAvoidingView, Platform, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Feather, AntDesign, Entypo, FontAwesome, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RooteState } from '../../redux/store';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteParams } from '../../types/RooteTypes';

const Contacts = [
  { id: 1, number: "0909090900", fullName: 'Jhon Doe', img: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', nums: 'Numero Sip', status: 'Gratuit' },
  { id: 2, number: "0987654321", fullName: 'hum Doe 2', img: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', nums: 'Numero Sip', status: 'Gratuit' },
  { id: 3, number: "1234567890", fullName: 'chan Doe 3', img: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', nums: 'Numero Sip', status: 'Gratuit' },
  { id: 4, number: "1234567890", fullName: 'ase Doe 4', img: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', nums: 'Numero Sip', status: 'Gratuit' },
  { id: 5, number: "1234567890", fullName: 'goerge Doe 4', img: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', nums: 'Numero Sip', status: 'Gratuit' },
  { id: 6, number: "1234567890", fullName: 'ava Doe 4', img: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', nums: 'Numero Sip', status: 'Gratuit' },
  { id: 7, number: "1234567890", fullName: 'max Doe 4', img: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', nums: 'Numero Sip', status: 'Gratuit' },
  { id: 8, number: "1234567890", fullName: 'ashe Doe 4', img: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', nums: 'Numero Sip', status: 'Gratuit' },
  { id: 9, number: "1234567890", fullName: 'courtney Doe 4', img: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', nums: 'Numero Sip', status: 'Gratuit' },
  { id: 10, number: "1234567890", fullName: 'doja Doe 4', img: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', nums: 'Numero Sip', status: 'Gratuit' },
  { id: 11, number: "1234567890", fullName: 'cats Doe 4', img: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', nums: 'Numero Sip', status: 'Gratuit' },

]

const CallScreen = () => {

  const textInputRef = useRef<TextInput>(null)

  const [contacts, setContacts] = useState<any>([])
  const [users, setUsers] = useState<any>([])

  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  const usersList = useSelector((state: RooteState) => state.dataHandler.users)


  // console.log(usersList);
  

  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>()



  useEffect(() => {

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
        console.log('hidden');
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [isKeyboardVisible, contacts]);



  const handleSearch = (keyword: string) => {

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
          data={usersList}
          renderItem={({ item }) => (
            <ScrollView style={{ width: '100%' }}>
              <Pressable onPress={() => {
                navigation.navigate("ChatScreen", {
                  reciverUserId: item._id
                })
              }}>
                <View className='flex-row justify-between mb-2 border-b-2 border-gray-300 py-3'>
                  <View className='flex-row items-center space-x-2'>
                    <View className='w-12 h-12 bg-white ml-4 mt-2 rounded-full'>
                      <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
                        className='w-fit h-full object-contain'
                      />
                    </View>
                    <View>
                      <Text className='text-lg font-bold'>{item.firstName}{" "}{item.lastName}</Text>
                      <Text className=''>{item.nums} <Text className='underline underline-offset-8 text-red-600'>{item.status}</Text></Text>
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
      <View className='h-1/6 flex-1 space-x-8 items-center  justify-center flex-row'>
        <View>
          <Octicons name="three-bars" size={30} color="gray" />
        </View>
        <TouchableOpacity>
          <View className='px-6 py-5 rounded-full'>
            <MaterialCommunityIcons name="video-outline" size={36} color="#ad0808" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity >
          <View className='px-5 py-4 rounded-full bg-[#ad0808]'>
            <FontAwesome name="phone" size={36} color="white" />
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