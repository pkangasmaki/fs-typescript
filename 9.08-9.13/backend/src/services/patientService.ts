import patientData from '../../data/patients.json';
import { patientEntry, nonConfidentalPatientEntry } from '../types';
import { toNewPatientEntry } from '../utils';

const patients: Array<patientEntry> = patientData.map(obj => {
  const object = toNewPatientEntry(obj) ;
  object.id = obj.id;
  return object;
});

//const patients: Array<patientEntry> = patientData;

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