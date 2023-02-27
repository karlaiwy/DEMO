const { decrypt, encrypt, generateKeys } = require('./util/utils')
const fs = require('fs').promises
const { userPath } = require('../config')
const { getUserStatusMsg } = require('./statusControl')
const { verifyToken } = require('./token')

module.exports = {
  //添加用户
  async addUser(username, pwd) {
    let password = encrypt(pwd)
    let user = await this.getUserInfo(username)
    // 三种结果  用户不存在 用户已存在 用户查询错误
    // 如果用户不存在
    if (user?.['tag'] === 'USER_NOF') {
      let userId = await getUsersNum()
      userId = ('000000' + userId).substr(-6)
      try {
        await appendUser({ user_id: userId, user_name: username, password })
        let resData = getUserStatusMsg('USER_ADD')
        resData.statusCode = 200
        return {
          ...resData,
          data: {
            user_id: userId, user_name: username
          }
        }
      } catch (error) {
        console.log(error);
      }
     
    }

    // 如果用户已存在
    if (user?.['tag'] === 'USER_FOND') {
      return {
        ...getUserStatusMsg('USER_DR')
      }
    }

    // 如果用户查询失败
    return {
      statusCode: user.statusCode,
      errMsg: '注册失败'
    }
  },
  //获取用户信息
  async getUserInfo (username) {
    try {
      let users = await getUsers();
      let userInfo = users.find(item => item['user_name'].trim() === username.trim())
      if (!userInfo) {
        return {
          ...getUserStatusMsg('USER_NOF')
        }
      }
      return {
        ...getUserStatusMsg('USER_FOND'),
        data: {
          ...userInfo
        }
      }
    } catch (err) {
      console.error(err)
      return {
        ...getUserStatusMsg('USER_FERR'),
      }
    }
  },
  //验证Token信息
  async verifyToken (username, userID) {
    try {
      let users = await getUsers();
      let userInfo = users.find(item => item['user_id'].trim() === userID.trim())
      /*
      userInfo = {user_id,user_name,password}
      */
      // let veri = verifyToken()
      if (!userInfo) {
        return {
          ...getUserStatusMsg('USER_NOF')
        }
      }

      if (userInfo['user_name'] === username) {
        return {
          ...getUserStatusMsg('USER_FOND'),
        }
      }

    } catch (err) {
      console.error(err)
      return {
        ...getUserStatusMsg('USER_FERR'),
      }
    }
  },
  //验证用户 账号密码
  async verifyUser (username, pwd) {
    let user = await this.getUserInfo(username)
    // console.log(user)
    //如果不是查询成功
    if (user?.['tag'] !== 'USER_FOND') {
      return user
    }
    let { user_id, password, user_name } = user.data
    //验证密码 库中存储二次加密 和传输 一次加密 对比
    let isVerify = decrypt(decrypt(password)) === decrypt(pwd)

    if (isVerify) {
      return {
        ...getUserStatusMsg('USER_INN'),
        data: {
          user_id, user_name
        }
      }
    }
  }
}

async function getUsers () {
  let users = await fs.readFile(userPath, 'utf8')
  users = JSON.parse(users)
  return users
}

async function setUsers (users) {
  try {
    await fs.writeFile(userPath, JSON.stringify(users), 'utf8')
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

async function appendUser ({ user_id = false, user_name = false, password = false }) {
  let user = await getUsers()
  user.push({
    user_id, user_name, password
  })
  await setUsers(user)
  return true
}


async function getUsersNum () {
  let users = await getUsers()
  return users?.length
}