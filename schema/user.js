// 导入验证规则的包
const joi = require('joi')

// 定义验证规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

// 定义 id,nickname,email验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

// 定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
    body:{
        username,
        password
    }
}

// 头像规则
const avatar = joi.string().dataUri().required()

// 验证规则对象-更新用户基本信息
exports.update_userinfo_schema ={
    // 对req.body里的数据验证
    body:{
        // id:id,  // 前后名一致，则可以简写.
        id,
        nickname,
        email
    }
}

// 验证规则对象-更新密码
exports.update_password_schema = {
    body:{
        oldPwd : password,
        newPwd : joi.not(joi.ref('oldPwd')).concat(password),  // 不能与原密码保持一致，且要符合密码规则
    }
}

// 头像
exports.update_avatar_schema = {
    body:{
        avatar
    }
}