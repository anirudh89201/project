import { useState, useRef, useEffect } from "react";
import { Audio } from "expo-av";
import { Alert } from "react-native";
import { uploadAudio } from "../api/audioUpload.js";
import * as SecureStorage from "expo-secure-store";


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
  
    return () => {
      // CLEANUP
      (async () => {
        try {
          // stop timer if running
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
  
          // stop & unload leftover recording
          const rec = recordingRef.current;
          if (rec) {
            const status = await rec.getStatusAsync();
            if (status.isRecording || status.isDoneRecording === false) {
              try {
                await rec.stopAndUnloadAsync();
              } catch (e) {}
            }
          }
  
          recordingRef.current = null;
          setIsRecording(false);
          setIsPaused(false);
  
          // reset audio mode
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            playsInSilentModeIOS: false,
          });
        } catch (err) {
          console.log("Cleanup error:", err);
        }
      })();
    };
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
  const stopRecording = async (token,Question) => {
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
        setDuration(0);
        throw new Error("The recording is too short!!")
      }

      setDuration(0);

      if (uri && token) {
          await uploadAudio(uri, token,Question);
      }
      return { success: true };
    } catch (err) {
      throw err
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
