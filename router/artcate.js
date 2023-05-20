// 文章分类路由

const express = require('express')
const router = express.Router() 

const artCate_handle = require('../router_handle/artcate')

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
const {add_cate_schema,delete_cate_schema,get_cate_schema,update_cate_schema} = require('../schema/artcate') 

// 获取文章分类
router.get('/cates',artCate_handle.getArtCates)

//  新增文章文类
router.post('/addcates',expressJoi(add_cate_schema),artCate_handle.addArticleCates)

// 根据id删除文章分类
router.get('/deletecate/:id',expressJoi(delete_cate_schema),artCate_handle.deleteCateById)

// 根据id获取文章分类
router.get('/cates/:id',expressJoi(get_cate_schema),artCate_handle.getArtCateById)

// 根据id更新文章
router.post('/updatecate/',expressJoi(update_cate_schema),artCate_handle.updateCateById)



module.exports = router
