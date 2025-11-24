import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import * as DocumentPicker from 'expo-document-picker'
import { SafeAreaView } from 'react-native-safe-area-context';
const ResumeUpload = () => {
    const [File,setFile] = useState<DocumentPicker.DocumentPickerAsset | null >(null);
    const pickFile = async() => {
        const result = await DocumentPicker.getDocumentAsync({
            type:'application/pdf',
            copyToCacheDirectory:true
        })
        if(!result.canceled){
            setFile(result.assets[0])
            console.log(result.assets[0])
        }
    }
    return (
    <SafeAreaView>
        <TouchableOpacity onPress={pickFile}>
            <Text>Enter Resume</Text>
            </TouchableOpacity>
        {File && <Text>{File?.name}</Text>}
    </SafeAreaView>
  )
}

export default ResumeUpload