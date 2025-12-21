import { axiosClient } from "@/api/axiosClient";
import { AuthContext } from "@/context/auth-context";
import { useContext, useEffect,useState } from "react";
import * as SecureStorage from "expo-secure-store";

import { ActivityIndicator, ScrollView, View,Text } from "react-native";
 const ReportScreen = () => {
    const {token} = useContext(AuthContext)
    const [report,SetReport] = useState<any>(null);
    const [loading,SetLoading] = useState(true);
    let ReportURL = '/report/latest';
    useEffect(() => {
      const getReport = async() => {
        try{
            const req = await axiosClient.get(`${ReportURL}`,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            const data = JSON.parse(req.data.response)
            console.log(report)
            SetReport(data);
        }catch(error){
          alert(error)
        }finally{
            SetLoading(false);
        }
    }
    getReport();
    },[])
    if(loading){
        return (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size={"large"}/>
          </View>
        );
    }
    return (
<ScrollView className="flex-1 p-4 bg-gray-50">
  <Text className="text-3xl font-extrabold mb-2 text-blue-500">
    Your Report
  </Text>
  <Text className="text-sm text-gray-500 mb-5">
    Keep practicing to improve your score! 🎉
  </Text>
  
  {/* SCORES */}
  <View className="mb-6 bg-white rounded-2xl p-4 shadow-lg">
    <Text className="text-xl font-bold mb-3 text-gray-800">
      Scores
    </Text>
    <View className="flex-row flex-wrap gap-3">
      <View className="bg-green-500 rounded-xl p-3 flex-1 min-w-[100px]">
        <Text className="text-xs text-white font-semibold">Fluency</Text>
        <Text className="text-2xl font-extrabold text-white">{report?.scores?.fluency}</Text>
      </View>
      <View className="bg-orange-500 rounded-xl p-3 flex-1 min-w-[100px]">
        <Text className="text-xs text-white font-semibold">Vocabulary</Text>
        <Text className="text-2xl font-extrabold text-white">{report?.scores?.vocabulary}</Text>
      </View>
      <View className="bg-purple-500 rounded-xl p-3 flex-1 min-w-[100px]">
        <Text className="text-xs text-white font-semibold">Grammar</Text>
        <Text className="text-2xl font-extrabold text-white">{report?.scores?.grammar}</Text>
      </View>
      <View className="bg-blue-500 rounded-xl p-3 flex-1 min-w-[100px]">
        <Text className="text-xs text-white font-semibold">Confidence</Text>
        <Text className="text-2xl font-extrabold text-white">{report?.scores?.confidence}</Text>
      </View>
      <View className="bg-yellow-500 rounded-xl p-3 flex-1 min-w-[100px]">
        <Text className="text-xs text-white font-semibold">Topic Coverage</Text>
        <Text className="text-2xl font-extrabold text-white">{report?.scores?.topic_coverage}</Text>
      </View>
      <View className="bg-red-500 rounded-xl p-3 flex-1 min-w-[100px]">
        <Text className="text-xs text-white font-semibold">Overall</Text>
        <Text className="text-2xl font-extrabold text-white">{report?.scores?.overall}</Text>
      </View>
    </View>
  </View>
  
  {/* FEEDBACK SECTIONS */}
  <View className="mb-4 bg-white rounded-2xl p-4 shadow-lg border-l-4 border-green-500">
    <Text className="text-lg font-bold mb-2 text-gray-800">
      💬 Filler Feedback
    </Text>
    <Text className="text-sm leading-6 text-gray-700">{report?.filler_feedback}</Text>
  </View>
  
  <View className="mb-4 bg-white rounded-2xl p-4 shadow-lg border-l-4 border-purple-500">
    <Text className="text-lg font-bold mb-2 text-gray-800">
      ✏️ Grammar Issues
    </Text>
    <Text className="text-sm leading-6 text-gray-700">{report?.grammar_issues}</Text>
  </View>
  
  <View className="mb-4 bg-white rounded-2xl p-4 shadow-lg border-l-4 border-orange-500">
    <Text className="text-lg font-bold mb-2 text-gray-800">
      📚 Vocabulary Suggestions
    </Text>
    <Text className="text-sm leading-6 text-gray-700">{report?.vocabulary_suggestions}</Text>
  </View>
  
  <View className="mb-4 bg-white rounded-2xl p-4 shadow-lg border-l-4 border-blue-500">
    <Text className="text-lg font-bold mb-2 text-gray-800">
      💡 Topic Tips
    </Text>
    <Text className="text-sm leading-6 text-gray-700">{report?.topic_tips}</Text>
  </View>
  
  {/* IMPROVED ANSWER */}
  <View className="mb-8 bg-yellow-50 rounded-2xl p-4 shadow-lg border-2 border-yellow-400">
    <Text className="text-lg font-bold mb-2 text-gray-800">
      ✨ Improved Answer
    </Text>
    <Text className="text-sm leading-6 text-gray-700 italic">{report?.improved_answer}</Text>
  </View>
</ScrollView>          
    );
}
export default ReportScreen;