module.exports = () => {
  return async (ctx, next) => {
    try {
       await next()
       if (ctx.response.status === 404 && !ctx.response.body) ctx.throw(404);
    } catch (e) {
      let status = parseInt(e.status)
      const message = e.message
      if(status >= 400){
        switch(status){
          case 400:
            ctx.log.error('400:' + message)
            console.error('400error')
            break;
          case 404:
            ctx.log.error('404:' + message)
            console.error('404error')
            break;
          case 500:
            ctx.log.error('500:' + message)
            console.error('500error')
            break;
          default:
            ctx.log.error('不知道啥错')
            console.error('不知道啥错')
        }
      }else{// 其它情况，统一返回为 500
        ctx.log.error('统一500')
        console.error('统一500')
      }
    }
  }
}