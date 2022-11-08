import axios from 'axios';
import sortEvents from '../utils/sortEvents';

const getEvents = async () => {
  const { data } = await axios.post('http://localhost:5010/events');
  return sortEvents(data?.items);
};

export default getEvents;
