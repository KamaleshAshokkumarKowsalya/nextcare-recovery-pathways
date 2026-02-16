export const calculateRiskScore = (userData) => {
  let score = 0;

  // Medical conditions (0-30 points)
  const conditions = userData.medicalInfo?.conditions || [];
  score += Math.min(conditions.length * 5, 30);

  // Lifestyle factors (0-40 points)
  const lifestyle = userData.lifestyle || {};
  
  if (lifestyle.smokingStatus === 'current') score += 15;
  else if (lifestyle.smokingStatus === 'former') score += 5;

  if (lifestyle.alcoholConsumption === 'heavy') score += 10;
  else if (lifestyle.alcoholConsumption === 'moderate') score += 5;

  if (lifestyle.exerciseFrequency === 'none') score += 10;
  else if (lifestyle.exerciseFrequency === '1-2_per_week') score += 5;

  const sleepHours = parseInt(lifestyle.sleepHours) || 7;
  if (sleepHours < 6 || sleepHours > 9) score += 5;

  // Hospitalization history (0-30 points)
  const hospitalizations = userData.medicalInfo?.hospitalizations || [];
  score += Math.min(hospitalizations.length * 10, 30);

  return Math.min(score, 100);
};
