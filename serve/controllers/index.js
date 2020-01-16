const db = require('../db')


const queryArticles = async (ctx, next) => {
    let {name, sex} = ctx.request.body
    console.log(name)
    ctx.send({
        status: 'success',
        data: 'hello ikcmap'
    })
}

const queryComments = async (ctx, next) => {
    let {name, sex} = ctx.request.body
    console.log(name)
    ctx.send({
        status: 'success',
        data: 'hello ikcmap'
    })
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
    let {name, sex} = ctx.request.body
    console.log(name)
    ctx.send({
        status: 'success',
        data: 'hello ikcmap'
    })
}

const deleteComments = async (ctx, next) => {
    let {name, sex} = ctx.request.body
    console.log(name)
    ctx.send({
        status: 'success',
        data: 'hello ikcmap'
    })
}

const publishComments = async (ctx, next) => {
    let {name, sex} = ctx.request.body
    console.log(name)
    ctx.send({
        status: 'success',
        data: 'hello ikcmap'
    })
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
    let {name, sex} = ctx.request.body
    console.log(name)
    ctx.send({
        status: 'success',
        data: 'hello ikcmap'
    })
}

const addBooks = async (ctx, next) => {
    let {name, sex} = ctx.request.body
    console.log(name)
    ctx.send({
        status: 'success',
        data: 'hello ikcmap'
    })
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