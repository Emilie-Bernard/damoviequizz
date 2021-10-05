const initialState = {
  movies: [],
  actors: [],
  inMovie: []
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
    case "ADDINMOVIE":
      return {
        ...state,
        inMovie: [...state.inMovie, action.inMovie]
      };
    default:
      return state;
  }
}

export default reducer;