// 路由处理函数模块

// 导入数据库
const db = require('../db/index')

// 导入bcryptjs包
const bcrypt = require('bcryptjs')

// 导入生成token的包
const jwt = require('jsonwebtoken')
const config = require('../config')


exports.regUser = (req,res)=>{
    // 拿到用户信息
    const userinfo = req.body
    // console.log(userinfo);
    // 合法性校验
    // if(!userinfo.username || !userinfo.password){
    //     // return res.send({
    //     //     status:1,
    //     //     message:'用户名或密码不合法'
    //     // })
    //     return res.cc('用户名或密码不合法')
    // }



    // 数据库查询用户名是否被占用
    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr,userinfo.username,(err,results)=>{
        if(err) {
        //    return res.send({status:1,message:err.message}) 
            return res.cc(err)
        }
        
        if(results.length > 0){
            // return res.send({status:1,message:'用户名被占用'})
            return res.cc('用户名被占用')
        }
    })
    // res.send('reguser OK')

    // 调用 对密码加密
    console.log(userinfo);
    userinfo.password = bcrypt.hashSync(userinfo.password,10)  // 随机盐长度一般为10
    console.log(userinfo);

    // 定义插入用户的sql语句
    const sql = 'insert into ev_users set ?'
    db.query(sql,{username:userinfo.username,password:userinfo.password},(err,results)=>{
        if(err) {
            // return res.send({status:1,message:err.message})
            return res.cc(err)
        }
       
        // 判断影响函数
        if(results.affectedRows !== 1) {
            // return res.send({status:1,message:'注册用户失败'})
            return res.cc('注册用户失败')
        }
        // res.send({status:0,message:'注册成功'})
        res.cc('注册成功',0)
    })
}

exports.login = (req,res)=>{
    // 接受表单数据
    const userinfo = req.body
    const sql = 'select * from ev_users where username=?'
    db.query(sql,userinfo.username,(err,results)=>{
        if(err) return res.cc(err)
        if(results.length !== 1) return res.cc('登录失败')

        // res.send('login OK')

        const compareResult = bcrypt.compareSync(userinfo.password,results[0].password)  // 第一个是用户提交的密码，第二个是数据库中的
        if(!compareResult) return res.cc('登录失败')

        // res.send('ok')
                
        // 在服务器端生成Token字符串
        const user = {...results[0],password:'',user_pic:''}
        // console.log(user);
        // 对用户信息加密，生成token字符串
        const tokenStr = jwt.sign(user,config.jwtScretKey,{expiresIn:config.expiresIn})
        res.send({status:0,message:'登录成功',token:'Bearer '+tokenStr})
    })
}