import { axiosClient } from "../api/axiosClient";
let Question = ""
export const SetTopic = (Topic) => {
  console.log(Topic)
  Question = Topic
} 
export const uploadAudio = async (fileUri,token) => {
  try {
    const formData = new FormData();
    formData.append("audio", {
      uri: fileUri,
      type: "audio/m4a",
      name: "recording.m4a",
    });
    formData.append("Question",Question)

    console.log(formData)
    console.log(token)
    const response = await axiosClient.post("/upload", formData, {
      headers: {
                  "Content-Type":"multipart/form-data",
                  "Authorization":`Bearer ${token}`
              },
    });
    return response; // server response
  } catch (err) {
    console.log(err)
    const message = err.response?.data?.message
    throw new Error(message)
  }
};
