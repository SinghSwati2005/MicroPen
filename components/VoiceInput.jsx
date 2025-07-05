// components/VoiceInput.jsx
"use client";
import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const VoiceInput = ({ onResult }) => {
  const [language, setLanguage] = useState("en-IN");
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    onResult(transcript);
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <p>Your browser does not support voice input.</p>;
  }

  return (
    <div className="p-4 bg-white rounded shadow mb-4">
      <label className="block text-sm font-semibold mb-2">Choose Language:</label>
      <select
        className="p-2 border rounded w-full mb-3"
        onChange={(e) => setLanguage(e.target.value)}
        value={language}
      >
        <option value="en-IN">English (India)</option>
        <option value="hi-IN">Hindi</option>
        <option value="bn-IN">Bengali</option>
      </select>

      <div className="flex gap-4 items-center">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={startListening}
        >
          🎤 Start
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={stopListening}
        >
          🛑 Stop & Insert
        </button>
        {listening && <p className="text-sm text-gray-600">Listening...</p>}
      </div>
    </div>
  );
};

export default VoiceInput;
