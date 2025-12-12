import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useContext, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { OtpInput } from "react-native-otp-entry";
import { verifyOTP } from "../../api/verifyOTP.js";
import { AuthContext } from '@/context/auth-context.js';

const OTPScreen = () => {
  const { signIn } = useContext(AuthContext);
  const { EmailID } = useLocalSearchParams();
  const [OTP, SetOTP] = useState("");
  const [loading, SetLoading] = useState(false);

  const checkOTP = async () => {
    if (OTP.length < 6) {
      alert("Invalid OTP...");
      return;
    }

    SetLoading(true);

    const response = await verifyOTP(OTP, EmailID);

    if (response?.success) {
      await signIn(response?.data?.token);

      // IMPORTANT: Do NOT turn loading off before navigating
      router.replace("/stack-screens/QuestionScreen");
    } else {
      SetLoading(false); // Only turn it off on failure
      alert(response.data);
    }
  };

  return loading ? (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <View className="flex-1 bg-white justify-center px-6">
      <Text className="text-2xl font-semibold text-center mb-8">
        Enter Verification Code
      </Text>

      <View className="items-center mb-12">
        <OtpInput
          numberOfDigits={6}
          onTextChange={SetOTP}
          focusColor="#2563eb"
          theme={{
            pinCodeContainerStyle: {
              width: 42,
              height: 50,
              borderRadius: 8,
              borderWidth: 1.2,
              borderColor: "#2563eb",
              marginHorizontal: 4,
            },
            pinCodeTextStyle: {
              fontSize: 20,
              fontWeight: "600",
            },
          }}
        />
      </View>

      <TouchableOpacity
        className="bg-blue-600 w-full py-4 rounded-xl items-center shadow-md"
        activeOpacity={0.85}
        onPress={checkOTP}
      >
        <Text className="text-white text-lg font-semibold">
          Verify
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OTPScreen;
