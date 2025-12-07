import {View,Text, TouchableOpacity,StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import useRecorder from "../../hooks/useRecorder.js"
import { AuthContext } from '@/context/auth-context.js';
const RecorderScreen = () => {
  const {token} = useContext(AuthContext)
  const handleStop = async() => {
    console.log("Hello:=" +token)
    await stopRecording(token)
  }
    const {
        isRecording,
        isPaused,
        duration,
        startRecording,
        pauseRecording,
        resumeRecording,
        stopRecording
      } = useRecorder();
      const styles = StyleSheet.create({
        btn: {
          backgroundColor: "#4F46E5",
          paddingVertical: 14,
          borderRadius: 10,
          marginVertical: 6,
        },
        btnText: {
          color: "white",
          fontSize: 18,
          fontWeight: "600",
          textAlign: "center",
        },
      });
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>Time: {duration}s</Text>
    
        {/* Start */}
        {!isRecording && (
          <TouchableOpacity style={styles.btn} onPress={startRecording}>
            <Text style={styles.btnText}>Start</Text>
          </TouchableOpacity>
        )}
    
        {/* Pause */}
        {isRecording && !isPaused && (
          <TouchableOpacity style={styles.btn} onPress={pauseRecording}>
            <Text style={styles.btnText}>Pause</Text>
          </TouchableOpacity>
        )}
    
        {/* Resume */}
        {isRecording && isPaused && (
          <TouchableOpacity style={styles.btn} onPress={resumeRecording}>
            <Text style={styles.btnText}>Resume</Text>
          </TouchableOpacity>
        )}
    
        {/* Done */}
        {isRecording && (
          <TouchableOpacity style={[styles.btn, { backgroundColor: "#EF4444" }]} onPress={handleStop}>
            <Text style={styles.btnText}>Done</Text>
          </TouchableOpacity>
        )}
      </View>
    );
    
}

export default RecorderScreen