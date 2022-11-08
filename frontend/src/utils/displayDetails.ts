import { IResource } from '../types/types';

const displayDetails = (resource: IResource | undefined) => {
  if (!resource) return '';

  const details = resource.details;
  let formattedValue;

  if (!resource?.values?.length) {
    formattedValue = '';
  } else {
    formattedValue = resource.values.map((value) =>
      typeof value === 'string' ? value : Object.values(value).join(', ')
    );
  }

  return formattedValue ? `${details}: ${formattedValue}` : details;
};

export default displayDetails;
