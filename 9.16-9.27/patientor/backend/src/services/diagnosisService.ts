import diagnosisData from '../../data/diagnoses.json';
import { diagnosisEntry } from '../types';

const diagnoses: Array<diagnosisEntry> = diagnosisData;

const getEntries = (): Array<diagnosisEntry> => {
  return diagnoses;
};

export default {
  getEntries
};