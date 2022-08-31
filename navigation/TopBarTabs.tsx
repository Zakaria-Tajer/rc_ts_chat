import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CallScreen from '../screens/AppScreens/CallScreen';
import ReunionScreen from '../screens/AppScreens/ReunionScreen';
import DiscusScreen from '../screens/AppScreens/DiscusScreen';
import ContactScreen from '../screens/AppScreens/ContactScreen';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
const Tab = createMaterialTopTabNavigator();

function TopBarTabs() {
  const insets = useSafeAreaInsets()
  return (
    <Tab.Navigator >
      <Tab.Screen name="CallScreen" component={CallScreen} options={{
        tabBarLabel: "APPELS",
        tabBarLabelStyle: { fontFamily: 'Montserrat-Medium', fontSize: 12},
        tabBarIndicatorStyle: { backgroundColor: "#ad0808" },
        tabBarActiveTintColor: "#ad0808",
        tabBarInactiveTintColor: "black"
      }} />
      <Tab.Screen name="ContactScreen" component={ContactScreen}
        options={{
          tabBarLabel: "CONTACTS",
          tabBarLabelStyle: { fontFamily: 'Montserrat-Medium', fontWeight: '600',fontSize: 12 },
          tabBarIndicatorStyle: { backgroundColor: "#ad0808" },
          tabBarActiveTintColor: "#ad0808",
          tabBarInactiveTintColor: "black"
        }}
      />
      <Tab.Screen name="DiscusScreen" component={DiscusScreen}
        options={{
          tabBarLabel: "DISCUS.",
          tabBarLabelStyle: { fontFamily: 'Montserrat-Medium' , fontWeight: '600',fontSize: 12},
          tabBarIndicatorStyle: { backgroundColor: "#ad0808" },
          tabBarActiveTintColor: "#ad0808",
          tabBarInactiveTintColor: "black"
        }}
      />
      <Tab.Screen name="ReunionScreen" component={ReunionScreen}
        options={{
          tabBarLabel: "REUNIONS",
          tabBarLabelStyle: { fontFamily: 'Montserrat-Medium' , fontWeight: '600',fontSize: 12},
          tabBarIndicatorStyle: { backgroundColor: "#ad0808" },
          tabBarActiveTintColor: "#ad0808",
          tabBarInactiveTintColor: "black"
        }}
      />
    </Tab.Navigator>
  );
}

export default TopBarTabs

