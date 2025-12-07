import { useState, useRef, useEffect, useContext } from "react";
import {
  useAudioRecorder,
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorderState,
} from "expo-audio";
import {uploadAudio} from "../api/audioUpload.js"
import { Alert } from "react-native";

export default function useRecorder() {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);
  const [duration, setDuration] = useState(0);
  const timerRef = useRef(null);

  // Permissions
  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        Alert.alert("Permission to access microphone was denied");
      }

      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
    })();
  }, []);

  // Start
  const startRecording = async () => {
    try {
      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();
      startTimer();
    } catch (err) {
      console.log("Error starting:", err);
    }
  };

  // Pause
  const pauseRecording = async () => {
    try {
      audioRecorder.pause();
      stopTimer();
    } catch (err) {
      console.log("Error pausing:", err);
    }
  };

  // Resume
  const resumeRecording = async () => {
    try {
      audioRecorder.resume();
      startTimer();
    } catch (err) {
      console.log("Error resuming:", err);
    }
  };

  // Stop
  const stopRecording = async (token) => {
    try {
      stopTimer();
      await audioRecorder.stop();
      const uri = audioRecorder.uri;
      setDuration(0);
      await uploadAudio(uri,token)
      return uri;
    } catch (err) {
      console.log("Error stopping:", err);
    }
  };

  // Timer
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setDuration((d) => d + 1);
    }, 1000);
  };
  const stopTimer = () => clearInterval(timerRef.current);

  return {
    isRecording: recorderState.isRecording,
    isPaused: recorderState.isPaused,
    duration,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording
  };
}
