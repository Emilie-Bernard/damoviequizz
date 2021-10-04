import axios from 'axios';
import {baseUrl} from './constances';

export const API_KEY = process.env.REACT_APP_API_KEY||'7ea5f490261a949e52930517e1b4657c'; //verifie que la key est bonne pour le test a enlever

export const getMovie = () => {
	console.log(API_KEY);
	console.log(baseUrl);
	let min = 1;
	let max = 100;
	let rand = Math.floor(min + Math.random() * (max - min));
	return axios
		.get(baseUrl + 'movie/popular', {
			params: { api_key: API_KEY, page: rand },
		})
		.then((res) => {
			max = 20;
			rand = Math.floor(Math.random() * max);
			while (!res.data.results[rand].poster_path) rand = Math.floor(Math.random() * max);
			return res.data.results[rand];
		})
		.catch((error) => console.log(error));
};

export const getActor = () => {
	console.log(API_KEY);
	console.log(baseUrl);
	let min = 1;
	let max = 100;
	let rand = Math.floor(min + Math.random() * (max - min));
	return axios
		.get(baseUrl + 'person/popular', {
			params: { api_key: API_KEY, page: rand },
		})
		.then((res) => {
			max = 20;
			rand = Math.floor(Math.random() * max);
			while (res.data.results[rand].profile_path === null) rand = Math.floor(Math.random() * max);
			return res.data.results[rand];
		})
		.catch((error) => console.log(error));
};

export const getActorFromMovie = (movieId) => {
	console.log(API_KEY);
	console.log(baseUrl);
	let min = 1;
	let max = 100;
	let rand = Math.floor(min + Math.random() * (max - min));
	return axios
		.get(baseUrl + 'movie/' + movieId + '/credits', {
			params: { api_key: API_KEY },
		})
		.then((res) => {
			max = res.data.cast.length;
			rand = Math.floor(Math.random() * max);
			while (res.data.cast[rand].profile_path === null) rand = Math.floor(Math.random() * max);
			return res.data.cast[rand];
		})
		.catch((error) => console.log(error));
};

export const checkIfActorInMovie = (movieId, actorId) => {
	console.log(API_KEY);
	console.log(baseUrl);
	let actors = [];
	return axios
		.get(baseUrl + 'movie/' + movieId + '/credits', {
			params: { api_key: API_KEY },
		})
		.then((res) => {
			for (const id in res.data.cast) {
				actors.push(res.data.cast[id].id);
			}
			return actors.includes(actorId);
		})
		.catch((error) => console.log(error));
};
