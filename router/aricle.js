// 文章路由
const express = require('express')
const router = express.Router()

const article_handle = require('../router_handle/article')

router.post('/add',article_handle.addArticle)

module.exports = router