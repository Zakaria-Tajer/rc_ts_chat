import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { TailwindProvider } from 'tailwindcss-react-native';
import { RootNavigator } from './navigation';
import { store } from './redux/store';

export default function App() {

  let [fontsLoaded] = useFonts({
    "Montserrat-Medium": require('./assets/fonts/Montserrat-Medium.ttf')
  })
  if (!fontsLoaded) return null


  return (
    <Provider store={store}>
      <TailwindProvider>
        <NavigationContainer >
          <RootNavigator />
        </NavigationContainer>
      </TailwindProvider>
    </Provider>
  );
}

