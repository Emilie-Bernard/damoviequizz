const initialState = {
    movies: [],
    actors: []
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
      default:
        return state;
    }
  }
  
  export default reducer;