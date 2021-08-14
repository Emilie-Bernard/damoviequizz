import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@material-ui/core';

import GameOver from './GameOver'
import { getMovie, getActor, getActorFromMovie } from '../services/ApiConnect';

function Game() {
	const [seconds, setSeconds] = useState(60);
	const [score, setScore] = useState(0);
	const [show, setShow] = useState(false);
    const [actor, setActor] = useState([]);
    const [movie, setMovie] = useState([]);
    let rand = 0;


	useEffect(() => {
		let myInterval = setInterval(() => {
			if (seconds > 0 && show === false) {
				setSeconds(seconds - 1);
			}
			if (seconds === 0) {
				gameOver();
			}
		}, 1000);
		return () => {
			clearInterval(myInterval);
		};
	});

	const gameOver = async () => {
		setShow(true);
        setSeconds(60);
        const newMovie = await getMovie();
        setMovie(newMovie);
        rand = Math.floor(Math.random() * (50));
        if (rand%3 === 0) 
            setActor(await getActorFromMovie(newMovie.id));
        else
            setActor(await getActor());
	}

	return (
		<div>
			<h1> {seconds} </h1>
			<Typography style={{ paddingBottom: 16 }}>
				Est-ce que cet acteur : {actor.name} apparaît dans ce film : {movie.title}?
			</Typography>
			<div>
				<img
					alt="actor"
					width="250"
					height="350"
					src={'https://image.tmdb.org/t/p/w500' + actor.profile_path}
				/>
				<img alt="movie" width="250" height="350" src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} />
			</div>
			<h1> score : {score} </h1>
			<div style={{ padding: 30 }}>
				<Button variant="contained" color="primary" onClick={() => setScore(score + 1)}>
					Oui
				</Button>
				<Button variant="contained" onClick={() => gameOver()}>
					Non
				</Button>
			</div>
			<GameOver open={show} changeOpen={setShow} score={score} changeScore={setScore} />
		</div>
	);
}

export default Game;
