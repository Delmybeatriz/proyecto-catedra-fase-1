import { getApiKey } from "./services/secureStore";

const API_URL = 'https://api.themoviedb.org/3';


// 1. Obtener Shows de TV Populares
export const getPopularTvShows = async () => {

  try {

    const API_KEY = await getApiKey();

    const response = await fetch(
      `${API_URL}/tv/popular?api_key=${API_KEY}&language=es-ES`
    );

    const data = await response.json();

    return data.results;

  } catch (error) {

    console.error('Error fetching popular TV shows:', error);

    return [];
  }
};


// 2. Trending Movies
export const getTrendingMovies = async () => {

  try {

    const API_KEY = await getApiKey();

    const response = await fetch(
      `${API_URL}/trending/movie/day?api_key=${API_KEY}&language=es-ES`
    );

    const data = await response.json();

    return data.results;

  } catch (error) {

    console.error('Error fetching trending movies:', error);

    return [];
  }
};


// 3. Top Rated Movies
export const getTopRatedMovies = async () => {

  try {

    const API_KEY = await getApiKey();

    const response = await fetch(
      `${API_URL}/movie/top_rated?api_key=${API_KEY}&language=es-ES`
    );

    const data = await response.json();

    return data.results;

  } catch (error) {

    console.error('Error fetching top rated movies:', error);

    return [];
  }
};


// 4. Buscar películas
export const searchMovies = async (query) => {

  if (!query) return [];

  try {

    const API_KEY = await getApiKey();

    const response = await fetch(
      `${API_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=es-ES`
    );

    const data = await response.json();

    return data.results;

  } catch (error) {

    console.error('Error searching movies:', error);

    return [];
  }
};


// 5. Obtener Cast / Créditos
export const getMovieCredits = async (id, isTv = false) => {

  try {

    const API_KEY = await getApiKey();

    const type = isTv ? 'tv' : 'movie';

    const response = await fetch(
      `${API_URL}/${type}/${id}/credits?api_key=${API_KEY}&language=es-ES`
    );

    const data = await response.json();

    return data.cast.slice(0, 6);

  } catch (error) {

    console.error('Error fetching credits:', error);

    return [];
  }
};


// 6. Obtener Trailers
export const getMovieTrailers = async (id, isTv = false) => {

  try {

    const API_KEY = await getApiKey();

    const type = isTv ? 'tv' : 'movie';

    const response = await fetch(
      `${API_URL}/${type}/${id}/videos?api_key=${API_KEY}&language=es-ES`
    );

    const data = await response.json();

    const trailer = data.results.find(
      v => v.type === 'Trailer' && v.site === 'YouTube'
    );

    return trailer ? trailer.key : null;

  } catch (error) {

    console.error('Error fetching trailers:', error);

    return null;
  }
};