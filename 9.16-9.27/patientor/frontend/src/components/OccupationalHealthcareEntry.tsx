import React from 'react';
import { OccupationalHealthcare } from '../types';
import { useStateValue } from "../state";
import { Icon, Table } from 'semantic-ui-react';

const OccupationalHealthcareEntry: React.FC<{ entry: OccupationalHealthcare}> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>      
              <i>
                {entry.date} &nbsp;
                <Icon size='big' name='stethoscope' />
              </i>
            </Table.HeaderCell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <p><i>{entry.description}</i></p>

              {entry.diagnosisCodes && 
                  <ul style={{paddingLeft : 15}}>
                  {entry.diagnosisCodes.map((code: string) => (
                    <li key={code}>
                      {code}&nbsp;
                      {Object.values(diagnoses).map(e => {
                        if (e.code === code) {
                          return e.name;
                        }
                        return null;
                      })}
                    </li>
                  ))}
                </ul>
            }
            </Table.Cell>
          </Table.Row>
        </Table.Header>
      </Table>
    </div>
  );
};

export default OccupationalHealthcareEntry;