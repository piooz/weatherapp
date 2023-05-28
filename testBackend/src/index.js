// const debug = require('debug',)('weathermap',);

const Koa = require('koa');
const router = require('koa-router')();
// const fetch = require('node-fetch',);
const cors = require('kcors');
const weather = require('./data/weather');
const forecast = require('./data/forecast');

const port = process.env.PORT || 9001;

const app = new Koa();

app.use(cors());

router.get('/api/weather', async (ctx) => {
  if (typeof ctx.query.lon === 'undefined' || typeof ctx.query.lat === 'undefined') {
    ctx.type = 'application/json; charset=utf-8';
    ctx.body = {};
    return;
  }

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weather;
  console.log(ctx);
});

router.get('/api/forecast', async (ctx) => {
  if (typeof ctx.query.lon === 'undefined' || typeof ctx.query.lat === 'undefined') {
    ctx.type = 'application/json; charset=utf-8';
    ctx.body = {};
    return;
  }

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = forecast;
  console.log(ctx);
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
