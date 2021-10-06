import axios from 'axios';
import { baseUrl } from './constances';

import { getRandom } from '../utilities/utils'

export const API_KEY = process.env.REACT_APP_API_KEY;

export const getMovie = () => {
	let rand = getRandom(1,50);
	return axios
		.get(baseUrl + 'movie/popular', {
			params: { api_key: API_KEY, page: rand },
		})
		.then((res) => {
			let rand = getRandom(0,20);
			while (!res.data.results[rand].poster_path) rand = getRandom(0,20);
			return res.data.results[rand];
		})
		.catch((error) => console.log(error));
};

export const getMovies = () => {
	let rand = getRandom(1,50);
	return axios
		.get(baseUrl + 'movie/popular', {
			params: { api_key: API_KEY, page: rand },
		})
		.then((res) => {
			return res.data.results.filter(movie => movie.poster_path && movie.title);;
		})
		.catch((error) => console.log(error));
};

export const getActor = () => {
	let rand = getRandom(1,50);
	return axios
		.get(baseUrl + 'person/popular', {
			params: { api_key: API_KEY, page: rand },
		})
		.then((res) => {
			rand = getRandom(0,20);
			while (res.data.results[rand].profile_path === null) rand = getRandom(0,20);
			return res.data.results[rand];
		})
		.catch((error) => console.log(error));
};

export const getActors = () => {
	let rand = getRandom(1,50);
	return axios
		.get(baseUrl + 'person/popular', {
			params: { api_key: API_KEY, page: rand },
		})
		.then((res) => {
			return res.data.results.filter(actor => actor.profile_path && actor.name);
		})
		.catch((error) => console.log(error));
};

export const getActorsFromMovie = (movieId) => {
	return axios
		.get(baseUrl + 'movie/' + movieId + '/credits', {
			params: { api_key: API_KEY },
		})
		.then((res) => {
			return res.data.cast.filter(actor => actor.profile_path && actor.name);
		})
		.catch((error) => console.log(error));
};

export const checkIfActorInMovie = (movieId, actorId) => {
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
