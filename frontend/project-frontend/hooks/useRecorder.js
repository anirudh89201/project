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
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDuration((d) => d + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // ---- START ----
  const startRecording = async () => {
    try {
      // Always create a new Recording instance
      const recording = new Audio.Recording();

      await recording.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      await recording.startAsync();

      recordingRef.current = recording;
      setIsRecording(true);
      setIsPaused(false);
      setDuration(0);
      startTimer();
    } catch (err) {
      console.log("Error starting recording:", err);
    }
  };

  // ---- PAUSE ----
  const pauseRecording = async () => {
    try {
      const recording = recordingRef.current;
      if (!recording) return;

      await recording.pauseAsync();
      setIsPaused(true);
      stopTimer();
    } catch (err) {
      console.log("Error pausing recording:", err);
    }
  };

  // ---- RESUME ----
  const resumeRecording = async () => {
    try {
      const recording = recordingRef.current;
      if (!recording) return;

      await recording.startAsync(); // resumes
      setIsPaused(false);
      startTimer();
    } catch (err) {
      console.log("Error resuming recording:", err);
    }
  };

  // ---- STOP ----
  const stopRecording = async (token) => {
    try {
      stopTimer();

      const recording = recordingRef.current;
      if (!recording) return;

      try {
        await recording.stopAndUnloadAsync();
      } catch (e) {
        console.log("Safe stop error:", e);
      }

      const uri = recording.getURI();

      // Reset recorder
      recordingRef.current = null;
      setIsRecording(false);
      setIsPaused(false);

      if (duration < 5) {
        Alert.alert("Recording is too short!", "Speak at least 5 seconds.");
        setDuration(0);
        return
      }

      setDuration(0);

      // Upload if valid
      if (uri && token) {
        await uploadAudio(uri, token);
      }

      return { success: true };
    } catch (err) {
      console.log("Error stopping recording:", err);
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
