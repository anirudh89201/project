import {Image,Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import "../../global.css"
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

const Home = () => {
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
          Login Via Phone Number
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
