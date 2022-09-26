import { View, Text, TextInput, Switch, Pressable, Platform, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AppDispatch, RooteState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setReuinonAccess, setReuinonDate, setReuinonRestrictions, setReuinonStarter } from '../../../redux/slices/ReunionSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RouteParams } from '../../../types/RooteTypes';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../constants/firebase';








type ProfileProps = NativeStackScreenProps<RouteParams, 'ReunionCreation'>;

const ReunionCreation = ({ navigation }: ProfileProps) => {



  const dispatch: AppDispatch = useDispatch()



  const [isEnabled, setIsEnabled] = useState<boolean>(false)
  const [isHidden, setIsHidden] = useState<boolean>(false)
  const [isDate, setIsDate] = useState<boolean>(false)

  const [pickedDate, setPickedDate] = useState<boolean>(false)
  const [pickedTime, setPickedTime] = useState<boolean>(false)

  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [showTimeCalendar, setShowTimeCalendar] = useState<boolean>(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [isMode, setIsMode] = useState<string>('date')


  const [formatedDates, setFormatedDate] = useState<string>('')
  const [formatedTimes, setFormatedTime] = useState<string>('')


  const [roomTitle, setRoomTitle] = useState<string>('')
  const [passawordData, setPassawordData] = useState<string>('')
  const [password, setPassword] = useState<boolean>(false);
  const [waitingRoome, setWaitingRoome] = useState<boolean>(false);
  const [micIsDisabled, setMicIsDisabled] = useState<boolean>(false);
  const [cameraIsDisabled, setCameraIsDisabled] = useState<boolean>(false);
  const [blockAllMics, setBlockAllMics] = useState<boolean>(false);
  const [blockScreenSharing, setBlockScreenSharing] = useState<boolean>(false);
  const [blockVideo, setBlockVideo] = useState<boolean>(false);
  const [blockConversations, setBlockConversations] = useState<boolean>(false);




  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date
    let tempDate = new Date(currentDate)
    let formatedDate = `${tempDate.getDate()}/${tempDate.getMonth()}/${tempDate.getFullYear()}`
    setFormatedDate(formatedDate)
  };
  const onChangeTime = (event: any, selectedDate: any) => {
    const currentTime = selectedDate || time
    let tempDate = new Date(currentTime)
    let formatedTime = `${tempDate.getHours()}:${tempDate.getMinutes()}`
    setFormatedTime(formatedTime)
  };




  const showMode = (mode: string) => {

    if (mode == 'date') {
      setIsMode(mode)
      setShowCalendar(!showCalendar)
    } else if ('time') {
      setShowTimeCalendar(!showTimeCalendar)
      setIsMode(mode)
    }
  }



  const reunionData = useSelector((state: RooteState) => state.ReunionHandler)
  const currentUserData = useSelector((state: RooteState) => state.dataHandler)





  const createRoom =  () => {

    navigation.navigate("CallScreen")

    // if (roomTitle !== "" || undefined || null){
    //   const roomDoc: any = setDoc(doc(db, "rooms", `${currentUserData.currentUserId}`), {
    //     roomTitle: roomTitle,
    //     roomPassaword: passawordData !== "" ? passawordData : "",
    //     formatedDates: formatedDates !== "" ? formatedDates : "",
    //     formatedTimes: formatedTimes !== "" ? formatedTimes : "",
    //   }, {merge: true})
    //     .then((res: any) => console.log(res?.id))
    //     .catch((err) => console.log(err));
      
    //   // if(roomDoc!){
    //   //   console.log(roomDoc?.id);
    //   //   navigation.navigate("CallScreen")
        
    //   // }
    // }


  }







  return (
    <View className='w-full h-full'>
      <ScrollView>
        <View className='w-full h-fit space-y-4'>
          <>
            <View className='w-full py-1 pl-7 bg-gray-400/75'>
              <Text className='text-xs font-bold'>TITRE ET ACCES</Text>
            </View>
            <View className='space-y-1 pt-5 pl-3 h-fit bg-white pb-2'>
              <TextInput
                placeholder='Titre de la reunion'
                className='text-gray-400 border-[1px] py-0.5 border-gray-400 w-5/6 pl-4 text-base font-semibold'
                onChangeText={e => setRoomTitle(e)}
              />
              <View className='flex-row items-center w-5/6 justify-between'>
                <Text className='text-base text-gray-500'>Mot de passe pour se connecter</Text>
                <Switch
                  trackColor={{ false: 'gray', true: '#ad0808' }}
                  thumbColor={password ? "white" : 'white'}
                  onValueChange={() => {
                    setPassword(!password)
                  }}
                  value={password}
                />
              </View>
              <View className='w-3/4 flex-row relative items-center'>
                <TextInput
                  placeholder='password'
                  className='text-gray-400 border-[1px] py-0.5 border-gray-400 w-full pl-4 text-base font-semibold'
                  secureTextEntry={!isHidden}
                  onChangeText={e => setPassawordData(e)}
                  value={password ? "" : passawordData}
                />
                <View className='absolute right-3'>
                  <Pressable onPress={() => setIsHidden(!isHidden)}>
                    <AntDesign name="eye" size={18} color="black" />
                  </Pressable>
                </View>
              </View>
            </View>
          </>
          {/* Todo:datttte */}
          <View className='w-full h-fit '>
            <View className='w-full py-1 pl-7 bg-gray-400/75'>
              <Text className='text-xs font-bold'>Date</Text>
            </View>
            <View className='pl-4 space-y-2 w-full'>
              <View className='flex-row items-center w-5/6 justify-between'>
                <Text className='text-base text-gray-500'>Programmer une date</Text>
                <Switch
                  trackColor={{ false: 'gray', true: '#ad0808' }}
                  thumbColor={isDate ? "white" : 'white'}
                  onValueChange={() => {
                    setPickedDate(true)
                    dispatch(setReuinonDate({ ReunionDateTrue: !reunionData.ReunionDateTrue }))
                  }}
                  value={reunionData.ReunionDateTrue}
                />
              </View>
              <View className='space-y-2'>
                {!showCalendar ? (
                  <Pressable onPress={() => showMode('date')} disabled={!pickedDate ? true : false}>
                    <View className='rounded-md bg-[#ad0808] w-1/2 items-center py-2'>
                      <Text className='text-white text-base'>Choose Date</Text>
                    </View>
                  </Pressable>
                ) : (
                  <>
                    < View className='w-3/4 flex-row relative items-center'>
                      <View
                        className='text-gray-400 border-[1px] py-2 mb-2 border-gray-400 w-full pl-4 text-base font-semibold'>
                        <Text>{reunionData.ReunionDate ? reunionData.ReunionDate : formatedDates}</Text>
                      </View>
                      <View className='absolute right-3'>
                        <Pressable onPress={() => setIsHidden(!isHidden)}>
                          <AntDesign name="calendar" size={18} color="gray" />
                        </Pressable>
                      </View>
                    </View>
                  </>
                )}

                {!showTimeCalendar ? (
                  <Pressable onPress={() => showMode('time')} disabled={!pickedDate ? true : false}>
                    <View className='rounded-md bg-[#ad0808] w-1/2 items-center py-2'>
                      <Text className='text-white text-base'>Choose Time</Text>
                    </View>
                  </Pressable>
                ) : (
                  <>
                    <View className='w-3/4 flex-row relative items-center'>
                      <View
                        className='text-gray-400 border-[1px] py-2 border-gray-400 w-full pl-4 text-base font-semibold'>
                        <Text>{reunionData.ReunionTime ? reunionData.ReunionTime : formatedTimes}</Text>
                      </View>
                      <View className='absolute right-3'>
                        <Pressable onPress={() => setIsHidden(!isHidden)}>
                          <Ionicons name="timer" size={18} color="gray" />
                        </Pressable>
                      </View>
                    </View>
                  </>
                )}
              </View>
            </View>
            {showCalendar && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={isMode as any}
                is24Hour={true}
                onChange={onChangeDate}
                minimumDate={new Date()}
              />

            )}
            {showTimeCalendar && (
              <DateTimePicker
                testID="dateTimePicker"
                value={time}
                mode={isMode as any}
                is24Hour={true}
                onChange={onChangeTime}
                minimumDate={new Date()}
              />
            )}
          </View>
          <View className='w-full'>
            <View className='w-full py-1 pl-7 bg-gray-400/75'>
              <Text className='text-xs font-bold'>AU DEMARRAGE DE LA REUNION</Text>
            </View>
            <View className='pl-4 h-10 flex-row items-center'>
              <View className='flex-row items-center w-5/6 justify-between'>
                <Text className='text-base text-gray-500'>Salle d'attente</Text>
                <Switch
                  trackColor={{ false: 'gray', true: '#ad0808' }}
                  thumbColor={isDate ? "white" : 'white'}
                  onValueChange={() => {
                    setWaitingRoome(!waitingRoome)
                  }}
                  value={waitingRoome}
                />
              </View>
            </View>
            <View className='pl-4 h-10 flex-row items-center'>
              <View className='flex-row items-center w-5/6 justify-between'>
                <Text className='text-base text-gray-500'>Micros coupes par defaut</Text>
                <Switch
                  trackColor={{ false: 'gray', true: '#ad0808' }}
                  thumbColor={isDate ? "white" : 'white'}
                  onValueChange={() => {
                    setMicIsDisabled(!micIsDisabled)
                  }}
                  value={micIsDisabled}
                />
              </View>
            </View>
            <View className='pl-4 h-10 flex-row items-center'>
              <View className='flex-row items-center w-5/6 justify-between'>
                <Text className='text-base text-gray-500'>Cameras coupees par defaut </Text>
                <Switch
                  trackColor={{ false: 'gray', true: '#ad0808' }}
                  thumbColor={isDate ? "white" : 'white'}
                  onValueChange={() => {
                    setCameraIsDisabled(!cameraIsDisabled)
                  }}
                  value={cameraIsDisabled}
                />
              </View>
            </View>

          </View>

          <View className='w-full'>
            <View className='w-full py-1 pl-7 bg-gray-400/75'>
              <Text className='text-xs font-bold'>RESTRICTION DES PARTICIPANTS</Text>
            </View>
            <View className='pl-4'>
              <View className='h-10 flex-row items-center'>
                <View className='flex-row items-center w-5/6 justify-between'>
                  <Text className='text-base text-gray-500'>Bolquer les micros </Text>
                  <Switch
                    trackColor={{ false: 'gray', true: '#ad0808' }}
                    thumbColor={isDate ? "white" : 'white'}
                    onValueChange={() => {
                      setBlockAllMics(!blockAllMics)
                    }}
                    value={blockAllMics}
                  />
                </View>
              </View>
            </View>
            <View className='pl-4 h-10 flex-row items-center'>
              <View className='flex-row items-center w-5/6 justify-between'>
                <Text className='text-base text-gray-500'>Bloquer le partage d'ecran</Text>
                <Switch
                  trackColor={{ false: 'gray', true: '#ad0808' }}
                  thumbColor={isDate ? "white" : 'white'}
                  onValueChange={() => {
                    setBlockScreenSharing(!blockScreenSharing)
                  }}
                  value={blockScreenSharing}
                />
              </View>
            </View>
            <View className='pl-4 h-10 flex-row items-center'>
              <View className='flex-row items-center w-5/6 justify-between'>
                <Text className='text-base text-gray-500'>Bloquer la video</Text>
                <Switch
                  trackColor={{ false: 'gray', true: '#ad0808' }}
                  thumbColor={isDate ? "white" : 'white'}
                  onValueChange={() => {
                    setBlockVideo(!blockVideo)
                  }}
                  value={blockVideo}
                />
              </View>
            </View>
            <View className='pl-4 h-10 flex-row items-center'>
              <View className='flex-row items-center w-5/6 justify-between'>
                <Text className='text-base text-gray-500'>Bloquer les conversations </Text>
                <Switch
                  trackColor={{ false: 'gray', true: '#ad0808' }}
                  thumbColor={isDate ? "white" : 'white'}
                  onValueChange={() => {
                    setBlockConversations(!blockConversations)
                  }}
                  value={blockConversations}
                />
              </View>
            </View>
          </View>
        </View>

        <View className='w-full mt-4 pb-4 space-y-7'>
          <View className='w-2/3 pl-4'>
            <Text className='text-gray-500'>Vous avez la possibilite de modifier ces parametres au cours de la reunion.</Text>
          </View>
        </View>

        <View className='pb-8 mt-6 w-full items-center justify-center pl-4'>
          <TouchableOpacity onPress={createRoom}>
            <View className='bg-[#ad0808] items-center justify-center rounded-full w-40 py-3'>
              <Text className='text-white'>Creer la reunion</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>



    </View>
  )
}

export default ReunionCreation