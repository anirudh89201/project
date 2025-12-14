import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import {sendOTP} from '../../api/sendOTP.js'
import { router } from 'expo-router';

export default function PhoneNumberScreen() {
    const [EmailID, setEmailID] = useState('');
    const [Valid,SetValid] = useState(false);
    const [loading,SetLoading] = useState(false);
    const emailRegex = /^[^\s@]+@[^\  s@]+\.[^\s@]+$/;
  const handleNext = async() => {
    SetLoading(true);
    try{
      const response = await sendOTP(EmailID)
      if(response.success){
  
        router.push({pathname:'/screens/OTPScreen',params:{EmailID}}); // Navigate to OTP screen
      }else{
        alert("Something Went Wrong..")
      }
    }catch(err){
      console.log(err)
    }finally{
      SetLoading(false);
    }
  };
  const checkEmailId = (value:string) => {
    setEmailID(value)
    SetValid(emailRegex.test(value))
  }
  return loading ? (
    <View className='flex-1 justify-center items-center'>
      <ActivityIndicator size={'large'}/>
    </View>
  ):(
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gradient-to-b from-purple-500 to-pink-500 justify-center px-6"
    >
      <View className="bg-white rounded-2xl p-6 shadow-lg">
        <Text className="text-2xl font-bold text-center text-purple-700 mb-4">
          Enter Your Email ID
        </Text>

        <TextInput
          placeholder="Email ID"
          value={EmailID}
          onChangeText={checkEmailId}
          keyboardType="email-address"
          className="border-2 border-purple-300 rounded-xl p-4 mb-4 text-lg"
        />

        <TouchableOpacity
          onPress={handleNext}
          disabled={!Valid}
          className={`rounded-xl py-4 mt-2 ${
            Valid ? "bg-purple-600" : "bg-gray-300"
          }`}
          style={{ opacity: Valid ? 1 : 0.5 }}
        >
          <Text className={`text-center font-bold text-lg ${
            Valid ? "text-white" : "text-gray-500"
          }`}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
