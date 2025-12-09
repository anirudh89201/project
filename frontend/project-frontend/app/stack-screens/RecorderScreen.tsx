import {View,Text, TouchableOpacity,Dimensions } from 'react-native'
import React, { useContext } from 'react'
import useRecorder from "../../hooks/useRecorder.js"
import { AuthContext } from '@/context/auth-context.js';
import { router } from 'expo-router';
const RecorderScreen = () => {
  const {token} = useContext(AuthContext)
  const handleStop = async () => {
  try {
    const result = await stopRecording(token);
    console.log(result)
    
    if (result?.success) {
      router.replace("/stack-screens/ReportScreen");
    }
  } catch (err) {
    console.error(err);
    alert("Failed to stop recording");
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
      return (
        <View className="flex-1 justify-center items-center p-6 gap-8">

        {/* Timer */}
        <View
          className={`w-64 h-64 rounded-full border-[14px] 
          ${isRecording ? "border-red-500" : "border-gray-400"} 
          justify-center items-center`}
        >
          <Text className="text-3xl font-extrabold text-gray-800">
            {duration}s
          </Text>
        </View>
      
        {/* Floating Button Row */}
        <View className="w-full flex-row justify-center items-center gap-6 mt-4">
      
          {/* Pause */}
          {isRecording && !isPaused && (
            <TouchableOpacity
              className="bg-yellow-500 px-6 py-3 rounded-2xl shadow"
              onPress={pauseRecording}
            >
              <Text className="text-white text-lg font-semibold">Pause</Text>
            </TouchableOpacity>
          )}
      
          {/* Start */}
          {!isRecording && (
            <TouchableOpacity
              className="bg-blue-600 px-10 py-4 rounded-2xl shadow"
              onPress={startRecording}
            >
              <Text className="text-white text-lg font-semibold">Start</Text>
            </TouchableOpacity>
          )}
      
          {/* Resume */}
          {isRecording && isPaused && (
            <TouchableOpacity
              className="bg-green-600 px-10 py-4 rounded-2xl shadow"
              onPress={resumeRecording}
            >
              <Text className="text-white text-lg font-semibold">Resume</Text>
            </TouchableOpacity>
          )}
      
          {/* Done */}
          {isRecording && (
            <TouchableOpacity
              className="bg-red-500 px-6 py-3 rounded-2xl shadow"
              onPress={handleStop}
            >
              <Text className="text-white text-lg font-semibold">Done</Text>
            </TouchableOpacity>
          )}
        </View>
      
      </View>
      
      );
      
    
}

export default RecorderScreen