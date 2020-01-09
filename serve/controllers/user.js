const db = require('../db')

const registeredMember = async (ctx, next) => {
    try {
        let {useraccount, userpwd, username, usertags, userhead} = ctx.request.body
        await db.User.create({
            useraccount:useraccount,
            userpwd:userpwd,
            username:username,
            usertags:usertags,
            userhead:userhead
        })
        ctx.send('S','操作成功',{
            data:true
        }) 
    } catch (error) {
        ctx.send('F',error,{
            data:false
        }) 
    }
}

const loginSystem = async (ctx, next) => {
    let {name, sex} = ctx.request.body
    console.log(name)
    ctx.send({
        status: 'success',
        data: 'hello ikcmap'
    })
}

module.exports = {
    'POST /api/registeredMember': registeredMember, // 注册接口 
    'POST /api/loginSystem': loginSystem // 登录接口
}