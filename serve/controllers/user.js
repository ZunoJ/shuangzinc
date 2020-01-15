const db = require('../db')
const sha1 = require('sha1');
const { PWD_ENCODE_STR } = require('../utils/config');
const {create_token, check_token_code} = require('../utils/token');
const xss = require('xss')

const registeredMember = async (ctx, next) => {
    try {
        let {useraccount='', userpwd='', reuserpwd='', username='', usertags='', userhead='', checktoken='', checkcode=''} = ctx.request.body
        if(username == '' || useraccount == '' || userpwd == ''){
            ctx.send('F','请完整填写表单',{
                data:false
            }) 
            return;
        }
        if(userhead == ''){
            ctx.send('F','注册失败，请上传头像!',{
                data:false
            }) 
            return;
        }
        if(userpwd.length < 5){
            ctx.send('F','注册失败，密码最少为5位！',{
                data:false
            }) 
            return;
        }
        if(userpwd != reuserpwd){
            ctx.send('F','注册失败，2次密码输入不一致!',{
                data:false
            }) 
            return;
        }

        // 验证码判断
        let mark = await check_token_code({checktoken,checkcode});
        if(!mark){
            ctx.send('F','登录失败，验证码错误!',{
                data:false
            }) 
            return;
        }
        console.log(useraccount)
        // 判断 user_id 是否重复
        let res = await db.User.findOne({
            where:{
                useraccount
            }
        });
        console.log(res)
        if (res != null) {
            ctx.send('F','注册失败，登录账号重复了，换一个吧！',{
                data:false
            }) 
            return;
        }
        console.log(55)
        userpwd = sha1(sha1(userpwd + PWD_ENCODE_STR));
        // 防止xss攻击， 转义
        username = xss(username);
        let usertoken = create_token(useraccount);
        res = await db.User.create({
            useraccount:useraccount,
            userpwd:userpwd,
            username:username,
            usertags:usertags,
            userhead:userhead,
            usertoken:usertoken
        })
        if(res.useraccount != null){
            ctx.send('S','注册成功!',{
                data:{
                    useraccount: res.useraccount,
                    username: res.username,
                    userhead: res.userhead,
                    usertoken: res.usertoken,
                    createtime: res.createtime
                }
            })
        }else{
            ctx.send('F','注册失败，服务器异常!',{
                data:false
            }) 
        }
    } catch (error) {
        console.log(83)
        ctx.send('F',error,{
            data:false
        }) 
    }
}

const loginSystem = async (ctx, next) => {
    let {useraccount = '', userpwd = '' , checkcode = "" , checktoken = ''} = ctx.request.body;
    try {
        if(useraccount == '' || userpwd == ''){
            ctx.send('F','登录失败，请输入登录账号或密码!',{
                data:false
            }) 
            return;
        }
        // 验证码判断
        let mark = await check_token_code({checktoken,checkcode});
        if(!mark){
            ctx.send('F','登录失败，验证码错误!',{
                data:false
            }) 
            return;
        }
        userpwd = sha1(sha1(userpwd + PWD_ENCODE_STR));
        let res = await db.User.findOne({
            where:{
                useraccount,userpwd
            }
        });
        if(res === null){
            ctx.send('F','登录失败，用户名或者密码错误!',{
                data:false
            }) 
            return;
        }
        let token = create_token(useraccount);
        
        await db.User.update({usertoken: token}, {where: {useraccount}})
        ctx.send('S','登录成功!',{
            data:{
                useraccount: res.useraccount,
                username: res.username,
                userhead: res.userhead,
                usertoken: token,
                createtime: res.createtime
            }
        })
    } catch(e){
        ctx.send('F',e,{
            data:false
        })
    }
}

module.exports = {
    'POST /api/registeredMember': registeredMember, // 注册接口 
    'POST /api/loginSystem': loginSystem // 登录接口
    
}