import {Image,Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import "../../global.css"
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import * as SecureStorage from "expo-secure-store";

import { AuthContext } from '@/context/auth-context'

const Home = () => {
  const {token} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [GuestMode,SetGuestMode] = useState<string|null>();

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStorage.getItemAsync("authToken")
      if(token?.startsWith("guest")){
        await SecureStorage.deleteItemAsync("authToken")
         }
      const flag = await SecureStorage.getItemAsync("GuestMode")
      SetGuestMode(flag)
      if (token) {
        // someone is logged in OR guest mode exists
        router.replace("/screens/QuestionScreen");
      }

      setLoading(false);
    };

    checkToken();
  }, [token]);

  const guestMode = async () => {
    const guestId = "guest_" + Math.random().toString(36).substring(2, 10);

    await SecureStorage.setItemAsync("authToken", guestId);
    await SecureStorage.setItemAsync("GuestMode", "true");

    router.replace("/screens/QuestionScreen");
  };

  if (loading) return null;

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-yellow-50 via-orange-50 to-white p-6">
      <View className='w-full flex-1 items-center justify-center mt-10 mb-10'>
      <Image
  source={require("../../assets/images/logo.jpg")}
  className="w-32 h-32"
/>

      </View>

      <View className='gap-4'>
        <TouchableOpacity
          onPress={() => router.push('/screens/PhoneNumberScreen')}
          className="bg-orange-500 rounded-xl py-4 px-6 shadow-lg active:opacity-70"
        >
          <Text className="text-white text-center text-lg font-bold">
            Login Via Email
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={guestMode}
          disabled={Boolean(GuestMode)}
          className={`bg-orange-500 rounded-xl py-4 px-6 shadow-lg active:opacity-70 ${
            GuestMode ? 'opacity-50' : 'opacity-100'
          }`}        >
          <Text className="text-white text-center text-lg font-bold">
            Guest Mode
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mt-6">
        <Text className="text-gray-500 text-center">
          Keep practicing daily and see yourself grow!
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default Home;
