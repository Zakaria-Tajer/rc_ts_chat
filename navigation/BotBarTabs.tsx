import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions } from 'react-native';
import CallScreen from '../screens/AppScreens/CallScreen';

const Tab = createBottomTabNavigator();

function BotBarTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                // tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: "blue",
                    height: 90,
                    
                }
            }}
        >

            <Tab.Screen name='CallScreen' component={CallScreen} />

        </Tab.Navigator>
    )
}


export default BotBarTabs