import { Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import {Questions} from "../../utils/topics.js"
import { router } from 'expo-router'
import { SetTopic } from '@/api/audioUpload.js'
import { AuthContext } from '@/context/auth-context.js'
const QuestionScreen = () => {
  const [Question,SetQuestion ] = useState("");
  const {token} = useContext(AuthContext)
  useEffect(() => {
    console.log(token)
    const q = Questions[Math.floor(Math.random() * Questions.length)]
    SetQuestion(q)
    SetTopic(q)
  },[])
  
  return (
    <View className="flex-1 bg-[#E8F7FF] justify-center items-center px-6">
      
    <Text className="text-2xl font-bold text-gray-900 mb-6 text-center">
      Here is your Topic for the Day
    </Text>

    {/* Question Card */}
    <View className="w-full bg-white p-6 rounded-2xl shadow-md mb-10">
      <Text className="text-xl font-semibold text-center text-gray-800">
        {Question}
      </Text>
    </View>

    {/* Ready Button */}
    <TouchableOpacity
      onPress={() => router.push("/stack-screens/RecorderScreen")}
      className="w-full bg-green-500 py-4 rounded-2xl mb-4 shadow-md active:bg-green-600"
    >
      <Text className="text-center text-white text-lg font-bold">
        Ready?
      </Text>
    </TouchableOpacity>

    {/* View All Reports */}
    <TouchableOpacity
      onPress={() => router.push("/stack-screens/AllReports")}
      className="w-full bg-blue-500 py-4 rounded-2xl shadow-md active:bg-blue-600"
    >
      <Text className="text-center text-white text-lg font-bold">
        View All Reports
      </Text>
    </TouchableOpacity>

  </View>
   );
}

export default QuestionScreen