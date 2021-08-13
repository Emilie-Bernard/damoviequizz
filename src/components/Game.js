import React, { useState, useEffect } from 'react';
import { Typography, Button, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function Game() {
	const [seconds, setSeconds] = useState(60);
	const [score, setScore] = useState(0);
	const [show, setShow] = useState(false);
	const classes = useStyles();

	useEffect(() => {
		let myInterval = setInterval(() => {
			if (seconds > 0) {
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
		setSeconds('End');
		setShow(true);
	}

	const handleClose = () => {
		setShow(false);
	};

	const handleOpen = () => {
		setShow(true);
	};

	const body = (
		<div className={classes.paper}>
			<h2 id="simple-modal-title">Text in a modal</h2>
			<p id="simple-modal-description">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
		</div>
	);
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
				<Button variant="contained" onClick={() => handleOpen()}>
					Non
				</Button>
			</div>
			<Modal
				style={{
					margin: 'auto',
					alignItems: 'center',
					justifyContent: 'center',
					display: 'flex',
				}}
				open={show}
				onClose={handleClose}
			>
				{body}
			</Modal>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

export default Game;
