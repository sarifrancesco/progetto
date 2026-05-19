import axios from 'axios';

const options = {
  baseURL: 'https://tennis-api-atp-wta-itf.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': process.env.VUE_APP_RAPIDAPI_KEY,
    'X-RapidAPI-Host': process.env.VUE_APP_RAPIDAPI_HOST,
  },
};

const api = axios.create(options);

export const getRankings = (tour = 'atp') => {
  return api.get('/tennis/v2/rankings', {
    params: { tour },
  });
};