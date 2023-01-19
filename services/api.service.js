import axios from 'axios';
import { TOKEN_DICTIONARY, getKeyValue } from './storage.service.js';

export const getWeather = async (city) =>{
	// const url = `api.openweathermap.org/data/2.5/weather?q=${city}$appid=${key}` ;
	const token = await  getKeyValue(TOKEN_DICTIONARY.token)
	if(!token){
		throw new Error('Не задан токен!([API_TOKEN] = -t "token")');
	}
	// url.searchParams.append('q', city);
	// url.searchParams.append('appid', city);
	// url.searchParams.append('lang', 'ru');
	// url.searchParams.append('units', 'metric');
	const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
		params:{
			q: city,
			appid: token,
			lang: 'ru',
			units: 'metric'
		}
})
	return data;
	// const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
	// 	params: {
	// 		q: city,
	// 		appid: token,
	// 		lang: 'ru',
	// 		units: 'metric'
	// 	}
	// });
	// https.get(url, (responce)=>{
	// 	let res = '';
	// 	responce.on('data', (chunk)=>{
	// 		res+=chunk;
	// 	});
	// 	responce.on('end', ()=>{
	// 		console.log(res);
	// 	})
	// });
}