import { View, Text,ScrollView,TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { axiosClient } from '@/api/axiosClient';
import { AuthContext } from '@/context/auth-context';
import { router } from 'expo-router';
import { AxiosError } from 'axios';
type ReportState = {
    response:string
}
const AllReports = () => {
    const {token} = useContext(AuthContext)
    const [Reports,SetReports] = useState<ReportState[]>();
    useEffect(() => {
        const getData = async() => {
            try{
                const response = await axiosClient.get("/report/AllReports",{
                    headers:{
                        "Authorization":`Bearer ${token}`
                    }
                })
                if(response?.data){
                    SetReports(response.data)
                }
            }catch(error){
              if(error instanceof AxiosError){
                alert(error.response?.data?.message)
                router.replace("/screens/home")
              }
              console.log("Error is:",error)
            }
        }
        getData();
    },[])
    return (
        <ScrollView className="flex-1 bg-white p-4">
          <Text className="text-2xl font-bold mb-4">All Reports</Text>
      
          {/* No Reports */}
          {(!Reports || Reports.length === 0) && (
            <Text className="text-gray-500 text-center mt-4">
              No Reports to show — start practicing!
            </Text>
          )}
      
          {/* List Reports */}
          {Reports?.map((item, index) => {
            if (!item.response) return null;
      
            return (
              <TouchableOpacity
                key={index}
                className="p-4 mb-3 bg-gray-100 rounded-xl"
                onPress={() =>
                  router.push({
                    pathname: "/screens/ReportScreen",
                    params: { data: item.response },
                  })
                }
              >
                <Text className="text-lg font-semibold">Report {index + 1}</Text>
      
                <Text className="text-gray-600 mt-1">
                  {JSON.parse(item.response).improved_answer.substring(0, 50)}...
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      );
      
}

export default AllReports