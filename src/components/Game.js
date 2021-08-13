import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@material-ui/core';

import GameOver from './GameOver'

function Game() {
	const [seconds, setSeconds] = useState(60);
	const [score, setScore] = useState(0);
	const [show, setShow] = useState(false);

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

	function gameOver() {
		setShow(true);
        setSeconds(60);
	}

	const handleOpen = () => {
		setShow(true);
	};

	return (
		<div>
			<h1> {seconds} </h1>
			<Typography style={{ paddingBottom: 16 }}>Est-ce que cet acteur apparaît dans ce film ?</Typography>
			<div>
				<img
					alt="actor"
					width="250"
					height="350"
					src="https://upload.wikimedia.org/wikipedia/commons/6/67/Keanu_Reeves-2019.jpg"
				/>
				<img
					alt="movie"
					width="250"
					height="350"
					src="https://cdn.shopify.com/s/files/1/0747/3829/products/mHP0101_1024x1024.jpeg?v=1571444280"
				/>
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
