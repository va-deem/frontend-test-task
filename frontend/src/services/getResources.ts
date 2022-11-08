import axios from 'axios';

const getResources = async (ids: string[]) => {
  return await axios.post('http://localhost:5010/resources', { ids });
};

export default getResources;
