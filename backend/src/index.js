// const debug = require('debug',)('weathermap',);

const Koa = require('koa',);
const router = require('koa-router',)();
const fetch = require('node-fetch',);
const cors = require('kcors',);

const appId = process.env.APPID || '';
const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';
// const targetCity = process.env.TARGET_CITY || 'Lodz,pl';

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors(),);

const fetchWeather = async (lon, lat,) => {
  const endpoint = `${mapURI}/weather?lon=${lon}&lat=${lat}&appid=${appId}&`;
  const response = await fetch(endpoint,);

  return response ? response.json() : {};
};

router.get('/api/weather', async (ctx,) => {
  const weatherData = await fetchWeather(ctx.request.query.lon, ctx.request.query.lat,);

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData.weather ? weatherData.weather[0] : {};
},);

const fetchForecast = async (lon, lat,) => {
  console.log(lon, lat,);

  const endpoint = `${mapURI}/forecast?lon=${lon}&lat=${lat}&cnt=5&appid=${appId}&`;
  const response = await fetch(endpoint,);

  return response ? response.json() : {};
};

router.get('/api/forecast', async (ctx,) => {
  const forecast = await fetchForecast(ctx.request.query.lon, ctx.request.query.lat,);

  console.log(forecast,);
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = forecast || {};
},);

app.use(router.routes(),);
app.use(router.allowedMethods(),);

app.listen(port,);

console.log(`App listening on port ${port}`,);

module.exports = {
  fetchWeather,
};
