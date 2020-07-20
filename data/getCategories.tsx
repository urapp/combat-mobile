import axios from 'axios';
import {API_URL, TOKEN} from './../env.json';

const getCategories = async (propertyName :string, propertyId :any) =>{
  const url = `${API_URL}/api/Categories/${propertyName}/${propertyId}`;
  const token = TOKEN;
  const data = await axios.get(url, {
      headers: {"Authorization" : `Bearer ${token}`},
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