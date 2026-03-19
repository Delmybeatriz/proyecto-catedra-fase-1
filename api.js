const API_KEY = '5c3b593257784048834508be58f44439';
const API_URL = 'https://api.themoviedb.org/3';

export const getPopularTvShows = async () => {
  try {
    const response = await fetch(`${API_URL}/tv/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching popular TV shows:', error);
    return [];
  }
};
