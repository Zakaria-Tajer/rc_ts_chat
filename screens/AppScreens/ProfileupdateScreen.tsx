import { View, Text, Image, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, FontAwesome, Feather, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RouteParams } from '../../types/RooteTypes';

type ProfileProps = NativeStackScreenProps<RouteParams, 'ProfileupdateScreen'>;
const ProfileupdateScreen = ({ route, navigation }: ProfileProps) => {



  const [name, setName] = useState<string>('')
  const [entreprise, setEntreprise] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [secondPhoneNumber, setSecondPhoneNumber] = useState<string>('')
  const [tel_Set, setTel_SET] = useState<string>('')





  // const route = useRoute<RouteProp<RouteParams>>()

  const updateUserInformation = () => {
    // const { contactUserId } = route.params
    console.log(route.params?.contactUserId);

  }



  return (
    <SafeAreaView>
      <View className='w-full h-full bg-white'>
        <View className='w-full h-64 bg-white relative items-center justify-center'>
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

            <View className='w-3/4 mt-6 flex-row items-center rounded-xl justify-between px-3 mx-auto bg-gray-300 h-10'>
              <Text style={{ fontFamily: 'Montserrat-Medium' }}>Langue parlee</Text>
              <View className='space-x-2 flex-row items-center'>
                <Text className='font-bold text-md' style={{ fontFamily: 'Montserrat-Medium' }}>ANGLAIS</Text>
                <View className='bg-white rounded-full items-center justify-center'>
                  <Entypo name="chevron-small-down" size={24} color="red" />
                </View>
              </View>
            </View>

            <View className='flex-row h-40 mt-4 w-full bg-blue-400'>
              <View className='w-1/2 bg-white items-center'>
                <View className='w-40 border-b-2'>
                  <Text className='text-center w-fit pb-1' style={{ fontFamily: 'Montserrat-Medium' }}>JOURNAL D'APPELS</Text>
                </View>
              </View>
              <View className='w-1/2 bg-gray-400'></View>
            </View>
          </View>
        </View>




      </View>
    </SafeAreaView>
  )
}

export default ProfileupdateScreen