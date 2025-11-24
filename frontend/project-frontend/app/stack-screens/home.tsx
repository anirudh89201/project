import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
const Home = () => {
  return (
    <SafeAreaView>
      <Text> Home is good</Text>
      <TouchableOpacity
        onPress={() => router.push('/stack-screens/resumeUpload')}
      >
        <Text>Go to Resume Upload</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Home