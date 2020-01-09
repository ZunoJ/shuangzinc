
module.exports = () => {
    function render(status, msg, json) {
        this.set("Content-Type", "application/json")
        let resultJson = {flag:status,msg:msg || '',...json}
        this.body = JSON.stringify(resultJson)
    }
    return async (ctx, next) => {
        ctx.send = render.bind(ctx)
        await next()
    }
}