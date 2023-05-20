const db = require('../db/index')
// 处理密码的模块
const bcrypt = require('bcryptjs')


// 获取用户基本信息的处理函数
exports.getUserInfo = (req,res)=>{
    // res.send('ok')

    const sql = 'select id,username,nickname,email,user_pic from ev_users where id=?'
    db.query(sql,req.user.id,(err,results)=>{  // 只要身份认证成功，req上就会多一个.user的属性，包含用户id
        if(err) return res.cc(err)
        if(results.length !== 1) return res.cc('获取用户信息失败')  // 有可能返回空
        res.send({
            statuds:0,
            message:'获取信息成功',
            data:results[0]
        })
    }) 
}

// 更新用户信息
exports.updateUserInfo = (req,res)=>{
    // res.send('ok')
    const sql = 'update ev_users set ? where id=?'
    db.query(sql,[req.body,req.body.id],(err,results)=>{
        if (err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('更新用户基本信息失败')
        res.cc('更新用户信息成功',0)  // 状态是0
    })
}

exports.updatePassword = (req,res)=>{
    // res.send('ok')

    const sql = 'select * from ev_users where id=?'
    db.query(sql,req.user.id,(err,results)=>{
        if(err) return res.cc(err)
        if(results.length !== 1) return res.cc('用户不存在')
        // res.cc('ok')
        // 判断密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd,results[0].password)
        if(!compareResult) return res.cc('旧密码错误')

        // 更新数据库密码
        // res.cc('ok')
        const sql = 'update ev_users set password=? where id=?'
        const newPwd = bcrypt.hashSync(req.body.newPwd,10)  // 10代表加密后的字符串长度
        db.query(sql,[newPwd,req.user.id],(err,results)=>{
            if(err) return res.cc(err)
            if(results.affectedRows !== 1) return res.cc('更新密码失败')
            res.cc('更新密码成功',0)
        })
    })
}

exports.updateAvatar = (req,res)=>{
    // res.send('ok')
     const sql = 'update ev_users set user_pic =? where id=?'
     db.query(sql,[req.body.avatar,req.user.id],(err,results)=>{
        if(err) return res.cc(err)
        if(results.affectedRows !==1) return res.cc('更换头像失败')
        res.cc('更换头像成功',0)
     })
}

