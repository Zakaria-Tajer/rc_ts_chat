import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firebase from 'firebase/compat';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RooteState } from '../redux/store';
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import { RouteParams } from '../types/RooteTypes';


const Stack = createNativeStackNavigator<RouteParams>();

const screenOptions = {
  headerShown: false
}



export function RootNavigator(){

  const currentUser = useSelector((state: RooteState) => state.switchHandler.users)

  return (
    <>
      {currentUser ? <SignedInStack /> : <SignedOutStack />}
    </>

  );
}



export const SignedInStack = () => {

  return (
    <Stack.Navigator initialRouteName='HomeScreen'>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={screenOptions} />
    </Stack.Navigator>
  )
}




export const SignedOutStack = () => {
  return (
    <Stack.Navigator initialRouteName='AuthScreen'>
      <Stack.Screen name="AuthScreen" component={AuthScreen} options={screenOptions} />
    </Stack.Navigator>
  )
}