import {Image,Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import "../../global.css"
import * as SecureStorage from "expo-secure-store"
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { AuthContext } from '@/context/auth-context'
const Home = () => {
  const {token} = useContext(AuthContext)
  useEffect(() => {
    const checkToken = async () => {
      console.log("Token:", token);
  
      if (token) {
        router.replace("/stack-screens/QuestionScreen");
      }
    };
  
    checkToken();
  }, [token]);
    return (
    
    <SafeAreaView className="flex-1 bg-gradient-to-b from-yellow-50 via-orange-50 to-white p-6">
      {/* Lottie View Animation*/}
      <View className='w-full flex-1 items-center justify-center mt-10 mb-10'>
      <Image source={require("../../assets/images/logo.jpg")} className='w-20 h-20' />
      </View>
      {/* Welcome Section */}

      {/* Action Button */}
      <View className='gap-4'>
      <TouchableOpacity
        onPress={() => router.push('/stack-screens/PhoneNumberScreen')}
        className="bg-orange-500 rounded-xl py-4 px-6 shadow-lg active:opacity-70"
      >
        <Text className="text-white text-center text-lg font-bold">
          Login Via Email
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={() => router.push("/stack-screens/QuestionScreen")}
      className='bg-orange-500 rounded-xl py-4 px-6 shadow-lg active:opacity-70'
      >
        <Text className="text-white text-center text-lg font-bold">
          Guest Mode
        </Text>
      </TouchableOpacity>
      {/* Optional Footer Note */}
      </View>
      <View className="mt-6">
        <Text className="text-gray-500 text-center">
          Keep practicing daily and see yourself grow!
        </Text>
      </View>

    </SafeAreaView>
  )
}

export default Home
