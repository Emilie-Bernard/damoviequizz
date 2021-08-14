import axios from 'axios';
export const baseUrl = 'https://api.themoviedb.org/3/';
export const API_KEY = '7ea5f490261a949e52930517e1b4657c';

export const getMovie = () => {
	let min = 1;
	let max = 200;
	let rand = min + Math.random() * (max - min);
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
	let min = 1;
	let max = 200;
	let rand = min + Math.random() * (max - min);
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
	let min = 1;
	let max = 200;
	let rand = min + Math.random() * (max - min);
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
