import axios from 'axios';
import {API_URL} from '../env.json';

const getCategories = async (propertyName :string, propertyId :any) =>{
  const url = `${API_URL}/api/Categories/${propertyName}/${propertyId}`;
  const data = await axios.get(url, {
      withCredentials: true,
    })
    .then((response) => {
      return response?.data;
    })
    .catch((error) => {
      console.log('getCategories: ', error);
      return false;
    })
    .finally(() => {
      // always executed
    });

  return data;
}

export default getCategories