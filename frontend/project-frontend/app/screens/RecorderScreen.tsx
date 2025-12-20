import {View,Text, TouchableOpacity,Dimensions, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import useRecorder from "../../hooks/useRecorder.js"
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as SecureStorage from "expo-secure-store";
import { router } from 'expo-router';
import { QuestionContext } from '@/context/question-context.js';
const RecorderScreen = () => {
  const [loading,SetLoading] = useState(false);
  const {Question} = useContext(QuestionContext)
  const handleStop = async () => {
    try {
    const token = await SecureStorage.getItemAsync("authToken")
    SetLoading(true);
    console.log("Are u printing null:",token)
    const result = await stopRecording(token,Question);
    console.log(result)
    if (result?.success) {
      router.replace("/screens/ReportScreen");
    }
  } catch (err) {
    console.error(err);
    if(err instanceof Error){
      alert(err.message)
    }else{
      alert("Something went wrong")
    }
  }finally{
    SetLoading(false);
  }
};

    const {
        isRecording,
        isPaused,
        duration,
        startRecording,
        pauseRecording,
        resumeRecording,
        stopRecording
      } = useRecorder();
      return loading ? (
        <View className="flex-1 justify-center items-center bg-black">
          <ActivityIndicator size="large" />
          <Text className='text-small font-bold text-white mt-2'>Getting ur report ready..</Text>
        </View>
      ) : (
        <View className="flex-1 justify-center items-center p-6 bg-black">
      
          {/* Main Microphone Icon */}
          <View className="items-center mb-10">
            <Ionicons
              name="mic"
              size={120}
              color={isRecording ? "#ff4d4d" : "#888"}
            />
            <Text className="text-white text-4xl mt-4 font-semibold">
              {duration}s
            </Text>
          </View>
      
          {/* Control Buttons */}
          <View className="flex-row items-center gap-12">
      
            {/* Pause */}
            {isRecording && !isPaused && (
              <TouchableOpacity onPress={pauseRecording}>
                <Ionicons name="pause-circle" size={70} color="#facc15" />
              </TouchableOpacity>
            )}
      
            {/* Start */}
            {!isRecording && (
              <TouchableOpacity onPress={startRecording}>
                <Ionicons name="play-circle" size={80} color="#3b82f6" />
              </TouchableOpacity>
            )}
      
            {/* Resume */}
            {isRecording && isPaused && (
              <TouchableOpacity onPress={resumeRecording}>
                <Ionicons name="play-circle" size={80} color="#22c55e" />
              </TouchableOpacity>
            )}
      
            {/* Stop */}
            {isRecording && (
              <TouchableOpacity onPress={handleStop}>
                <MaterialIcons name="stop-circle" size={75} color="#ef4444" />
              </TouchableOpacity>
            )}
      
          </View>
        </View>
      ); 
    
}

export default RecorderScreen