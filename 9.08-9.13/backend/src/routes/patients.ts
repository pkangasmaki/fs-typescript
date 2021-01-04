/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonConfidentalEntries());
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

export default router;