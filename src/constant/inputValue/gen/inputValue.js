/*    gene by D:\ss_vue_express\server_common\maintain\convert2Client\generateClientInput.js  
* 空对象，存储字段值（vue双向绑定） 
*/

"use strict"


const inputValueForCreate={
    admin_penalize:{"punishedId":null,"reason":null,"penalizeType":null,"penalizeSubType":null,"duration":null},
    admin_user:{"name":null,"password":null,"userType":null,"userPriority":null},
    category:{"name":null,"parentCategoryId":null},
    resource_profile:{"name":null,"range":null,"type":null,"maxFileNum":null,"totalFileSizeInMb":null},
    store_path:{"name":null,"path":null,"usage":null,"sizeInKb":null,"lowThreshold":null,"highThreshold":null},
    article:{"name":null,"status":null,"folderId":null,"htmlContent":null,"tags":null,"categoryId":null},
    article_comment:{"articleId":null,"content":null},
    folder:{"name":null,"parentFolderId":null},
    like_dislike:{"articleId":null,"like":null},
    tag:{"name":null},
    add_friend:{"receiver":null},
    member_penalize:{"publicGroupId":null,"memberId":null,"penalizeType":null,"duration":null},
    public_group:{"name":null,"membersId":null,"adminsId":null,"joinInRule":null,"waitApproveId":null},
    public_group_event:{"publicGroupId":null,"eventType":null,"targetId":null,"status":null},
    public_group_interaction:{"publicGroupId":null,"content":null},
    user_friend_group:{"friendGroupName":null,"friendsInGroup":null},
    impeach:{"title":null,"content":null,"impeachedArticleId":null,"impeachedCommentId":null},
    impeach_action:{"impeachId":null,"adminOwnerId":null,"action":null},
    impeach_comment:{"impeachId":null,"content":null},
    impeach_image:{"referenceId":null,"referenceColl":null},
    user:{"name":null,"account":null,"password":null},
    user_resource_profile:{"userId":null,"resource_profile_id":null,"duration":null},
    collection:{"name":null,"articlesId":null,"topicsId":null},
    recommend:{"articleId":null,"toUserId":null,"toGroupId":null,"toPublicGroupId":null},
    topic:{"name":null,"desc":null,"articlesId":null},
}

const inputValueForUpdate={
    admin_penalize:{},
    admin_user:{"name":null,"password":null,"userType":null,"userPriority":null},
    category:{"name":null,"parentCategoryId":null},
    resource_profile:{},
    store_path:{"sizeInKb":null,"lowThreshold":null,"highThreshold":null},
    article:{"name":null,"status":null,"folderId":null,"htmlContent":null,"tags":null,"categoryId":null},
    article_comment:{},
    folder:{"name":null,"parentFolderId":null},
    like_dislike:{},
    tag:{},
    add_friend:{"status":null},
    member_penalize:{},
    public_group:{"name":null,"membersId":null,"adminsId":null,"joinInRule":null,"waitApproveId":null},
    public_group_event:{},
    public_group_interaction:{},
    user_friend_group:{"friendGroupName":null,"friendsInGroup":null},
    impeach:{"title":null,"content":null,"impeachedArticleId":null,"impeachedCommentId":null},
    impeach_action:{},
    impeach_comment:{"content":null},
    impeach_image:{},
    user:{"name":null,"account":null,"password":null},
    user_resource_profile:{},
    collection:{"name":null,"articlesId":null,"topicsId":null},
    recommend:{},
    topic:{"name":null,"desc":null,"articlesId":null},
}


export {inputValueForCreate,inputValueForUpdate}