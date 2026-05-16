const API_KEY = '5c3b593257784048834508be58f44439';
const API_URL = 'https://api.themoviedb.org/3';

// 1. Obtener Shows de TV Populares (Hecho en fase 1)
export const getPopularTvShows = async () => {
  try {
    const response = await fetch(`${API_URL}/tv/popular?api_key=${API_KEY}&language=es-ES`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching popular TV shows:', error);
    return [];
  }
};

// 2. NUEVO (Trending): Obtener Películas en Tendencia del día
export const getTrendingMovies = async () => {
  try {
    const response = await fetch(`${API_URL}/trending/movie/day?api_key=${API_KEY}&language=es-ES`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

// 3. NUEVO (Top Rated): Obtener Películas Mejor Calificadas
export const getTopRatedMovies = async () => {
  try {
    const response = await fetch(`${API_URL}/movie/top_rated?api_key=${API_KEY}&language=es-ES`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    return [];
  }
};

// 4. NUEVO (Búsqueda y Filtros): Buscar películas dinámicamente en tiempo real
export const searchMovies = async (query) => {
  if (!query) return [];
  try {
    const response = await fetch(`${API_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=es-ES`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

// 5. NUEVO (Cast/Actores): Obtener el reparto principal de la película
export const getMovieCredits = async (id, isTv = false) => {
  try {
    const type = isTv ? 'tv' : 'movie';
    const response = await fetch(`${API_URL}/${type}/${id}/credits?api_key=${API_KEY}&language=es-ES`);
    const data = await response.json();
    return data.cast.slice(0, 6); // Retornamos los 6 actores principales
  } catch (error) {
    console.error('Error fetching credits:', error);
    return [];
  }
};

// 6. NUEVO (Trailers): Obtener los videos/trailers de la película de YouTube
export const getMovieTrailers = async (id, isTv = false) => {
  try {
    const type = isTv ? 'tv' : 'movie';
    const response = await fetch(`${API_URL}/${type}/${id}/videos?api_key=${API_KEY}&language=es-ES`);
    const data = await response.json();
    // Buscamos un video que sea tipo 'Trailer' y de 'YouTube'
    const trailer = data.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
    return trailer ? trailer.key : null; // Retorna el ID del video de YouTube
  } catch (error) {
    console.error('Error fetching trailers:', error);
    return null;
  }
};