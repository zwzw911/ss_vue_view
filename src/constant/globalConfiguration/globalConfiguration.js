"use strict"


const uploadFileDefine={"common":{"imageType":["PNG","JPEG","JPG"],"attachmentType":["7z","txt","log"],"userThumbImageType":["PNG"]},"article_image":{"maxSizeInByte":2097152,"maxSizeInMB":2,"maxWidth":750,"maxHeight":600},"article_attachment":{"maxSizeInByte":10485760,"maxSizeInMB":10},"user_thumb":{"maxSizeInByte":102400,"maxHeight":100,"maxWidth":100},"impeach":{"image":{"maxSizeInByte":2097152,"maxSizeInMB":2},"attachment":{"maxSizeInByte":10485760,"maxSizeInMB":10}},"impeach_comment":{"image":{"maxSizeInByte":2097152,"maxSizeInMB":2,"maxWidth":900,"maxHeight":700},"attachment":{"maxSizeInByte":10485760,"maxSizeInMB":10}}}

export {
    uploadFileDefine,
}