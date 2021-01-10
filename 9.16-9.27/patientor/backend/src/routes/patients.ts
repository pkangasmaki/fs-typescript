/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express from 'express';
import patientService from '../services/patientService';
import { patientEntry } from '../types';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonConfidentalEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getEntries().find(patient => patient.id === req.params.id);
  if(!patient) {
    res.status(400).send('Given id was not valid.');
  }
  res.send(patient);
});

router.post('/', (req, res) => {
  try {
    const newEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addEntry(newEntry);
    res.send(addedPatient);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  const patient = patientService.getEntries().find(patient => patient.id === req.params.id);
  if(!patient) {
    res.status(400).end('Given patient-id was not valid.');
  }

  if(!req.body) res.status(404).end('Internal error');
  if(!req.body.type) res.status(404).end('Entry-type error');

  if (!req.body.description || !req.body.date || !req.body.specialist) {
    res.status(400).end('Incorrect input');
  }

  if(req.body.type === 'HealthCheck') {
    if(!req.body.healthCheckRating && req.body.healthCheckRating !== 0) res.status(400).end('healthCheckRating missing');
    else {
      // patient as patientEntry because there have been checks that it will not be undefined
      const addedEntry = patientService.newEntryToPatient(req.body, patient as patientEntry);
      res.send(addedEntry);
    }
  }

  else if(req.body.type === 'Hospital') {
    if(!req.body.discharge) res.status(400).end('discharge missing');
    else if(!req.body.discharge.date) res.status(400).end('discharge.date missing');
    else if(!req.body.discharge.criteria) res.status(400).end('discharge.criteria missing');
    else {
      // patient as patientEntry because there have been checks that it will not be undefined
      const addedEntry = patientService.newEntryToPatient(req.body, patient as patientEntry);
      res.send(addedEntry);
    }
  }
  else if(req.body.type === 'OccupationalHealthcare') {
    if(!req.body.employerName) res.status(400).end('employerName missing');
    else {
      // patient as patientEntry because there have been checks that it will not be undefined
      const addedEntry = patientService.newEntryToPatient(req.body, patient as patientEntry);
      res.send(addedEntry);
    }
  }
  else {
    res.end('Incorrect type.');
  }
});

export default router;