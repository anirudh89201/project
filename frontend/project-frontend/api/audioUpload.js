import { axiosClient } from "../api/axiosClient";
export const uploadAudio = async (fileUri, token,Question) => {
  try {
    console.log("Uploading file:", fileUri);
    const formData = new FormData();
    formData.append("audio", {
      uri: fileUri,
      type: "audio/m4a",
      name: "recording.m4a",
    });
    formData.append("Question", Question);
    console.log(Question)
    const response = await axiosClient.post("/upload", formData, {
      headers: {
        "Content-Type":"multipart/form-data",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      timeout: 120000,
    });

    return response;
  } catch (err) {
    console.log("Axios error:", err);

    if (err.response) {
      throw new Error(err.response.data?.message || "Server error");
    }

    throw new Error("Network error : cannot sent request");
  }
};
