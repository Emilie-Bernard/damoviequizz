import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@material-ui/core';
import { useSelector } from "react-redux";

import { getRandom } from '../utilities/utils'

import GameOver from './GameOver';

function Game() {
	const {movies, actors, inMovie} = useSelector(state => state);
	const [seconds, setSeconds] = useState(60);
	const [score, setScore] = useState(0);
	const [show, setShow] = useState(false);
	const [actor, setActor] = useState([]);
	const [movie, setMovie] = useState([]);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		let myInterval = setInterval(async () => {
			if (seconds === 60 && show === false) {
				findFilmMovie();
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

	const findFilmMovie = async () => {
		setIndex(getRandom(0,movies.length));
		setMovie(movies[index]);
		setActor(actors[index]);
	};

	const gameOver = async () => {
		setShow(true);
		setSeconds(60);
	};

	const check = async (button) => {
		const value = inMovie[index];
		if (value !== button) gameOver();
		else {
			setScore(score + 1);
			findFilmMovie();
		};
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
