import patients from '../../data/patients';
import { patientEntry, nonConfidentalPatientEntry, Entry } from '../types';

const getEntries = (): Array<patientEntry> => {
  return patients;
};

const getNonConfidentalEntries = (): Array<nonConfidentalPatientEntry> => {

  const nonConfidentalData = patients.map((e) => {
    return {
      name: e.name,
      ssn: e.ssn,
      occupation: e.occupation,
      dateOfBirth: e.dateOfBirth,
      gender: e.gender,
      id: e.id,
      entries: e.entries
    };
  });

  return nonConfidentalData;
};


const addEntry = (newEntry: patientEntry): patientEntry => {
  const newPatient = {
    ...newEntry
  };
  patients.push(newPatient);
  return newPatient;
};

const uniqueId = (): string => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

const newEntryToPatient = (entry: Entry, patient: patientEntry): patientEntry => {
  const newEntry = {
    ...entry,
    id: uniqueId()
  };
  patient.entries.push(newEntry);
  console.log('patient:', patient);
  return patient;
};

export default { getEntries, getNonConfidentalEntries, addEntry, newEntryToPatient };