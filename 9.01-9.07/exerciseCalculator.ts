//interface
interface result { periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface exerciseValues {
  goal: number
  done: Array<number>
}


//Parse arguments
const parseExerciseArguments = (args: Array<string>): exerciseValues => {
  //Correct input
  if (!isNaN(Number(args[2]))) {
    const goal = Number(args[2]);

    //remove first 4 args
    args.splice(0,3);
    const done: Array<number> = args.map(e => Number(e));
    return {
      goal,
      done
    };
  } else {
    throw new Error('Incorrect arguments');
  }
};

//func calculateExercises
export const calculateExercises = (exercises: Array<number>, goal: number): result => {
  //How many days were tracked
  const periodLength = exercises.length;
  //How many days contained exercising
  const trainingDays = exercises.filter(e => e !== 0).length;

  const target = goal;
  //average hours worked out daily
  const average = exercises.reduce((a, b) => a + b, 0) / exercises.length;

  //Did the average hit the goal
  const success = average > target ? true : false;

  //a rating between the numbers 1-3 that tells how well the hours are met
  let rating = 0;
  if(target > average) rating = 1;
  if(target === average) rating = 2;
  if(target < average) rating = 3;

  let ratingDescription = '';
  if(rating === 1) ratingDescription = 'you could do better!';
  if(rating === 2) ratingDescription = 'not too bad but could be better.';
  if(rating === 3) ratingDescription = 'well done!';

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

//9.2
if(process.argv.length > 2) {
  try {
    const { goal, done } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(done, goal));
  } catch(e) {
    throw new Error(e);
  }
}