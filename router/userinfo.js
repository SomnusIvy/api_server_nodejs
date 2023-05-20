const express = require('express')
const router = express.Router()

// 挂载路由

// 路由处理函数模块
const userinfo_handler = require('../router_handle/userinfo')

// 验证数据的中间件
const expressJoi = require('@escook/express-joi')
const {update_userinfo_schema,update_password_schema,update_avatar_schema} = require('../schema/user')

// 获取用户信息路由
router.get('/userinfo',userinfo_handler.getUserInfo)

// 更新用户信息
router.post('/userinfo',expressJoi(update_userinfo_schema),userinfo_handler.updateUserInfo)

// 更新用户密码
router.post('/updatepwd',expressJoi(update_password_schema),userinfo_handler.updatePassword)

// 更换头像
router.post('/update/avatar',expressJoi(update_avatar_schema),userinfo_handler.updateAvatar)

module.exports = router