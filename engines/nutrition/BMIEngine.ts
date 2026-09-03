export interface BMIInputs {
  weightKg: number;
  heightCm: number;
}

export interface BMIOutputs {
  bmi: number;
  category: string;
}

export function calculateBMI(inputs: BMIInputs): BMIOutputs {
  const { weightKg, heightCm } = inputs;
  
  if (!weightKg || !heightCm) return { bmi: 0, category: '-' };

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  
  let category = '';
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25) category = 'Normal weight';
  else if (bmi < 30) category = 'Overweight';
  else category = 'Obese';
  
  return { bmi, category };
}
