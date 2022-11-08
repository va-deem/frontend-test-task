interface IColors {
  [key: string]: string;
}

const setColor = (name: string | undefined) => {
  if (!name) return '';

  const colors: IColors = {
    Appointment: '#bdc8ff',
    Observation: '#a4ebfd',
    Condition: '#bfcca0',
    Allergy: '#e3b2c7',
    Medication: '#b3d3c6',
    Diagnosis: '#ffe6e1',
    CarePlan: '#e3cadf',
    AllergyIntolerance: '#dccaca',
    MedicationStatement: '#dfffc8',
  };

  return colors[name] || '#999999';
};

export default setColor;
