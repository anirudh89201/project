import { Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Questions} from "../../utils/topics.js"
import { router } from 'expo-router'
import { SetTopic } from '@/api/audioUpload.js'
const QuestionScreen = () => {
  const [Question,SetQuestion ] = useState("");
  useEffect(() => {
    const q = Questions[Math.floor(Math.random() * Questions.length)]
    SetQuestion(q)
    SetTopic(q)
  },[])
  
  return (
    <SafeAreaView>
      <Text>Here is your Topic for the Day.</Text>
      <Text>{Question}</Text>
      <TouchableOpacity onPress={() => router.push("/stack-screens/RecorderScreen")}>
        <Text>Ready?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default QuestionScreen