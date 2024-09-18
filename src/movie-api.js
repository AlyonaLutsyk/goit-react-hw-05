import axios from "axios";


axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmY2IwOGMzYTllZWQ0MzFhNzNiMTJmMjEzYzU4ZTc0MyIsIm5iZiI6MTcyNjU2ODIzNS45Mjk5ODksInN1YiI6IjY2ZTk0ZmNmMWJlY2E4Y2UwN2QyYzQ0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6QI2xgWYaa24jZLZRgMCpz1oXFG5uXQ4WlnHNlkugP0';

export const getTrendingMovies = async () => {
    try {
        const response = await axios.get('/trending/movie/day', {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        throw error;
    }
};

export const searchMovies = async (query) => {
  const response = await axios.get(`/search/movie`, {
    params: { query },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data.results;
};


export const getMovieDetails = async (movieId) => {
    try {
        const response = await axios.get(`/movie/${movieId}`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};

export const getMovieCast = async (movieId) => {
    try {
        const response = await axios.get(`/movie/${movieId}/credits`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
        });
        return response.data.cast;
    } catch (error) {
        console.error('Error fetching movie cast:', error);
        throw error;
    }
};

export const getMovieReviews = async (movieId) => {
    try {
        const response = await axios.get(`/movie/${movieId}/reviews`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching movie reviews:', error);
        throw error;
    }
};