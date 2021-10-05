import React, { useState, useEffect } from 'react';
import { TextField, Button, FormLabel } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { getMovie, getActor, getActorFromMovie, checkIfActorInMovie } from '../services/ApiConnect';


function Initial({ stateChanger }) {
  const { movies } = useSelector(state => state);
  const dispatch = useDispatch();
  let inMovie = [];
  let count = 1;

  useEffect(() => {
    initDatas();
  }, []);

  const initDatas = async() => {
    for (let i = 0; i < 40; i++) {
      const newMovie = await getMovie();
      let newActor = await getActor();
      if (inMovie.length > 0)
        count = inMovie.filter(Boolean).length;
      if (inMovie.length / count > 2) {
        newActor = await getActorFromMovie(newMovie.id);
      }
      const newInMovie = await checkIfActorInMovie(newMovie.id, newActor.id);
      dispatch({
        type: "ADDMOVIE",
        movie: newMovie
      });
      dispatch({
        type: "ADDACTOR",
        actor: newActor
      });
      dispatch({
        type: "ADDINMOVIE",
        inMovie: newInMovie
      });
    };
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
          <Button variant="contained" onClick={() => stateChanger(1)}>Jouer</Button>
        </div>
      </FormLabel>
    </div>
  );
}

export default Initial;
