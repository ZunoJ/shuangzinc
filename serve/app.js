const Koa = require('koa')

const ip = require('ip')
const bodyParser = require('koa-bodyparser')

const controller = require('./controller')
const miLog = require('./log')
const send = require('./send')
const onerror = require('koa-onerror')

// 引入请求错误中间件
const miHttpError = require('./http_error')
const app = new Koa()
onerror(app)
// app.use(miHttpError())
app.use(miLog({
    env: app.env,  // koa 提供的环境变量
    projectName: 'koa2-tutorial',
    appLogLevel: 'debug',
    dir: 'logs',
    serverIp: ip.address()
}))
app.use(bodyParser())
app.use(send())
// 增加错误的监听处理
app.on("error", (err, ctx) => {
    if (ctx && !ctx.headerSent && ctx.status < 500) {
        ctx.status = 500
    }
    if (ctx && ctx.log && ctx.log.error) {
        if (!ctx.state.logged) {
            ctx.log.error(err.stack)
        }
    }
})

// add router middleware:
app.use(controller())





app.listen(3000);
console.log('app started at port 3000...')