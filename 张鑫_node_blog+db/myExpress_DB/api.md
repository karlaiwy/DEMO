<!--
 * @Author: KARL
 * @Date: 2022-10-14 13:43:22
 * @LastEditors: KARL
 * @LastEditTime: 2022-10-21 14:38:26
 * @FilePath: /myExpress_DB/api.md
 * @Description:
 *
 * Copyright (c) 2022 by KARL, All Rights Reserved.
-->

`接口文档`

获取公钥接口: `GET` /getKey

注册接口: `POST` /admin/reg
Body: username password email

登陆接口: `POST` /admin/login
Body: username password

上传文件接口: `POST` /upload/(user||article)
classify: user || article

获取资源接口: `GET` /api/rest/:resource/(:id)
resource: (users||articles||comments||columns)
id: uid || aid || aids ( 获取资源详情 )

创建资源接口: `POST` /api/rest/:resource
resource: (users||articles||comments||columns)
根据表的字段内容 填写 req.body

更新资源接口: `PUT` /api/rest/:resource/:id
resource: (users||articles||comments||columns)
id: uid || aid || aids

`数据库表文档`

User: {
username: required
password: required
email: required
avatar:
nikname:
}

Article:{
title: required
cover:
content: required
date:
hit_num:
comment_num:
like_num:
author: ref => User
comments: ref => Comment ---> uid: ref => User
column:ref => Column
}

Comment:{
content: required
date:
uid: ref => User
aid: ref => Article
}

Column:{
name: required
date:
aids: ref => Article
}

测试 id
uid: 6347cf16b28c45d84e81ff09
aid: 634acbf83eb31a6a0efa735e
columnID: 634aca8f4d10de3ac8a0357d
commentID: 634ac23dbc264e07f10c005e
token:eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFzZmExMWFkIiwicGFzc3dvcmQiOiJJclFGMnVEeEdUWUZHNlNuTnhWMlRsaDFyc0RET3hwcHVRcUNzbkVqZkxocXU1dE8rYmlSeU9TNHhSZlBuNmVFVDAzZGxpMjBTeTRLdFF6ajVDQVZHQT09IiwiZXhwIjoxNjY2NTkzNDg1LCJpYXQiOjE2NjYzMzQyODV9.U0UrJ5j8EkdZ0ER-vBxRYaZgUFqnv8fdO-vZ5iTDOWbVRi15J8Ow3aD4wQkftXjPLyTc3_Yy5Q37_eO3DWOK7Q