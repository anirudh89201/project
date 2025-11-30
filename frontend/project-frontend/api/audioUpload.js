import { axiosClient } from "../api/axiosClient";
let Question = ""
export const SetTopic = (Topic) => {
  console.log(Topic)
  Question = Topic
} 
export const uploadAudio = async (fileUri) => {
  try {
    const formData = new FormData();
    formData.append("audio", {
      uri: fileUri,
      type: "audio/m4a",
      name: "recording.m4a",
    });
    formData.append("Question",Question)

    console.log("Uploading...");
    console.log(formData)
    const response = await axiosClient.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("U cam here?")
    return response.data; // server response
  } catch (err) {
    console.log("Upload error:", err.message);
    throw err; // rethrow to handle in component
  }
};
