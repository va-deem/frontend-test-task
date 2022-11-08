export interface IEvent {
  id: string;
  appointmentId?: string;
  name: string;
  resource: string;
  date: string;
}

type ValueType = string | { [key: string]: string | number };

export interface IResource {
  id: string;
  details: string;
  code: string;
  values: ValueType[];
}
