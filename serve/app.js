const Koa = require('koa')

const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')

const controller = require('./controller')



const app = new Koa()

app.use(bodyParser())

// add router middleware:
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...')