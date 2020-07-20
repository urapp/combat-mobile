import axios from 'axios';
import {API_URL, TOKEN} from './../env.json';

const getEntityTypes = async () =>{
  const url = `${API_URL}/api/EntityTypes`;
  const token = TOKEN;
  const data = await axios.get(url, {
      headers: {"Authorization" : `Bearer ${token}`},
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