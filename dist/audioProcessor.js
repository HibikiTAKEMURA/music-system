class AudioProcessor extends AudioWorkletProcessor {
    constructor() {
      super();
      this.audioBuffer = [];
      this.port.onmessage = (event) => {
        if (event.data === "send") {
          this.port.postMessage(this.audioBuffer);
          this.audioBuffer = [];
        }
      };
    }
  
    process(inputs) {
      if (inputs[0]?.length > 0) {
        this.audioBuffer.push(...inputs[0][0]);
      }
      return true;
    }
  }
  
  registerProcessor("audio-processor", AudioProcessor);
  