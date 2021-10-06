
import { getMovies, getActors, getActorsFromMovie } from '../services/ApiConnect';


export const getRandom = (min, max) => {
    return Math.floor(min + Math.random() * (max - min));
}

export const initData = async (dispatch) => {
    dispatch({
      type: "SETLOADING",
      loading: true
    });
    let movies = await getMovies();
    movies.map(async (movie) => {
      const actorsfrommovie = await getActorsFromMovie(movie.id);
      movie.cast = actorsfrommovie;
    });
    const actors = await getActors();
    dispatch({
      type: "INITMOVIES",
      movies: movies
    });
    dispatch({
      type: "INITACTORS",
      actors: actors
    });
    dispatch({
      type: "SETLOADING",
      loading: false
    });
  };