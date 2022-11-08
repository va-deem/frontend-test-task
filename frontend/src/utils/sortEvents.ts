import { IEvent } from '../types/types';
import dayjs from 'dayjs';

interface IApps {
  [key: string]: Array<IEvent | undefined>;
}

const sortEvents = (events: IEvent[]) => {
  const appointments = events
    .filter((event) => event.name === 'Appointment')
    .sort((a, b) => (dayjs(b.date).isAfter(dayjs(a.date)) ? 1 : -1));

  const apps: IApps = {};
  appointments.forEach((app) => (apps[app.id] = []));

  events
    .filter((event) => event.name !== 'Appointment')
    .forEach((event) => {
      const { appointmentId } = event;
      if (appointmentId && apps[appointmentId]) {
        apps[appointmentId].push(event);
      }
    });

  return appointments.reduce((acc: IEvent[], item: IEvent) => {
    acc.push(item);
    const depArr = apps[item.id] as IEvent[];

    const sortedDepArr = [...depArr]
      .sort((a, b) => a.name.localeCompare(b.name))
      .sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1));

    return depArr ? acc.concat(sortedDepArr) : acc;
  }, []);
};

export default sortEvents;
