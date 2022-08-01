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

app.get("/getBookInfo", (request, response) => {
    response.setHeader("Access-Control-Allow_origin", '*')
    response.setHeader("cache-Control", "no-store, no-cache, max-age=0")
    fs.readFile("./data/perfect/bookInfo.json", (err, data) => {
        if (err) {
            return console.log("读取失败！");
        } else {
            let originData = JSON.parse(data)
            return response.send({
                code: 200,
                msg: "请求成功",
                success: true,
                result: originData
            })
        }
    })
})

app.get("/getPersonInfo", (request, response) => {
    response.setHeader("Access-Control-Allow_origin", '*')
    response.setHeader("cache-Control", "no-store, no-cache, max-age=0")
    fs.readFile("./data/perfect/personInfo.json", (err, data) => {
        if (err) {
            return console.log("读取失败！");
        } else {
            let originData = JSON.parse(data)
            return response.send({
                code: 200,
                msg: "请求成功",
                success: true,
                result: originData
            })
        }
    })
})



module.exports = app