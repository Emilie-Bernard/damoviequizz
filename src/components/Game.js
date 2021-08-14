import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@material-ui/core';

import GameOver from './GameOver';
import { getMovie, getActor, getActorFromMovie, checkIfActorInMovie } from '../services/ApiConnect';

function Game() {
	const [seconds, setSeconds] = useState(60);
	const [score, setScore] = useState(0);
	const [show, setShow] = useState(false);
	const [actor, setActor] = useState([]);
	const [movie, setMovie] = useState([]);

	useEffect(() => {
		let myInterval = setInterval(async () => {
			if (seconds === 60 && show === false) {
				const newMovie = await getMovie();
				setMovie(newMovie);
				let rand = Math.floor(Math.random() * 50);
				if (rand % 3 === 0) setActor(await getActorFromMovie(newMovie.id));
				else setActor(await getActor());
			}

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
	};

	const check = async (button) => {
		const value = await checkIfActorInMovie(movie.id, actor.id);
		console.log(value);
		if (value !== button) gameOver();
		else setScore(score + 1);
		setSeconds(60);
	};

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
				<Button variant="contained" color="primary" onClick={() => check(true)}>
					Oui
				</Button>
				<Button variant="contained" onClick={() => check(false)}>
					Non
				</Button>
			</div>
			<GameOver open={show} changeOpen={setShow} score={score} changeScore={setScore} />
		</div>
	);
}

export default Game;
