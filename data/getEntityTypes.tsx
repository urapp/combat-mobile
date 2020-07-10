import axios from 'axios';
import {API_URL} from './../env.json';

const getEntityTypes = async () =>{
  const url = `${API_URL}/api/EntityTypes`;
  const data = await axios.get(url, {
      withCredentials: true,
    })
    .then((response) => {
      return response?.data;
    })
    .catch((error) => {
      console.log('getEntityTypes: ', error);
      return false;
    })
    .finally(() => {
      // always executed
    });

  return data;
}

export default getEntityTypes