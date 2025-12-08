import { useState, useRef, useEffect } from "react";
import { Audio } from "expo-av";
import { Alert } from "react-native";
import { uploadAudio } from "../api/audioUpload.js";

export default function useRecorder() {
  const recordingRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const timerRef = useRef(null);

  // Permissions + Audio Mode
  useEffect(() => {
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access microphone was denied");
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
    })();
  }, []);

  // ---- TIMER ----
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setDuration((d) => d + 1);
    }, 1000);
  };

  const stopTimer = () => clearInterval(timerRef.current);

  // ---- START ----
  const startRecording = async () => {
    try {
      if (recordingRef.current) {
        await recordingRef.current.stopAndUnloadAsync();
      }

      const recording = new Audio.Recording();

      await recording.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      await recording.startAsync(); // start or resume

      recordingRef.current = recording;
      setIsRecording(true);
      setIsPaused(false);
      startTimer();
    } catch (err) {
      console.log("Error starting recording:", err);
    }
  };

  // ---- PAUSE ----
  const pauseRecording = async () => {
    try {
      if (!recordingRef.current) return;

      await recordingRef.current.pauseAsync();
      setIsPaused(true);
      stopTimer();
    } catch (err) {
      console.log("Error pausing:", err);
    }
  };

  // ---- RESUME ----
  const resumeRecording = async () => {
    try {
      if (!recordingRef.current) return;

      await recordingRef.current.startAsync(); // resume
      setIsPaused(false);
      startTimer();
    } catch (err) {
      console.log("Error resuming:", err);
    }
  };

  // ---- STOP ----
  const stopRecording = async (token) => {
    try {
      stopTimer();

      const recording = recordingRef.current;
      if (!recording) return;

      await recording.stopAndUnloadAsync();

      const uri = recording.getURI();

      setDuration(0);
      setIsRecording(false);
      setIsPaused(false);

      // Upload audio
      if (uri) {
        await uploadAudio(uri, token);
      }
      return {success:true}
    } catch (err) {
      console.log("Error stopping:", err);
    }
  };

  return {
    isRecording,
    isPaused,
    duration,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
  };
}
