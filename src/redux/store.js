const initialState = {
  movies: [],
  actors: [],
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