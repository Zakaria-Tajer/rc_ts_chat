import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { AntDesign, Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteParams } from '../types/RooteTypes';
import { useNavigation } from '@react-navigation/native';

const Header = () => {


    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>()

    return (
        <SafeAreaView>
            <View className='w-full h-fit bg-white'>
                <View className='flex flex-row space-x-2 items-center justify-around h-16'>
                    <View className='w-1/4 h-full'></View>
                    <View className='w-28 bg-gray-400 h-10 rounded-full justify-between items-center flex-row '>
                        <Text className='pl-2 font-bold'>25,68$</Text>
                        <View className='pr-4 pl-1 border-l-[1px]'>
                            <AntDesign name="shoppingcart" size={24} color="#ad0808" />
                        </View>
                    </View>

                    <Pressable
                        className='w-1/3 bg-[#ad0808] h-3/5 rounded-full flex-row items-center justify-center space-x-2'
                        onPress={() => {
                            navigation.setOptions({ title: 'NOUVELLE REUNION' })
                            navigation.navigate("ReunionCreation")
                        }}
                    >
                        <AntDesign name="videocamera" size={20} color="white" />
                        <Text className='text-white text-xs'>DEMARRER</Text>
                    </Pressable>
                    <Pressable onPress={() => {
                        navigation.navigate("currentUserProfile")
                    }}>
                        <Entypo name="dots-three-vertical" className='' size={24} color="#d3d3d3" />
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Header