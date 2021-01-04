import patientData from '../../data/patients.json';
import { patientEntry, nonConfidentalPatientEntry } from '../types';

const patients: Array<patientEntry> = patientData;

const getEntries = (): Array<patientEntry> => {
  return patients;
};

const getNonConfidentalEntries = (): Array<nonConfidentalPatientEntry> => {

  const confidentalPatientData = patients.map((e) => {
    return {
      id: e.id,
      name: e.name,
      dateOfBirth: e.dateOfBirth,
      gender: e.gender,
      occupation: e.occupation
    };
  });

  return confidentalPatientData;
};


const addEntry = (newEntry: patientEntry): patientEntry => {
  const newPatient = {
    ...newEntry
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getEntries, getNonConfidentalEntries, addEntry };