import { View, Text } from 'react-native'
import {Stack} from "expo-router"
import React from 'react';
const MainLayout = () => {
  return (
    <Stack
      >
      <Stack.Screen
      name='stack-screens/home'
      options={{
        headerShown:false,
      }}
      />
      <Stack.Screen
      name='stack-screens/resumeUpload'
      options={{
        headerShown:false
      }}
      />
    </Stack>
  )
}

export default MainLayout