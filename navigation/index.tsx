import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RooteState } from '../redux/store';
import AuthScreen from '../screens/AuthScreen';
import CodeScreen from '../screens/CodeScreen';
import HomeScreen from '../screens/HomeScreen';
import { RouteParams } from '../types/RooteTypes';
import EmailVerificationScreen from '../screens/EmailVerificationScreen';
import { useEffect } from 'react';
import { isValidBool, isValidUser } from '../constants/isValidUser';
import { StackSwitch } from '../redux/slices/SwitchSlice';
import ChatScreen from '../screens/AppScreens/ChatScreen';



const Stack = createNativeStackNavigator<RouteParams>();

const screenOptions = {
  headerShown: false,
}



export function RootNavigator() {
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    isValidUser()
    if(isValidBool == true) dispatch(StackSwitch({ users: true }))
}, [])


  const currentUser = useSelector((state: RooteState) => state.switchHandler.users)


  return (
    <>
      {currentUser ? <SignedInStack /> : <SignedOutStack />}
    </>

  );
}



export function SignedInStack() {

  return (
    <Stack.Navigator initialRouteName='HomeScreen'>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={screenOptions} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={{
        headerShown: false,
        animation: 'slide_from_right',
      }} />
    </Stack.Navigator>
  )
}




export function SignedOutStack() {



  return (
    <Stack.Navigator initialRouteName='AuthScreen'>
      <Stack.Screen name="AuthScreen" component={AuthScreen} options={{
        headerShown: false,
        animation: 'slide_from_left'
      }} />
      <Stack.Screen name="EmailVerificationScreen" component={EmailVerificationScreen} options={{
        headerShown: false,
        animation: 'slide_from_left'
      }} />
      <Stack.Screen name="CodeScreen" component={CodeScreen} options={{
        headerShown: false,
        animation: 'slide_from_left'
      }} />
    </Stack.Navigator>
  )
}