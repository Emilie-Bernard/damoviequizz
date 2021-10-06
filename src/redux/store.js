const initialState = {
  movies: [],
  actors: [],
  actorsInMovie: [],
  loading: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "INITMOVIES":
      return {
        ...state,
        movies: action.movies
      };
    case "INITACTORS":
      return {
        ...state,
        actors: action.actors
      };
    case "INITINMOVIE":
      return {
        ...state,
        inMovie: action.inMovie
      };
    case "ADDMOVIE":
      return {
        ...state,
        movies: [...state.movies, action.movie]
      };
    case "ADDACTOR":
      return {
        ...state,
        actors: [...state.actors, action.actor]
      };
    case "ADDACTORINMOVIE":
      return {
        ...state,
        movies: [...state.movies.cast, action.cast]
      };
    case "SETLOADING":
      return {
        ...state,
        loading: action.loading
      };
    default:
      return state;
  }
}

export default reducer;