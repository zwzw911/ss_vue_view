/*    gene by D:\U\ss_vue_express\server_common\maintain\convert2Client\globalConfiguration.js  
* 一些设置信息，和服务器端的设置保持一致 
*/

"use strict"


const sessionOption={
   cookieOption:{"path":"/","domain":"127.0.0.1","maxAge":900000,"secure":false,"httpOnly":false,"sameSite":"lax"},
   expressSessionOption:{"secret":"suibian","resave":false,"rolling":false,"saveUninitialized":false},
   sessionStoreOption:{"redis":{"ttl":900,"db":0}},
}
const defaultSetting={
   miscellaneous:{"captchaExpire":{"value":60,"type":"int","chineseName":"captcha最大保存时间","unit":"秒"}},
}
const searchSetting={
   normal:{"maxKeyNum":5,"maxQueryValuePerField":5},
}
const paginationSetting={
   user:{"pageSize":6,"pageLength":10},
   department:{"pageSize":6,"pageLength":10},
   employee:{"pageSize":6,"pageLength":10},
   billType:{"pageSize":6,"pageLength":10},
   bill:{"pageSize":6,"pageLength":10},
}
const suggestLimit={
   department:{"maxOptionNum":5},
   employee:{"maxOptionNum":20},
   billType:{"maxOptionNum":10},
   bill:{"maxOptionNum":5},
}
const searchMaxPage={
   readName:10,
}
const uploadFileDefine={
   common:{"imageType":["PNG","JPEG","JPG"],"attachmentType":["7z","txt","log"],"userPhotoType":["PNG"]},
   article_image:{"maxSizeInByte":2097152,"maxSizeInMB":2,"maxWidth":750,"maxHeight":600},
   article_attachment:{"maxSizeInByte":10485760,"maxSizeInMB":10},
   user_photo:{"maxSizeInByte":320000,"maxHeight":100,"maxWidth":100},
   impeach:{"image":{"maxSizeInByte":2097152,"maxSizeInMB":2},"attachment":{"maxSizeInByte":10485760,"maxSizeInMB":10}},
   impeach_comment:{"image":{"maxSizeInByte":2097152,"maxSizeInMB":2,"maxWidth":900,"maxHeight":700},"attachment":{"maxSizeInByte":10485760,"maxSizeInMB":10}},
}
const maxNumber={
   article:{"tagNumberPerArticle":5,"imagesNumberPerArticle":5,"imageSizeInMb":2,"attachmentNumberPerArticle":5,"attachmentSizeInMb":12,"commentNumberPerArticle":500},
   folder:{"folderLevel":3},
   friend:{"maxFriendsNumberPerGroup":500,"maxMemberNumberPerPublicGroup":200,"maxAdministratorPerPublicGroup":10,"maxGroupUserCanJoinIn":20},
   impeach:{"maxImageNumber":10,"maxImageSizeInMb":2,"maxAttachmentNumber":10,"maxCommentNumber":200},
   impeachAttachment:{"maxImageNumber":10,"maxImageSizeInMb":2,"maxAttachmentNumber":10},
   user_operation:{"maxTopic":100,"maxArticlePerTopic":10,"maxRecommendToUser":10,"maxRecommendToGroup":10,"maxRecommendToPublicGroup":10,"maxArticlePerCollection":100,"maxTopicPerCollection":100},
   user:{"maxUsedAccountNum":10},
}
const daily={
   resource_maxDailyCheckUserNum:10000,
   resource_dailyCheckPeriod:7,
}
const gm={
}
const intervalCheckConfiguration={
   captcha:{"simpleCheckParams":{"duration":60,"numberInDuration":10,"expireTimeBetween2Req":500},"rejectCheckParams":{"rejectTimesToTime":"{10,30,60,120,300,600}","rejectTimesThreshold":5}},
   uploadUserPhoto:{"simpleCheckParams":{"duration":60,"numberInDuration":10,"expireTimeBetween2Req":3000},"rejectCheckParams":{"rejectTimesToTime":"{10,120,300,1200}","rejectTimesThreshold":3}},
   normalReq:{"simpleCheckParams":{"duration":30,"numberInDuration":10,"expireTimeBetween2Req":100},"rejectCheckParams":{"rejectTimesToTime":"{5,10,30,60,120,240}","rejectTimesThreshold":5}},
}
const miscConfiguration={
   user:{"accountMinimumChangeDurationInHours":24},
}
const mailOption={
   qq:{"port":465,"host":"smtp.qq.com","secure":true,"auth":{"user":"1952206639","pass":"amtlhbezlrxocc"}},
   company:{},
}
const mailAccount={
   qq:"1952206639@qq.com",
}
const userGroupFriend={
   max:{"maxUserPerGroup":100,"maxUserPerDefaultGroup":200},
   defaultGroupName:{"enumFormat":{"MyFriend":"我的好友","BlackList":"黑名单"},"enumValue":["我的好友","黑名单"]},
}
const addFriendRequest={
   max:{"maxDeclineTimes":10,"maxAcceptTimes":10},
}


export {
    sessionOption,
    defaultSetting,
    searchSetting,
    paginationSetting,
    suggestLimit,
    searchMaxPage,
    uploadFileDefine,
    maxNumber,
    daily,
    gm,
    intervalCheckConfiguration,
    miscConfiguration,
    mailOption,
    mailAccount,
    userGroupFriend,
    addFriendRequest,
}