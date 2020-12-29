interface bmiValues {
  height: number;
  weight: number;
}

const parseArgv = (args: Array<string>): bmiValues => {
  if (args.length !== 4) throw new Error('You should give exactly 2 arguments');
  //Correct input
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[2]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Incorrect arguments');
  }
};

type BMI = 
  'Very severely underweight' 
  | 'Severely underweight'
  | 'Underweight'
  | 'Normal (healthy weight)'
  | 'Overweight'
  | 'Obese Class I (Moderately obese)'
  | 'Obese Class II (Severely obese)'
  | 'Obese Class III (Very severely obese)';

export const calculateBmi = (height: number, weight: number): BMI => {
  const index = weight / ((height/100)*(height/100));
  switch(true) {
    case (index < 15):
      return 'Very severely underweight';
    case (index < 16):
      return 'Severely underweight';
    case (index < 18.5):
      return 'Underweight';
    case (index < 25):
      return 'Normal (healthy weight)';
    case (index < 30):
      return 'Overweight';
    case (index < 35):
      return 'Obese Class I (Moderately obese)';
    case (index < 40):
      return 'Obese Class II (Severely obese)';
    case (index > 40):
      return 'Obese Class III (Very severely obese)';
    default:
      throw new Error('Incorrect argument values');
  }
};

//9.1
if(process.argv.length > 2) {
  try {
    const { height, weight } = parseArgv(process.argv);
    console.log(calculateBmi(height, weight));
  } catch(e) {
    throw new Error(e);
  }
}