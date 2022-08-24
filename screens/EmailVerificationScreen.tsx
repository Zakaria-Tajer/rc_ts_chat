import { Pressable, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RouteParams } from '../types/RooteTypes'
import { StackSwitch } from '../redux/slices/SwitchSlice'
import AuthLayout from '../Layouts/Layout'
import { Formik } from 'formik'
import { Fontisto } from '@expo/vector-icons';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MAIL_API_URL } from '../types/Urls'


const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

const EmailVerificationScreen = () => {

  const [emailError, setEmailError] = useState<boolean>(false)


  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>()
  const [emailVer, setEmailVer] = useState<boolean>(false)

  let val = Math.floor(1000 + Math.random() * 9000);

  const dispatch: AppDispatch = useDispatch()



  const sendEmailVerification = async (values: any) => {
    let emailVerfication = await AsyncStorage.getItem('email_verfication');

    if(values.email == emailVerfication)
    {
      const result = await fetch(`${MAIL_API_URL}mail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mailTo: values.email,
          code: val
        })
      }).then((res) => res.json())

      const { Message } = result
      if (Message == 'Message Sent') {
        dispatch(StackSwitch({ verificationCode: val }))
        navigation.navigate("CodeScreen")
      } else {
        setEmailVer(false)
      }
      
    }else {
      setEmailError(true)
      
    }
    
  }
  return (
    <AuthLayout>


      <Formik
        initialValues={{ email: '', }}
        validationSchema={SignupSchema}
        onSubmit={values =>
          sendEmailVerification(values)

        }
      >
        {({ handleChange, handleSubmit, handleBlur, values, errors, touched }) => (
          <View className='mt-10 w-full h-full items-center space-y-4'>
            <View className='w-full pl-5 flex-row'>
              <Text className='w-fit text-white' style={{ borderBottomWidth: 3, borderColor: 'white', paddingBottom: 10 }}>CONTROLE DE VOTRE IDENTITE</Text>
            </View>
            <View className='h-2/4 w-11/12 bg-white rounded-lg space-y-7 flex items-center'>
              <View className='w-full flex flex-row items-center justify-center'>
                <TextInput
                  className='mt-10 relative py-3 border-b-2 border-gray-400 text-lg w-10/12 pb-6'
                  placeholder='Email'
                  style={{ fontFamily: 'Montserrat-Medium' }}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                <View className='absolute top-14 right-9'>
                  <Fontisto name="email" size={24} color="gray" />
                </View>

              </View>
              <View className='w-full h-fit items-center justify-center'>
              {errors.email && touched.email && emailVer == true && emailError == true || emailError == true ? (
                  <View className='w-10/12 mt-7 h-8 border-[#ad0808] mb-4 border-2 rounded-lg justify-center items-center'>
                    <Text className='text-[#ad0808]' style={{ fontFamily: 'Montserrat-Medium', fontWeight: '600' }}>Identifiant ou mot de passe incorrect</Text>
                  </View>
                ) : null}
              </View>
              <View className='w-11/12 mt-2'>
                <Text className='text-center text-[16px] text-gray-600 leading-6' style={{ fontFamily: 'Montserrat-Medium' }}>Saisissez l'adresse email avec laquelle{"\n"}Votre compte Houay a ete cree{"\n"}pour recevoir un code de verification</Text>
              </View>
              <Pressable onPress={handleSubmit}>
                <View className='w-44 h-[65px] bg-[#ad0808]  rounded-full items-center justify-center'>
                  <Text className='text-white font-semibold' style={{ fontFamily: 'Montserrat-Medium' }}>Valider</Text>
                </View>
              </Pressable>
            </View>
            <View className='flex flex-row items-center justify-center w-full'>

              <Text className='pt-10 text-lg text-gray-500' style={{ fontFamily: 'Montserrat-Medium' }}>Revenir a </Text>
              <Text className='pt-10 text-lg text-gray-500' style={{ borderBottomWidth: 1, borderColor: 'gray', fontFamily: 'Montserrat-Medium' }}>l'espace de connexion</Text>
            </View>
          </View>
        )}
      </Formik>

    </AuthLayout>
  )
}

export default EmailVerificationScreen
