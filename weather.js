#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printHelp, succes, err, printWeather } from './services/log.service.js';
import { saveKeyValue, getKeyValue, TOKEN_DICTIONARY} from './services/storage.service.js';
import { getWeather } from './services/api.service.js';
const saveToken = async (token) =>
{
	try
	{
		if (!token.length)
		{
			err('не передан token');
			return
		}
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		succes('Token сохранен');
	}
	catch (e)
	{
		err(e.message);
	}
}
const saveCity = async (city) =>
{
	if (!city.length)
	{
		err('Не передан город');
		return;
	}
	try
	{
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
		succes('Город сохранён');
	} catch (e)
	{
		err(e.message);
	}
}
const getForCast = async () =>
{
	try
	{
		const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
		const weather = await getWeather(city);
		printWeather(weather);
	}
	catch (e)
	{
		if (e?.responce?.status == 401)
		{
			console.log('Неверный api Token');
		} else if (e?.responce?.status == 404)
		{
			console.log('Неверный город');
		} else
		{
			console.log(e.message);
		}
	}
}
const initCli = () =>
{
	const args = getArgs(process.argv);
	if (args.h)
	{
		return printHelp();
	}
	if (args.s)
	{
		return saveCity(args.s);
	}
	if (args.t)
	{
		return saveToken(args.t);
	}
	return getForCast();
};
initCli();