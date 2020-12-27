//types
type BMI = 
  'Very severely underweight' 
  | 'Severely underweight'
  | 'Underweight'
  | 'Normal (healthy weight)'
  | 'Overweight'
  | 'Obese Class I (Moderately obese)'
  | 'Obese Class II (Severely obese)'
  | 'Obese Class III (Very severely obese)';

//Bmi calculator func
const calculateBmi = (height: number, weight: number): BMI => {
  const index = weight / ((height/100)*(height/100));
  switch(true) {
    case (index < 15):
      return 'Very severely underweight';
    case (index < 16):
      return 'Severely underweight';
    case (index < 18.5):
      return 'Underweight'
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
      throw new Error('Incorrect parameters');
  }
}

//result -- height: cm    weight: kg
try {
  console.log(calculateBmi(180, 74));
} catch(e) {
  console.log('Error: ', e.message);
}