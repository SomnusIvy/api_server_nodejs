const express = require('express')
const app = express()

const joi = require('joi')

// CORS
const cors = require('cors')
app.use(cors())

// 解析表单中间件
app.use(express.urlencoded({extended:false}))

// 路由之前封装res.cc函数
app.use((req,res,next)=>{
    res.cc = function(err,status =1){
        res.send({
            status,
            message:err instanceof Error ? err.message : err
        })
    }
    next()
})

// 路由之前配置解析token中间件
const expressJwt = require('express-jwt')
const config = require('./config')
app.use(expressJwt({secret:config.jwtScretKey}).unless({path:[/^\/api/]}))

// 导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api',userRouter)

// 用户信息路由
const userinfoRouter = require('./router/userinfo')
app.use('/my',userinfoRouter)

// 导入并使用文章分类路由
const artCateRouter=require('./router/artcate')
app.use('/my/article',artCateRouter)

// 文章
const articleRouter = require('./router/aricle')
app.use('/my/article',articleRouter)

// 定义错误级别中间件
app.use((err,req,res,next)=>{
    if(err instanceof joi.ValidationError) return res.cc(err)  // 验证失败的错误

    if(err.name === 'UnauthorizedError') return res.cc('身份认证失败')

    res.cc(err) // 未知错误
})

app.listen(3007,()=>{
    console.log('api runnning at http://127.0.0.1:3007');
})