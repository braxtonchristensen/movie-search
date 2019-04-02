import dotenv from 'dotenv';
dotenv.config();

export const BASE_URL = 'https://api.themoviedb.org/3/';
export const API_KEY = `${process.env.TMDB_API_KEY}`;