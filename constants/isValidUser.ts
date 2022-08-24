import { View, Text } from "react-native";
import React from "react";
import { API_URL } from "../types/Urls";
import AsyncStorage from "@react-native-async-storage/async-storage";

export let isValidBool: boolean = false;
export const isValidUser = async () => {
  try {
    const exist = await AsyncStorage.getItem("Access_Token");  
    console.log(`token is: ${exist}`);
      
    if (exist) {
      const result = await fetch(`${API_URL}auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: exist
        })
    }).then((res) => res.json())
      console.log(result);
      const { Message } = result;

      if (Message == "Authrized") isValidBool = true;
    }
  } catch (e) {
    console.log(e);
  }
};
