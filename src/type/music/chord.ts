export type Function = "Tonic" | "Sub Dominant" | "Dominant";

export type Modality =
  | "Diatonic"
  | "Parallel Minor"
  | "Harmonic Minor"
  | "Melodic Minor"
  | "Modal Interchange"
  | "Tritone Substitution"
  | "Secondary Dominant";

export type Type =
  | " "
  | "M"
  | "m"
  | "M7"
  | "m7"
  | "7"
  | "dim"
  | "m7(b5)"
  | "aug"
  | "mM7"
  | "dim7"
  | "augM7";

export type Chord = {
  numberOfSeminotes: number;
  degreeName: string;
  function: Function;
  modality: Modality[];
  type: Type;
  scales: string[];
};
