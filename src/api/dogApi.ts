import axios from 'axios';

const API_BASE_URL = 'https://dogs.kobernyk.com/api/v1';

export const fetchDogById = async (id, token) => {
  const response = await axios.get(`${API_BASE_URL}/dogs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
