import React from 'react';
import { HealthCheck } from '../types';
import { useStateValue } from "../state";
import { Icon, Table } from 'semantic-ui-react';

const HealthCheckEntry: React.FC<{ entry: HealthCheck}> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <div>
      <Table celled>

        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>      
              <i>
                {entry.date} &nbsp;
                <Icon size='big' name='doctor' />
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

            <p>
              {entry.healthCheckRating === 0 && <Icon size='small' name='heart' color='green' />}
              {entry.healthCheckRating === 1 && <Icon size='small' name='heart' color='yellow' />}
              {entry.healthCheckRating === 2 && <Icon size='small' name='heart' color='red' />}
              {entry.healthCheckRating === 3 && <Icon size='small' name='heart' color='black' />}
            </p>
            </Table.Cell>
          </Table.Row>
        </Table.Header>
      </Table>
    </div>
  );
};

export default HealthCheckEntry;