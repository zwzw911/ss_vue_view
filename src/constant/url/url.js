/**
 * Created by Ada on 2018/4/21.
 */
'use strict'
import {RequestMethod} from '../enum/network'

const urlConfiguration={
  standAlone:{
    captcha:{url:'/user/captcha',method:RequestMethod.GET},
  },
  user:{
    login:{url:'/user/login',method:RequestMethod.POST},
    register:{url:'/user',method:RequestMethod.POST},
    uploadUserPhoto:{url:'/user/uploadUserPhoto',method:RequestMethod.PUT},
    getUserInfo:{url:'/user',method:RequestMethod.GET},
    saveUserInfo:{url:'/user',method:RequestMethod.PUT},
    changePassword:{url:'/user/changePassword',method:RequestMethod.PUT}
  },
}

export {urlConfiguration}
