const index = async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>';
}

module.exports = {
    'GET /': index
}