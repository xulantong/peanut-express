//1.引入express
const express = require("express")
//2.引入bodyParser
const bodyParser = require("body-parser")
//3.引入fs
const fs = require("fs")
//4.引入dayjs
const dayjs = require("dayjs")

//2.创建应用对象

const app = express()
app.use(bodyParser.json())

//3.创建路由规则
app.use('/todoList',require("./api/todolist"))
app.use('/sys',require("./api/system"))
app.use('/information',require("./api/information"))
app.use('/sysDict',require("./api/sysDict"))
app.use('/dictValue',require("./api/dictValue"))
app.use('/epidemic',require("./api/epidemic"))
app.use('/perfect',require("./api/perfect"))
app.use('/blob',require("./api/blob"))

//4.监听服务端口
app.listen(7676, () => {
    console.log("服务已经启动，7676端口监听中。。。");
})