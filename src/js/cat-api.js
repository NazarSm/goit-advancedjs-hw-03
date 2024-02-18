import axios from 'axios';

const API_KEY = 'live_T9LOtLYHAv6KhL2fGHosUVgFryfx9rB2J6x7kAgl8lqRbPsVFYQkCYagWcXOVTH2';
const API_URL = "https://api.thecatapi.com/v1";

const BREEDS_URI = '/breeds';
const IMAGE_URI = '/images/search';

const catApi = axios.create({
  baseURL: API_URL,
  headers: {'x-api-key': API_KEY}
});

export const fetchBreeds = () => {
  return catApi.get(BREEDS_URI);
}

export const fetchCatByBreedId = (id) => {
  const searchParams = new URLSearchParams({
    breed_ids: id,
  });

  return catApi.get(`${IMAGE_URI}?${searchParams}`);
}