import chalk from 'chalk';
import dedent from 'dedent-js';
export const err = (error) =>
{
	console.log(chalk.bgRed(`ERROR: ${error}`))
}
export const succes = (msg) =>
{
	console.log(chalk.bgBlue(`SUCCES: ${msg}`))
}
export const printHelp = () =>
{
	console.log(dedent`${chalk.bgCyan('HELP')}
	-s[CITY(RUSSIA)] :  choise city,
	-h: print help,
	-t[API_TOKEN] save api token`);
}
export const printWeather = (res) =>
{
	console.log(
		dedent`${chalk.bgCyan('WEATHER')}
		Страна ${res.sys.country}
		Город - ${res.name},
		Сегодня на улице: ${chalk.blueBright(res.weather[0].description)}
		Температура сейчас: ${chalk.redBright(res.main.temp)}(Ощущение: ${chalk.greenBright(res.main.feels_like)})
		Скорость ветра: ${chalk.bgGrey(res.wind.speed)}${chalk.bgGrey('м/с')}.
	`)
}