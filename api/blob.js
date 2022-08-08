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
app.get("/getBlobList", (request, response) => {
    response.setHeader("Access-Control-Allow_origin", '*')
    response.setHeader("cache-Control", "no-store, no-cache, max-age=0")
    fs.readFile("./data/blob/db.json", (err, data) => {
        if (err) {
            return console.log("读取失败！");
        }
        let result = {
            code: 200,
            result: JSON.parse(data),
            success: true
        }
        return response.send(JSON.stringify(result))
    })
})

module.exports = app