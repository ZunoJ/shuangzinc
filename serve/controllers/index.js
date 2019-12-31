const User = require('../db').User


const hello = async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
    var now = new Date()
    (async () => {
        var people = await User.create({
            username: 'Odie',
            pwd: '12345678',
            status: '0',
            nickname: 'cueboy',
            token: '123456789',
            create_time: now
        });
        console.log('created: ' + JSON.stringify(people));
    })()
}

module.exports = {
    'GET /hello/:name': hello
}