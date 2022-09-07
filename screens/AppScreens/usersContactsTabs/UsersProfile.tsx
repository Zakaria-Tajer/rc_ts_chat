import { View, Text, Image, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, FontAwesome, Feather, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RouteParams } from '../../../types/RooteTypes';

type ProfileProps = NativeStackScreenProps<RouteParams, 'usersProfile'>;

const UsersProfile = ({ route, navigation }: ProfileProps) => {

  const [AllCalls, setAllCalls] = useState<boolean>(false)

  const updateUserInformation = () => {
    
  }
  const switchComp = () => {
    setAllCalls(!AllCalls)
  }
  console.log(route.params?.contactUserId);



  return (
    <SafeAreaView>
      <View className='w-full h-full bg-white'>
        <View className='w-full h-56 bg-white relative items-center justify-center'>
          <View className='absolute top-0 flex-row justify-between pt-3 px-4 z-10 w-full'>
            <Pressable onPress={() => {
              navigation.goBack()
            }}>
              <AntDesign name="arrowleft" size={30} color="white" />
            </Pressable>
            <View className='w-10 h-10 rounded-full items-center justify-center bg-black/40'>
              <MaterialCommunityIcons name="draw" size={26} color="white" />
            </View>
          </View>
          <Image
            source={{ uri: 'https://media.istockphoto.com/photos/young-woman-laughing-while-relaxing-at-home-picture-id1326417862?b=1&k=20&m=1326417862&s=612x612&w=0&h=MYfSIwNeawprDmzDGL5meHWetVPiRXE6TVamWS4mvsY=' }}
            className='w-full h-full'
          />
          <View className='absolute pt-10'>
            <Text className='text-3xl text-white font-semibold'>DIANE TEL</Text>
            <View className='flex-row items-center justify-center space-x-2'>
              <View className='w-2 h-2 rounded-full bg-green-400'></View>
              <Text className='text-green-400 font-bold'>En ligne</Text>
            </View>
          </View>

        </View>
        <View className='bg-[#ad0808] w-full h-fit'>
          <View className='w-full relative rounded-t-[35px] bg-white h-fit items-center'>
            <View className='absolute w-24 h-24 bg-white shadow-xl items-center justify-center rounded-full -top-10'>
              <View className='bg-red-600 w-[85px] h-[85px] rounded-full items-center justify-center'>
                <FontAwesome name="phone" size={36} color="white" />
              </View>
            </View>

            <View className='flex-row mt-2 space-x-10 py-3 justify-evenly  w-full'>
              <View className='w-16 h-16 bg-[#ad0808] rounded-full items-center justify-center'>
                <Feather name="video" size={32} color="white" />
              </View>
              <View className='w-16 h-16 bg-black rounded-full items-center justify-center'>
                <MaterialCommunityIcons name="message-bulleted" size={32} color="white" />
              </View>
            </View>

            <View className='w-3/4 mt-4 flex-row items-center rounded-xl justify-between px-3 mx-auto bg-gray-300 h-10'>
              <Text style={{ fontFamily: 'Montserrat-Medium' }}>Langue parlee</Text>
              <View className='space-x-2 flex-row items-center'>
                <Text className='font-bold text-md' style={{ fontFamily: 'Montserrat-Medium' }}>ANGLAIS</Text>
                <View className='bg-white rounded-full items-center justify-center'>
                  <Entypo name="chevron-small-down" size={24} color="red" />
                </View>
              </View>
            </View>
            {/* TODO: make this a 2 sperated components  */}
            <View className=' h-fit mt-4 w-full'>
              <View className='w-full flex-row justify-around px-4 py-3'>
                <Pressable onPress={switchComp}>
                  <View className={AllCalls ? 'w-40' : `w-40 border-b-4 border-[#ad0808]`}>
                    <Text className={`text-center w-fit pb-1 text-[16px] `} style={{ fontFamily: 'Montserrat-Medium', fontWeight: "800" }}>JOURNAL D'APPELS</Text>
                  </View>
                </Pressable>
                <Pressable onPress={switchComp}>
                  <View className={AllCalls ? 'border-b-4 border-[#ad0808]' : 'w-20'}>
                    <Text className={`text-center pb-1 w-fit text-[16px]`} style={{ fontFamily: 'Montserrat-Medium', fontWeight: "800" }}>APPELER</Text>
                  </View>
                </Pressable>
              </View>
              {AllCalls ? (
                <View className='w-full space-y-2 justify-between items-center h-fit '>
                  <View className='flex-row w-full border-b-[1px] border-b-gray-300'>
                    <View className='w-1/2 pl-4 space-y-1 py-3'>
                      <View className='flex-row items-center'>
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontWeight: "800" }} className='text-base'>0033 1 45 69  87 54</Text>
                        <Feather name="arrow-up-right" size={24} color="green" />
                      </View>
                      <View className='flex-row space-x-2'>
                        <Text className='text-gray-500 text-sm'>Numero rtc francais</Text>
                        <Text className='text-[#ad0808] font-bold' style={{ fontFamily: 'Montserrat-Medium' }}>0.56/min</Text>

                      </View>
                    </View>
                    <View className='w-1/2 pl-4 pt-3 justify-end flex-row space-x-5 pr-4'>
                      <AntDesign name="videocamera" size={24} color="gray" />
                      <Entypo name="mobile" size={24} color="gray" />
                    </View>
                  </View>
                  <View className='flex-row w-full border-b-[1px] border-b-gray-300'>
                    <View className='w-1/2 pl-4 space-y-1 py-3'>
                      <View className='flex-row items-center'>
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontWeight: "800" }} className='text-base'>1099</Text>
                        <Feather name="arrow-up-right" size={24} color="green" />
                      </View>
                      <View className='flex-row space-x-2'>
                        <Text className='text-gray-500 text-sm' style={{ fontFamily: 'Montserrat-Medium' }}>Numero rtc francais</Text>
                        <Text className='text-[#ad0808] font-bold underline underline-offset-4' style={{ fontFamily: 'Montserrat-Medium' }}>Gratuit</Text>
                      </View>
                    </View>
                    <View className='w-1/2 pl-4 pt-3 justify-end flex-row space-x-5 pr-4'>
                      <AntDesign name="videocamera" size={24} color="gray" />
                      <Entypo name="mobile" size={24} color="gray" />
                    </View>
                  </View>
                </View>
              ) : (
                <View className='w-full space-y-2 justify-between items-center h-fit '>
                  <View className='flex-row w-full border-b-[1px] border-b-gray-300'>
                    <View className='w-1/2 pl-4 space-y-1 py-3'>
                      <View className='flex-row items-center'>
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontWeight: "800" }} className='text-base'>3 nov. 15.18</Text>
                        <Feather name="arrow-up-right" size={24} color="green" />
                      </View>
                      <Text style={{ fontFamily: 'Montserrat-Medium', fontWeight: "800" }} className='text-[#ad0808] text-base'>00331 45 69 87 54</Text>
                    </View>
                    <View className='w-1/2 pl-4 pt-9'>
                      <Text style={{ fontFamily: 'Montserrat-Medium' }} className='text-gray-400 text-base'>SIP Entrant: 3:52 m</Text>
                    </View>
                  </View>
                  <View className='flex-row w-full border-b-[1px] border-b-gray-300'>
                    <View className='w-1/2 pl-4 space-y-1 py-3'>
                      <View className='flex-row items-center'>
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontWeight: "800" }} className='text-base'>3 nov. 15.18</Text>
                        <Feather name="arrow-up-right" size={24} color="green" />
                      </View>
                      <Text style={{ fontFamily: 'Montserrat-Medium', fontWeight: "800" }} className='text-[#ad0808] text-base'>00331 45 69 87 54</Text>
                    </View>
                    <View className='w-1/2 pl-4 pt-9'>
                      <Text style={{ fontFamily: 'Montserrat-Medium' }} className='text-gray-400 text-base'>SIP Entrant: 3:52 m</Text>
                    </View>
                  </View>
                </View>
              )}

              <View className='w-full mt-7 items-center justify-center'>
                <Pressable onPress={() => {}}>
                  <View className='bg-[#ad0808] px-4 py-4 rounded-full items-center justify-center'>
                    <Text className='text-white text-xs' style={{ fontFamily: 'Montserrat-Medium', fontWeight: "500" }}>CREER UNE REUNION AVEC D'AUTRES PARTICIPANTS</Text>
                  </View>
                </Pressable>
              </View>

            </View>
          </View>
        </View>




      </View>
    </SafeAreaView>
  )
}

export default UsersProfile