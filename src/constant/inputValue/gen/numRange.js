/*    gene by D:\ss_vue_express\server_common\maintain\convert2Client\generateClientNumRange.js  
* 当input为autoGen的时候，产生需要的min/maxNum 
*/

"use strict"


const numRange={
    article:{
        tags:{"max":5},
    },
    public_group:{
        membersId:{"max":200},
        adminsId:{"max":10},
        waitApproveId:{"max":200},
    },
    user_friend_group:{
        friendsInGroup:{"max":100},
    },
    collection:{
        articlesId:{"max":100},
        topicsId:{"max":100},
    },
    recommend:{
        toUserId:{"max":5},
        toGroupId:{"max":5},
        toPublicGroupId:{"max":5},
    },
    topic:{
        articlesId:{"max":10},
    },
}


export {numRange}