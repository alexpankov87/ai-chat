// src/hooks/useSpeechRecognition.ts

import { useState, useRef, useCallback } from 'react';
import type { SpeechRecognition, WindowWithSpeech } from '../types/speech';

interface UseSpeechRecognitionReturn {
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  isSupported: boolean;
}

const SpeechRecognitionAPI =
  (window as WindowWithSpeech).SpeechRecognition ||
  (window as WindowWithSpeech).webkitSpeechRecognition;

// Хук для работы с Web Speech API
// Поддерживает русский язык, обрабатывает ошибки
export const useSpeechRecognition = (
  onResult: (transcript: string) => void,
  onError: (error: string) => void
): UseSpeechRecognitionReturn => {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isSupported = !!SpeechRecognitionAPI;

  const startRecording = useCallback(() => {
    if (!SpeechRecognitionAPI) {
      onError('Браузер не поддерживает голосовой ввод');
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = 'ru-RU';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => setIsRecording(true);

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      onError(`Ошибка распознавания: ${event.error}`);
      setIsRecording(false);
    };

    recognition.onend = () => setIsRecording(false);

    recognitionRef.current = recognition;
    recognition.start();
  }, [onResult, onError]);

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  }, []);

  return { isRecording, startRecording, stopRecording, isSupported };
};