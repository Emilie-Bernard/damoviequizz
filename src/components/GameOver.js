import React, { useState } from 'react';
import { Typography, Button, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function GameOver() {
	const [show, setShow] = useState(false);
	const classes = useStyles();

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
