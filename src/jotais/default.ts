import { ScoreData } from "@/type/api/ScoreData";
import { atom } from "jotai";

export const locationPathAtom = atom('');

export const scoreDataAtom = atom<ScoreData[]>([]);
