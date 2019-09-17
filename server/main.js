require('babel-polyfill');
const Koa = require('koa');
const app = new Koa()
// const koaBody = require('koa-body')
// app.use(koaBody({
//   multipart: true
// }))
const exec = require('./exec/controller');


app.use(exec.routes())

app.listen(3000);