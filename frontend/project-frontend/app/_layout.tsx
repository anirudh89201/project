import {Stack} from "expo-router"
import React from 'react';
import {AuthProvider} from "../context/auth-context.js"
const MainLayout = () => {
  return (
    <AuthProvider>
    <Stack
      >
      <Stack.Screen
      name='stack-screens/home'
      options={{
        headerShown:false,
      }}
      />
      <Stack.Screen
      name='stack-screens/QuestionScreen'
      options={{
        headerShown:false
      }}
      />
      <Stack.Screen
      name='stack-screens/RecorderScreen'
      options={{
        headerShown:false
      }}
      />
      <Stack.Screen
      name='stack-screens/PhoneNumberScreen'
      options={{
        headerShown:false
      }}
      />
      <Stack.Screen
      name='stack-screens/OTPScreen'
      options={{
        headerShown:false
      }}
      />
    </Stack>
    </AuthProvider>
  )
}

export default MainLayout