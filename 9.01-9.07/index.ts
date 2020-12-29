import express = require('express');
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

//http://localhost:3001/bmi?height=180&weight=72
app.get('/bmi', (req, res) => {
  if(isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) {
    res.status(404).end('malformatted parameters');
  } else {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi: string = calculateBmi(height, weight);

    res.send({
      height,
      weight,
      bmi
    });
  }
});

const validation = (values: Array<string>, target: string): boolean => {
  const validateArray = values.map(e => isNaN(Number(e)));
  const validateTarget = isNaN(Number(target));

  if (validateArray.includes(true) || validateTarget) return true;
  else return false;
};

const exercisesToNumber = (exercises: Array<string>): Array<number> => {
  return exercises.map(e => Number(e));
};

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if(!req.body || !daily_exercises || !target) {
    res.status(400).json({error: 'parameters missing'});
  } else if (validation(daily_exercises, target)) {
    res.status(400).json({error: 'malformatted parameters'});
  } else {
    const result = calculateExercises(exercisesToNumber(daily_exercises), Number(target));
    res.json({
      result: result
    });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});