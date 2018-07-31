/*    gene by D:\U\ss_vue_express\server_common\maintain\convert2Client\generateVueProxyTable.js  
* 开发时候的一些运行环境的配置 
*/

"use strict"


const proxySetting={
    '/user':
        {"target":"http://localhost:3000","changeOrigin":true,"pathRewrite":{"^/user":"/user"}},
    '/article':
        {"target":"http://localhost:3000","changeOrigin":true,"pathRewrite":{"^/article":"/article"}},
    '/articleComment':
        {"target":"http://localhost:3000","changeOrigin":true,"pathRewrite":{"^/articleComment":"/articleComment"}},
    '/articleLikeDislike':
        {"target":"http://localhost:3000","changeOrigin":true,"pathRewrite":{"^/articleLikeDislike":"/articleLikeDislike"}},
    '/impeach':
        {"target":"http://localhost:3000","changeOrigin":true,"pathRewrite":{"^/impeach":"/impeach"}},
    '/impeach_action':
        {"target":"http://localhost:3000","changeOrigin":true,"pathRewrite":{"^/impeach_action":"/impeach_action"}},
    '/impeach_comment':
        {"target":"http://localhost:3000","changeOrigin":true,"pathRewrite":{"^/impeach_comment":"/impeach_comment"}},
    '/add_friend':
        {"target":"http://localhost:3000","changeOrigin":true,"pathRewrite":{"^/add_friend":"/add_friend"}},
    '/user_friend_group':
        {"target":"http://localhost:3000","changeOrigin":true,"pathRewrite":{"^/user_friend_group":"/user_friend_group"}},
    '/public_group':
        {"target":"http://localhost:3000","changeOrigin":true,"pathRewrite":{"^/public_group":"/public_group"}},
    '/join_public_group_request':
        {"target":"http://localhost:3000","changeOrigin":true,"pathRewrite":{"^/join_public_group_request":"/join_public_group_request"}},
    '/folder':
        {"target":"http://localhost:3000","changeOrigin":true,"pathRewrite":{"^/folder":"/folder"}},
}



module.exports={
    proxySetting,
}