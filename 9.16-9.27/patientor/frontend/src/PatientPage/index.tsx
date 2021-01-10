import React from "react";
import axios from "axios";
import { Button, Icon } from 'semantic-ui-react';

import { apiBaseUrl } from '../constants';
import { Patient, Entry } from "../types";
import { useStateValue, setPatient } from "../state";
import { useParams } from "react-router-dom";

import EntryDetails from '../components/EntryDetails';
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientPage: React.FC = () => {

  const [{ patient, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        if(patientFromApi) {
          dispatch(setPatient(patientFromApi));
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchPatient();
  }, [dispatch, id, diagnoses]);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      
      dispatch(setPatient(newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  return (
    <div className="App">
      {Object.values(patient).map((patient: Patient) => (
        <div key={patient.id}>
          <h1>{patient.name} 
          {patient.gender === 'male' && <Icon name='mars' />} 
          {patient.gender === 'female' && <Icon name='venus' />}
          {patient.gender === 'other' && <Icon name='genderless' />}</h1>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>

          {patient.entries.length !== 0 && <h2>Entries</h2>}


          {patient.entries.map((entry: Entry) => ( 
          <div key={entry.id}>
          <EntryDetails entry={entry}/>
          </div>
          ))}
        </div>
      ))}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <br/>
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientPage;
