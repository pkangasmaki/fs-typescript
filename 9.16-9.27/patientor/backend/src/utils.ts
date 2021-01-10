/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Gender, patientEntry } from './types';

const uniqueId = (): string => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

const isString = (value: any): value is string => {
  return typeof value === 'string' || value instanceof String;
};

const isDate = (value: string): boolean => {
  return Boolean(Date.parse(value));
};

const parseStringValue = (value: any, text: string): string => {
  if(!value || !isString(value)) {
    throw new Error(`incorrect ${text}`);
  }

  return value;
};

const parseDate = (value: any): string => {
  if (!value || !isString(value) || !isDate(value)) {
    throw new Error('Incorrect date');
  }
  return value;
};

const isGender = (value: any): value is Gender => {
  return Object.values(Gender).includes(value);
};

const parseGender = (value: any): Gender => {
  if(!value || !isGender(value)) {
    throw new Error('Incorrect gender');
  }
  return value;
};


export const toNewPatientEntry = (object: any): patientEntry => {
  const newEntry = { 
    name: parseStringValue(object.name, 'name'), 
    dateOfBirth: parseDate(object.dateOfBirth), 
    gender: parseGender(object.gender), 
    occupation: parseStringValue(object.occupation, 'occupation'), 
    ssn: parseStringValue(object.ssn, 'ssn'),
    id: uniqueId(),
    entries: []
  };
  return newEntry;
};