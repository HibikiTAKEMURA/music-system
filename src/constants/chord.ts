import { Chord } from "@/type/music/chord";

export const MAJOR: Chord[] = [
  {
    numberOfSeminotes: 0,
    degreeName: "Imaj7",
    function: "Tonic",
    modality: ["Diatonic"],
    type: "maj7",
    scales: ["Ionian"]
  },
  {
    numberOfSeminotes: 2,
    degreeName: "IIm7",
    function: "Sub Dominant",
    modality: ["Diatonic"],
    type: "m7",
    scales: ["Dorian"]
  },
  {
    numberOfSeminotes: 4,
    degreeName: "IIIm7",
    function: "Tonic",
    modality: ["Diatonic"],
    type: "m7",
    scales: ["Phrygian"]
  },
  {
    numberOfSeminotes: 5,
    degreeName: "IVmaj7",
    function: "Sub Dominant",
    modality: ["Diatonic"],
    type: "maj7",
    scales: ["Lydian"]
  },
  {
    numberOfSeminotes: 7,
    degreeName: "V7",
    function: "Dominant",
    modality: ["Diatonic"],
    type: "7",
    scales: ["Mixolydian"]
  },
  {
    numberOfSeminotes: 9,
    degreeName: "VIm7",
    function: "Tonic",
    modality: ["Diatonic"],
    type: "m7",
    scales: ["Aeolian"]
  },
  {
    numberOfSeminotes: 11,
    degreeName: "VIIm7b5",
    function: "Dominant",
    modality: ["Diatonic"],
    type: "m7b5",
    scales: ["Locrian"]
  },
  {
    numberOfSeminotes: 0,
    degreeName: "Imaj",
    function: "Tonic",
    modality: ["Diatonic"],
    type: "maj",
    scales: ["Ionian"]
  },
  {
    numberOfSeminotes: 2,
    degreeName: "IIm",
    function: "Sub Dominant",
    modality: ["Diatonic"],
    type: "m",
    scales: ["Dorian"]
  },
  {
    numberOfSeminotes: 4,
    degreeName: "IIIm",
    function: "Tonic",
    modality: ["Diatonic"],
    type: "m",
    scales: ["Phrygian"]
  },
  {
    numberOfSeminotes: 5,
    degreeName: "IVmaj",
    function: "Sub Dominant",
    modality: ["Diatonic"],
    type: "maj",
    scales: ["Lydian"]
  },
  {
    numberOfSeminotes: 7,
    degreeName: "Vmaj",
    function: "Dominant",
    modality: ["Diatonic"],
    type: "maj",
    scales: ["Mixolydian"]
  },
  {
    numberOfSeminotes: 9,
    degreeName: "VIm",
    function: "Tonic",
    modality: ["Diatonic"],
    type: "m",
    scales: ["Aeolian"]
  },
  {
    numberOfSeminotes: 11,
    degreeName: "VIIdim",
    function: "Dominant",
    modality: ["Diatonic"],
    type: "dim",
    scales: ["Locrian"]
  }
];

export const MINOR: Chord[] = [
  {
    numberOfSeminotes: 0,
    degreeName: "Im7",
    function: "Tonic",
    modality: ["Natural Minor"],
    type: "m7",
    scales: ["Aeolian"]
  },
  {
    numberOfSeminotes: 0,
    degreeName: "ImM7",
    function: "Tonic",
    modality: ["Harmonic Minor", "Melodic Minor"],
    type: "mM7",
    scales: ["Harmonic Minor", "Melodic Minor"]
  },
  {
    numberOfSeminotes: 2,
    degreeName: "IIm7b5",
    function: "Sub Dominant",
    modality: ["Natural Minor", "Harmonic Minor"],
    type: "m7b5",
    scales: ["Locrian"]
  },
  {
    numberOfSeminotes: 2,
    degreeName: "IIm7",
    function: "Sub Dominant",
    modality: ["Melodic Minor"],
    type: "m7",
    scales: ["Dorian b2"]
  },
  {
    numberOfSeminotes: 3,
    degreeName: "bIIImaj7",
    function: "Tonic",
    modality: ["Natural Minor"],
    type: "maj7",
    scales: ["Ionian"]
  },
  {
    numberOfSeminotes: 3,
    degreeName: "bIIImaj7#5",
    function: "Sub Dominant",
    modality: ["Harmonic Minor", "Melodic Minor"],
    type: "maj7#5",
    scales: []
  },
  {
    numberOfSeminotes: 5,
    degreeName: "IVm7",
    function: "Sub Dominant",
    modality: ["Natural Minor", "Harmonic Minor"],
    type: "m7",
    scales: ["Dorian"]
  },
  {
    numberOfSeminotes: 5,
    degreeName: "IV7",
    function: "Sub Dominant",
    modality: ["Melodic Minor"],
    type: "7",
    scales: ["Lydian b7"]
  },
  {
    numberOfSeminotes: 7,
    degreeName: "Vm7",
    function: "Dominant",
    modality: ["Natural Minor"],
    type: "m7",
    scales: ["Phrygian"]
  },
  {
    numberOfSeminotes: 7,
    degreeName: "V7",
    function: "Dominant",
    modality: ["Harmonic Minor", "Melodic Minor"],
    type: "7",
    scales: ["Phrygian Dominant"]
  },
  {
    numberOfSeminotes: 8,
    degreeName: "bVImaj7",
    function: "Sub Dominant",
    modality: ["Natural Minor", "Harmonic Minor"],
    type: "maj7",
    scales: ["Lydian"]
  },
  {
    numberOfSeminotes: 9,
    degreeName: "VIm7b5",
    function: "Tonic",
    modality: ["Melodic Minor"],
    type: "m7b5",
    scales: ["Locrian", "Locrian #2"]
  },
  {
    numberOfSeminotes: 10,
    degreeName: "bVII7",
    function: "Sub Dominant",
    modality: ["Natural Minor"],
    type: "7",
    scales: ["Mixolydian"]
  },
  {
    numberOfSeminotes: 11,
    degreeName: "VIIdim7",
    function: "Dominant",
    modality: ["Harmonic Minor"],
    type: "dim7",
    scales: []
  },
  {
    numberOfSeminotes: 11,
    degreeName: "VIIm7b5",
    function: "Dominant",
    modality: ["Melodic Minor"],
    type: "m7b5",
    scales: []
  },
  {
    numberOfSeminotes: 0,
    degreeName: "Im",
    function: "Tonic",
    modality: ["Natural Minor", "Harmonic Minor", "Melodic Minor"],
    type: "m",
    scales: ["Aeolian", "Harmonic Minor", "Melodic Minor"]
  },
  {
    numberOfSeminotes: 2,
    degreeName: "IIdim",
    function: "Sub Dominant",
    modality: ["Natural Minor", "Harmonic Minor"],
    type: "dim",
    scales: ["Locrian"]
  },
  {
    numberOfSeminotes: 2,
    degreeName: "IIm",
    function: "Sub Dominant",
    modality: ["Melodic Minor"],
    type: "m",
    scales: ["Dorian b2"]
  },
  {
    numberOfSeminotes: 3,
    degreeName: "bIIImaj",
    function: "Tonic",
    modality: ["Natural Minor"],
    type: "maj",
    scales: ["Ionian"]
  },
  {
    numberOfSeminotes: 3,
    degreeName: "bIIIaug",
    function: "Sub Dominant",
    modality: ["Harmonic Minor", "Melodic Minor"],
    type: "aug",
    scales: []
  },
  {
    numberOfSeminotes: 5,
    degreeName: "IVm",
    function: "Sub Dominant",
    modality: ["Natural Minor", "Harmonic Minor"],
    type: "m",
    scales: ["Dorian"]
  },
  {
    numberOfSeminotes: 5,
    degreeName: "IVmaj",
    function: "Sub Dominant",
    modality: ["Melodic Minor"],
    type: "maj",
    scales: ["Lydian b7"]
  },
  {
    numberOfSeminotes: 7,
    degreeName: "Vm",
    function: "Dominant",
    modality: ["Natural Minor"],
    type: "m",
    scales: ["Phrygian"]
  },
  {
    numberOfSeminotes: 7,
    degreeName: "Vmaj",
    function: "Dominant",
    modality: ["Harmonic Minor", "Melodic Minor"],
    type: "maj",
    scales: ["Phrygian Dominant"]
  },
  {
    numberOfSeminotes: 8,
    degreeName: "bVImaj",
    function: "Sub Dominant",
    modality: ["Natural Minor", "Harmonic Minor"],
    type: "maj",
    scales: ["Lydian"]
  },
  {
    numberOfSeminotes: 9,
    degreeName: "VIdim",
    function: "Tonic",
    modality: ["Melodic Minor"],
    type: "dim",
    scales: ["Locrian", "Locrian #2"]
  },
  {
    numberOfSeminotes: 10,
    degreeName: "bVIImaj",
    function: "Sub Dominant",
    modality: ["Natural Minor"],
    type: "maj",
    scales: ["Mixolydian"]
  },
  {
    numberOfSeminotes: 11,
    degreeName: "VIIdim",
    function: "Dominant",
    modality: ["Harmonic Minor", "Melodic Minor"],
    type: "dim",
    scales: []
  }
];
