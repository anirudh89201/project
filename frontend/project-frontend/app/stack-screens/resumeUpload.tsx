import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { DocumentFile } from "@/constants/DocumentFile";
import { useResume } from "@/hooks/useResume";

const ResumeUpload = () => {
  const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);

  const { uploadResume, loading, error, data } = useResume();

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      const asset = result.assets[0];

      // Convert DocumentPickerAsset → DocumentFile
      const fileToUpload: DocumentFile = {
        uri: asset.uri,
        name: asset.name || "resume.pdf",
        type: asset.mimeType || "application/pdf"
      };

      await uploadResume(fileToUpload);
    }
  };

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={pickFile}>
        <Text>Enter Resume</Text>
      </TouchableOpacity>

      {loading && <Text>Loading..</Text>}
      {error && <Text>{error}</Text>}
      {data && <Text>Upload Successful...</Text>}
    </SafeAreaView>
  );
};

export default ResumeUpload;
