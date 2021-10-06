import React, { useState, useEffect } from 'react';
import { CircularProgress, Button, FormLabel } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { getMovies, getActors, getActorsFromMovie, checkIfActorInMovie } from '../services/ApiConnect';


function Initial({ stateChanger }) {
  const { loading } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
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

  return (
    <div>
      <h2>How To Play :</h2>
      <p>Vous allez voir une fenêtre avec les éléments ci-dessous. Le chiffre correspond aux secondes restantes, une partie dure 60 secondes. </p>
      <p>Vous aurez aussi une phrase avec le nom de l'acteur et le titre du film. </p>
      <p>Puis deux images, la première est celle de l'acteur tandis que la deuxième celle du film. </p>
      <p>Ensuite vous aurez votre score. Et finalement vous pourrez cliquer sur les boutons oui ou non. </p>
      <img alt="movie" width="550" height="350" src={process.env.PUBLIC_URL + '/howtoplay.png'} />
      <FormLabel>
        <div style={{ padding: 30 }}>
          {loading
            ? <CircularProgress />
            : <Button variant="contained" onClick={() => stateChanger(1)}>Jouer</Button>
          }
        </div>
      </FormLabel>
    </div>
  );
}

export default Initial;
