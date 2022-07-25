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

app.post("/getDict", (request, response) => {
    response.setHeader("Access-Control-Allow_origin", '*')
    response.setHeader("cache-Control", "no-store, no-cache, max-age=0")
    fs.readFile("./data/info/dictInfo.json", (err, data) => {
        if (err) {
            return console.log("读取失败！");
        }
        let originData = []
        if(request.body.codes?.length){
            originData = JSON.parse(data)?.filter(item=>request.body.codes?.includes(item.code))?.slice((request.body.currentPage - 1) * request.body.pageSize, request.body.currentPage * request.body.pageSize)
        }else{
            originData = JSON.parse(data)?.slice((request.body.currentPage - 1) * request.body.pageSize, request.body.currentPage * request.body.pageSize)
        }
        let result = {
            result: originData,
            rowCount: JSON.parse(data).length
        }
        return response.send(JSON.stringify(result))
    })
})
app.post("/append", (request, response) => {
    response.setHeader("Access-Control-Allow_origin", '*')
    response.setHeader("cache-Control", "no-store, no-cache, max-age=0")
    fs.readFile('./data/info/dictInfo.json', (err, data) => {
        if (err) {
            return console.log("读取失败！");
        } else {
            let originData = JSON.parse(data)
            console.log(originData.find(item => item.code === request.body.code));
            if (originData.find(item => item.code === request.body.code)) {
                return response.send({
                    code: 500,
                    msg: "字典已经存在",
                    result: null,
                    success: true
                });
            } else {
                originData.push(request.body)
                fs.writeFile('./data/info/dictInfo.json', JSON.stringify(originData), err => {
                    console.log(err);
                })
                fs.readFile('./data/info/dictValue.json', (err, data1) => {
                    if (err) {
                        return console.log("读取失败！");
                    } else {
                        let dictValue = JSON.parse(data1)
                        dictValue[request.body.code] = []
                        fs.writeFile('./data/info/dictValue.json', JSON.stringify(dictValue), err => {
                            return console.log(err);
                        })
                    }
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
app.post("/delete", (request, response) => {
    response.setHeader("Access-Control-Allow_origin", '*')
    response.setHeader("cache-Control", "no-store, no-cache, max-age=0")
    fs.readFile('./data/info/dictInfo.json', (err, data) => {
        if (err) {
            return console.log("读取失败！");
        } else {
            let originData = JSON.parse(data)
            fs.readFile('./data/info/dictValue.json', (err, data1) => {
                if (err) {
                    return console.log("读取失败！");
                } else {
                    let dictValue = JSON.parse(data1)
                    request.body.codes.forEach(item => {
                        originData.splice(originData.findIndex(item2 => item2.code === item), 1)
                        delete dictValue[item]
                    });
                    fs.writeFile('./data/info/dictValue.json', JSON.stringify(dictValue), err => {
                        return console.log(err);
                    })
                    fs.writeFile('./data/info/dictInfo.json', JSON.stringify(originData), err => {
                        return console.log(err);
                    })
                    return response.send({
                        code: 200,
                        msg: "删除成功",
                        result: null,
                        success: true
                    });
                }
            })
            
        }
    })
})
app.get("/getAllDict", (request, response) => {
    response.setHeader("Access-Control-Allow_origin", '*')
    response.setHeader("cache-Control", "no-store, no-cache, max-age=0")
    fs.readFile("./data/info/dictInfo.json", (err, data) => {
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