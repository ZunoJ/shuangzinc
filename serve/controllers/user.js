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
        // 判断 user_id 是否重复
        let res = await User.findAll({
            where:{
                useraccount
            }
        });
        if (res.length != 0) {
            ctx.send('F','注册失败，登录账号重复了，换一个吧！',{
                data:false
            }) 
            return;
        }
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
        let res = await User.findAll({useraccount,userpwd});
        if(res.length == 0){
            ctx.send('F','登录失败，用户名或者密码错误!',{
                data:false
            }) 
            return;
        }
        let token = create_token(useraccount);
        let model = Object.assign({},res[0],{usertoken:token})
        User.update(res[0],model)
        ctx.send('S','登录成功!',{
            data:{
                useraccount: res[0].useraccount,
                username: res[0].username,
                userhead: res[0].userhead,
                usertoken: token,
                createtime: res[0].createtime
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