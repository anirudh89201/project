import {Stack} from "expo-router"
import React from 'react';
export const MainLayout = () => {
  return (
    <Stack
      >
      <Stack.Screen
      name='home'
      options={{
        headerShown:false,
      }}
      />
      <Stack.Screen
      name="ReportScreen"
      options={{
        headerShown:false
      }}
      />
      <Stack.Screen
      name='QuestionScreen'
      options={{
        headerShown:false
      }}
      />
      <Stack.Screen
      name='RecorderScreen'
      options={{
        headerShown:false
      }}
      />
      <Stack.Screen
      name='PhoneNumberScreen'
      options={{
        headerShown:false
      }}
      />
      <Stack.Screen
      name='OTPScreen'
      options={{
        headerShown:false
      }}
      />
    </Stack>
  )
}

export default MainLayout