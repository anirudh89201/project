import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

export default function PhoneNumberScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleNext = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      alert('Please enter a valid phone number');
      return;
    }
    router.push('/stack-screens/OTPScreen'); // Navigate to OTP screen
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gradient-to-b from-purple-500 to-pink-500 justify-center px-6"
    >
      <View className="bg-white rounded-2xl p-6 shadow-lg">
        <Text className="text-2xl font-bold text-center text-purple-700 mb-4">
          Enter Your Phone Number
        </Text>

        <TextInput
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="numeric"
          className="border-2 border-purple-300 rounded-xl p-4 mb-4 text-lg"
        />

        <TouchableOpacity
          onPress={handleNext}
          className="bg-purple-600 rounded-xl py-4 mt-2"
        >
          <Text className="text-white text-center font-bold text-lg">
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
