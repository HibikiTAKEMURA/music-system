import { FUNCTIONS, MODALITIES, TYPES } from "@/constants/music";

export type Function = typeof FUNCTIONS[number];

export type Modality = typeof MODALITIES[number];

export type Type = typeof TYPES[number];

export type Chord = {
  numberOfSeminotes: number;
  degreeName: string;
  function: Function;
  modality: Modality[];
  type: Type;
  scales: string[];
};
