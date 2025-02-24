import { useEffect, useRef, useState } from "react";
import * as Pitchfinder from "pitchfinder";

const TunerContent: React.FC = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [audioData, setAudioData] = useState<Float32Array | null>(null);
  const [detectedPitch, setDetectedPitch] = useState<number | null>(null);
  const [sampleRate, setSampleRate] = useState<number>(48000);

  useEffect(() => {
    const initAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;
        setSampleRate(audioContext.sampleRate);
        console.log(audioContext.sampleRate);

        await audioContext.audioWorklet.addModule("/audioProcessor.js");
        const workletNode = new AudioWorkletNode(audioContext, "audio-processor");
        workletNodeRef.current = workletNode;

        const source = audioContext.createMediaStreamSource(stream);
        source.connect(workletNode);

        // AudioWorkletNode からデータを取得
        workletNode.port.onmessage = (event) => {
          const float32Array = new Float32Array(event.data);
          setAudioData(float32Array);
        };

        // ごとにデータをリクエスト
        intervalRef.current = setInterval(() => {
          workletNode.port.postMessage("send");
        }, 250);

      } catch (err) {
        console.error("Error accessing microphone:", err);
      }
    };

    initAudio();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (workletNodeRef.current) workletNodeRef.current.disconnect();
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  // Pitchfinderを適用
  useEffect(() => {
    if (audioData) {
      const detectPitch = Pitchfinder.AMDF({ sampleRate: sampleRate });
      const pitch = detectPitch(audioData);
      setDetectedPitch(pitch);
    }
  }, [audioData]);

  return (
    <div>
      <p>Recording...</p>
      <p>Detected Pitch: {detectedPitch ? `${detectedPitch.toFixed(2)} Hz` : "N/A"}</p>
    </div>
  );
};

export default TunerContent;
