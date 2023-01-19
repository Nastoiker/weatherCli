import { homedir } from 'os';
// import { join, basename, dirname, extname, relative, isAbsolute } from 'path';
import { join } from 'path';
import { promises } from 'fs';//fs - filesystem
export const TOKEN_DICTIONARY = {
	token: 'token',
	city: 'city',
}
const filePath = join(homedir(), 'weather-data.json');
export const saveKeyValue = async (key, value) =>
{
	let data = {};
	if (await FileIsExist(filePath))
	{
		const file = await promises.readFile(filePath);
		data = JSON.parse(file);
	}
	data[key] = value;
	await promises.writeFile(filePath, JSON.stringify(data));
}
export const getKeyValue = async (key) =>
{
	if (await FileIsExist(filePath))
	{
		const file = await promises.readFile(filePath);
		const data = JSON.parse(file);
		return data[key];
	}
	return undefined;
}

export const FileIsExist = async (path) =>
	{
		try
		{
			await promises.stat(path);
			return true;
		}
		catch (e)
		{
			return false;
		}
	}