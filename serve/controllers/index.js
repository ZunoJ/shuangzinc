const db = require('../db')


const queryArticles = async (ctx, next) => {
    let {useraccount = '', articletype = ''} = ctx.request.body
    try {
        if(useraccount == '' || articletype == ''){
            ctx.send('F','发布失败，请传入文章类型或用户账户。',{
                data:false
            }) 
            return;
        }
        let res = await db.Article.findAll({
            where:{
                useraccount,
                articletype
            },
            order:[
                "articleid"
            ]
        })
        if(res != null) {
            ctx.send('S','查询成功!',{
                data:res
            })
        }
    } catch(e){
        ctx.send('F',e,{
            data:false
        })
    }
}

const queryComments = async (ctx, next) => {
    let {articleid = ''} = ctx.request.body
    try {
        if(articleid == ''){
            ctx.send('F','查询评论失败！',{
                data:false
            }) 
            return;
        }
        let res = await db.Comment.findAll({
            where:{
                articleid
            },
            order:[
                "articleid"
            ]
        })
        if(res != null) {
            ctx.send('S','查询成功!',{
                data:res
            })
        }
    } catch(e){
        ctx.send('F',e,{
            data:false
        })
    }
}

const publishArticles = async (ctx, next) => {
    let {articletype = '', articletitle = '' , articleintro = "" , articlecontent = '' ,articletime = '',useraccount = ''} = ctx.request.body;
    try {
        if(useraccount == '' || articletype == '' || articletitle == '' || articleintro == '' || articlecontent == '' || articletime == ''){
            ctx.send('F','发布失败，请完整输入要素。',{
                data:false
            }) 
            return;
        }
        let res = await db.Article.create({
            useraccount,
            articletype,
            articletitle,
            articleintro,
            articlecontent,
            articletime
        })
        if(res != null) {
            ctx.send('S','发布成功!',{
                data:true
            })
        }
    } catch(e){
        ctx.send('F',e,{
            data:false
        })
    }
}

const deleteArticle = async (ctx, next) => {
    let {articleid = '', useraccount = ''} = ctx.request.body
    try {
        if(useraccount == '' || articleid == ''){
            ctx.send('F','发布失败，请传入文章ID或用户账户。',{
                data:false
            }) 
            return;
        }
        let res = await db.Article.destroy({
            where:{
                useraccount,
                articleid
            }})
        if(res != null) {
            ctx.send('S','删除成功!',{
                data:res
            })
        }
    } catch(e){
        ctx.send('F',e,{
            data:false
        })
    }
}

const deleteComments = async (ctx, next) => {
    let {commentid = '', useraccount = ''} = ctx.request.body
    try {
        if(useraccount == '' || commentid == ''){
            ctx.send('F','发布失败，请传入评价ID或用户账户。',{
                data:false
            }) 
            return;
        }
        let res = await db.Comment.destroy({
            where:{
                useraccount,
                commentid
            }
        })
        if(res != null) {
            ctx.send('S','删除成功!',{
                data:res
            })
        }
    } catch(e){
        ctx.send('F',e,{
            data:false
        })
    }
}

const publishComments = async (ctx, next) => {
    let {useraccount = '', articleid = '', commentcontent = ''} = ctx.request.body
    try {
        if(useraccount == '' || articleid == '' || commentcontent == ''){
            ctx.send('F','发布失败，请完整输入要素。',{
                data:false
            }) 
            return;
        }
        let res = await db.Comment.create({
            useraccount,
            articleid,
            commentcontent
        })
        if(res != null) {
            ctx.send('S','发布成功!',{
                data:true
            })
        }
    } catch(e){
        ctx.send('F',e,{
            data:false
        })
    }
}

const queryTags = async (ctx, next) => {
    let {name, sex} = ctx.request.body
    console.log(name)
    ctx.send({
        status: 'success',
        data: 'hello ikcmap'
    })
}

const addTags = async (ctx, next) => {
    let {name, sex} = ctx.request.body
    console.log(name)
    ctx.send({
        status: 'success',
        data: 'hello ikcmap'
    })
}

const deleteTags = async (ctx, next) => {
    let {name, sex} = ctx.request.body
    console.log(name)
    ctx.send({
        status: 'success',
        data: 'hello ikcmap'
    })
}

const queryBooks = async (ctx, next) => {
    try {
        let res = await db.Book.findAll({
            where:{
            },
            order:[
                "bookid"
            ]
        })
        if(res != null) {
            ctx.send('S','查询成功!',{
                data:res
            })
        }
    } catch(e){
        ctx.send('F',e,{
            data:false
        })
    }
}

const addBooks = async (ctx, next) => {
    let {useraccount = '', bookimg = '', bookurl = '', bookname = ''} = ctx.request.body
    try {
        if(useraccount == '' || bookimg == '' || bookurl == '' || bookname == ''){
            ctx.send('F','发布失败，请完整输入要素。',{
                data:false
            }) 
            return;
        }
        if(useraccount != '709692126'){
            ctx.send('F','您没有权限！',{
                data:false
            }) 
            return;
        }
        let res = await db.Book.create({
            bookimg,
            bookurl,
            bookname
        })
        if(res != null) {
            ctx.send('S','新增成功!',{
                data:true
            })
        }
    } catch(e){
        ctx.send('F',e,{
            data:false
        })
    }
}

const deleteBooks = async (ctx, next) => {
    let {name, sex} = ctx.request.body
    console.log(name)
    ctx.send({
        status: 'success',
        data: 'hello ikcmap'
    })
}

module.exports = {
    'POST /api/queryArticles': queryArticles, // 查询文章
    'POST /api/queryComments': queryComments, // 查询评论
    'POST /api/publishArticles': publishArticles, // 发布文章
    'POST /api/deleteArticle': deleteArticle, // 删除文章
    'POST /api/deleteComments': deleteComments, // 删除评论
    'POST /api/publishComments': publishComments, // 发布评论
    'POST /api/queryTags': queryTags, // 查询标签
    'POST /api/addTags': addTags, // 添加标签
    'POST /api/deleteTags': deleteTags, // 删除标签
    'POST /api/queryBooks': queryBooks, // 查询书籍
    'POST /api/addBooks': addBooks, // 添加书籍
    'POST /api/deleteBooks': deleteBooks // 删除书籍
}