import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";

import { DocumentFile } from "@/constants/DocumentFile";
import { useResume } from "@/hooks/useResume";
import { useRouter } from "expo-router";

const ResumeUpload = () => {
  const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const { uploadResume, loading, error, StatusCode } = useResume();
  const router = useRouter();  
  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      console.log(JSON.stringify(asset));
      // Convert DocumentPickerAsset → DocumentFile
      const fileToUpload: DocumentFile = {
        uri: asset.uri,
        name: asset.name || "resume.pdf",
        type: asset.mimeType || "application/pdf"
      };
      try{
           await uploadResume(fileToUpload);
          router.push("/stack-screens/QuestionScreen")
      }catch(err){
        if(err instanceof Error){
          alert(err.message)
        }else{
          alert("Upload failed: Unknown error")
        }
      }
    }
  };

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={pickFile}>
        <Text>Enter Resume</Text>
      </TouchableOpacity>
      {loading && <Text>Loading..</Text>}
      {error && <Text>{error}</Text>}
    </SafeAreaView>
  );
};

export default ResumeUpload;
