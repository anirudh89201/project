import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import {OtpInput} from "react-native-otp-entry"

const OTPScreen = () => {
  const {EmailID} = useLocalSearchParams();
  return (
    <View>
      <OtpInput numberOfDigits={6} onTextChange={(text) => console.log(text)}/>
    </View>
  )
}
export default OTPScreen