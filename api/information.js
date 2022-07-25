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

app.post("/getTree", (request, response) => {
    response.setHeader("Access-Control-Allow_origin", '*')
    response.setHeader("cache-Control", "no-store, no-cache, max-age=0")
    fs.readFile("./data/info/division.json", (err, data) => {
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
app.get("/getInfo", (request, response) => {
    response.setHeader("Access-Control-Allow_origin", '*')
    response.setHeader("cache-Control", "no-store, no-cache, max-age=0")
    fs.readFile("./data/info/db.json", (err, data) => {
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
app.post("/saveInfo", (request, response) => {
    response.setHeader("Access-Control-Allow_origin", '*')
    response.setHeader("cache-Control", "no-store, no-cache, max-age=0")
    fs.writeFile("./data/info/db.json", JSON.stringify(request.body), (err) => {
        return console.log("读取失败！");
    })
    return response.send({
        code: 200,
        msg: "保存成功",
        success: true,
        result: null
    })
})


module.exports = app