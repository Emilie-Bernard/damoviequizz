import React, { useEffect, useState } from 'react';
import { Typography, Button, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function GameOver({ open, changeOpen, score, changeScore }) {
	const classes = useStyles();
    const [bestValue, setBestValue] = useState(localStorage.getItem('bestValue') || '');


  useEffect(() => {
      if (bestValue < score) {
		localStorage.setItem('bestValue', bestValue);
        setBestValue(score)
      }
  }, [score, bestValue]);

	const handleClose = () => {
		changeOpen(false);
		changeScore(0);
	};

	const body = (
		<div className={classes.paper}>
			<h2 id="simple-modal-title">Game Over</h2>
			<p id="simple-modal-description">Votre score : {score}</p>
			<p id="simple-modal-description">Meilleur Score : {bestValue}</p>
			<Button variant="contained" onClick={() => handleClose()}>
				Rejouer
			</Button>
		</div>
	);
	return (
		<Modal
			style={{
				margin: 'auto',
				alignItems: 'center',
				justifyContent: 'center',
				display: 'flex',
			}}
			open={open}
		>
			{body}
		</Modal>
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

export default GameOver;
