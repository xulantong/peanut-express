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

app.post("/getDictValue", (request, response) => {
    response.setHeader("Access-Control-Allow_origin", '*')
    response.setHeader("cache-Control", "no-store, no-cache, max-age=0")
    fs.readFile("./data/info/dictValue.json", (err, data) => {
        if (err) {
            return console.log("读取失败！");
        }
        let originData = JSON.parse(data)[request.body.code]?.slice((request.body.currentPage - 1) * request.body.pageSize, request.body.currentPage * request.body.pageSize)
        let result = {
            result: originData,
            rowCount: JSON.parse(data).length
        }
        return response.send(JSON.stringify(result))
    })
})
app.post("/appendValue", (request, response) => {
    response.setHeader("Access-Control-Allow_origin", '*')
    response.setHeader("cache-Control", "no-store, no-cache, max-age=0")
    fs.readFile('./data/info/dictValue.json', (err, data) => {
        if (err) {
            return console.log("读取失败！");
        } else {
            let originData = JSON.parse(data)
            if (originData[request.body.code].find(item => item.key === request.body.key)) {
                return response.send({
                    code: 500,
                    msg: "键值已经存在",
                    result: null,
                    success: true
                });
            } else {
                originData[request.body.code].push({
                    key : request.body.key,
                    value : request.body.value
                })
                fs.writeFile('./data/info/dictValue.json', JSON.stringify(originData), err => {
                    console.log(err);
                })
                return response.send({
                    code: 200,
                    msg: "添加成功",
                    result: null,
                    success: true
                });
            }


        }
    })
})
app.post("/deleteValue", (request, response) => {
    response.setHeader("Access-Control-Allow_origin", '*')
    response.setHeader("cache-Control", "no-store, no-cache, max-age=0")
    fs.readFile('./data/info/dictValue.json', (err, data) => {
        if (err) {
            return console.log("读取失败！");
        } else {
            let originData = JSON.parse(data)
            request.body.keys.forEach(item => {
                originData[request.body.code].splice(originData[request.body.code].findIndex(item2 => item2.key === item), 1)
    
            });
            fs.writeFile('./data/info/dictValue.json', JSON.stringify(originData), err => {
                return console.log(err);
            })
            return response.send({
                code: 200,
                msg: "添加成功",
                result: null,
                success: true
            });
        }
    })
})
app.get("/getCacheDict", (request, response) => {
    response.setHeader("Access-Control-Allow_origin", '*')
    response.setHeader("cache-Control", "no-store, no-cache, max-age=0")
    fs.readFile("./data/info/dictValue.json", (err, data) => {
        if (err) {
            return console.log("读取失败！");
        }
        let result = {
            result: JSON.parse(data),
        }
        return response.send(JSON.stringify(result))
    })
})


module.exports = app