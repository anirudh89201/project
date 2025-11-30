import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import "../../global.css"
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-yellow-50 via-orange-50 to-white p-6">
      
      {/* Welcome Section */}
      <View className="mb-10 mt-6">
        <Text className="text-4xl font-extrabold text-orange-600 mb-2">
          Hello there!
        </Text>
        <Text className="text-lg text-gray-700">
          Welcome to your English practice app. Lets improve your skills together, one step at a time.
        </Text>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        onPress={() => router.push('/stack-screens/QuestionScreen')}
        className="bg-orange-500 rounded-xl py-4 px-6 shadow-lg active:opacity-70"
      >
        <Text className="text-white text-center text-lg font-bold">
          Start Practicing
        </Text>
      </TouchableOpacity>

      {/* Optional Footer Note */}
      <View className="mt-6">
        <Text className="text-gray-500 text-center">
          Keep practicing daily and see yourself grow!
        </Text>
      </View>

    </SafeAreaView>
  )
}

export default Home
