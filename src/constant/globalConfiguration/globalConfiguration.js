/*    gene by D:\ss_vue_express\server_common\maintain\convert2Client\globalConfiguration.js  
* 一些设置信息，和服务器端的设置保持一致 
*/

"use strict"


const uploadFileDefine={"common":{"imageType":["PNG","JPEG","JPG"],"attachmentType":["7z","txt","log"],"userPhotoType":["PNG"]},"article_image":{"maxSizeInByte":2097152,"maxSizeInMB":2,"maxWidth":750,"maxHeight":600},"article_attachment":{"maxSizeInByte":10485760,"maxSizeInMB":10},"user_photo":{"maxSizeInByte":320000,"maxHeight":100,"maxWidth":100},"impeach":{"image":{"maxSizeInByte":2097152,"maxSizeInMB":2},"attachment":{"maxSizeInByte":10485760,"maxSizeInMB":10}},"impeach_comment":{"image":{"maxSizeInByte":2097152,"maxSizeInMB":2,"maxWidth":900,"maxHeight":700},"attachment":{"maxSizeInByte":10485760,"maxSizeInMB":10}}}

export {
    uploadFileDefine,
}