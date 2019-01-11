/*    gene by D:\U\ss_vue_express\server_common\maintain\convert2Client\globalConfiguration.js  
* 一些设置信息，和服务器端的设置保持一致 
*/

"use strict"


const defaultSetting={
   miscellaneous:{"captchaExpire":{"value":60,"type":"int","chineseName":"captcha最大保存时间","unit":"秒"}},
}
const searchSetting={
   normal:{"maxKeyNum":5,"maxQueryValuePerField":5},
}
const suggestLimit={
   department:{"maxOptionNum":5},
   employee:{"maxOptionNum":20},
   billType:{"maxOptionNum":10},
   bill:{"maxOptionNum":5},
}
const uploadFileDefine={
   common:{"imageType":["PNG","JPEG","JPG"],"attachmentType":["7z","txt","log"],"userPhotoType":["PNG"]},
   article:{"article_image":{"maxSizeInByte":2097152,"maxSizeInMB":2,"maxWidth":750,"maxHeight":600},"article_attachment":{"maxSizeInByte":10485760,"maxSizeInMB":10}},
   user_photo:{"maxSizeInByte":320000,"maxHeight":100,"maxWidth":100},
   impeach:{"image":{"maxSizeInByte":2097152,"maxSizeInMB":2},"attachment":{"maxSizeInByte":10485760,"maxSizeInMB":10}},
   impeach_comment:{"image":{"maxSizeInByte":2097152,"maxSizeInMB":2,"maxWidth":900,"maxHeight":700},"attachment":{"maxSizeInByte":10485760,"maxSizeInMB":10}},
}
const maxNumber={
   article:{"tagNumberPerArticle":5,"imagesNumberPerArticle":5,"imageSizeInMb":2,"attachmentNumberPerArticle":5,"attachmentSizeInMb":12,"commentNumberPerArticle":500},
   folder:{"folderLevel":4},
   friend:{"maxFriendsNumberPerGroup":500,"maxMemberNumberPerPublicGroup":200,"maxAdministratorPerPublicGroup":10,"maxGroupUserCanJoinIn":20,"searchMaxFriend":5},
   impeach:{"maxImageNumber":10,"maxImageSizeInMb":2,"maxAttachmentNumber":10,"maxCommentNumber":200},
   impeachAttachment:{"maxImageNumber":10,"maxImageSizeInMb":2,"maxAttachmentNumber":10},
   user_operation:{"maxTopic":100,"maxArticlePerTopic":10,"maxRecommendToUser":10,"maxRecommendPerPage":10,"maxReadCollectionPerPage":10,"maxUnReadReceiveRecommends":2,"maxArticlePerCollection":100,"maxTopicPerCollection":100},
   user:{"maxUsedAccountNum":10},
}
const userGroupFriend={
   max:{"maxUserPerGroup":100,"maxUserPerDefaultGroup":200},
   defaultGroupName:{"enumFormat":{"MyFriend":"我的好友","BlackList":"黑名单"},"enumValue":["我的好友","黑名单"]},
}


export {
    defaultSetting,
    searchSetting,
    suggestLimit,
    uploadFileDefine,
    maxNumber,
    userGroupFriend,
}