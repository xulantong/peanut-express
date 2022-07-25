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


//请求卡片
app.get('/getCard', (request, response) => {
    response.setHeader("Access-Control-Allow_origin", '*')
    response.setHeader("cache-Control", "no-store, no-cache, max-age=0")
    fs.readFile("./data/todo/cardConfig.json", (err, data1) => {
        if (err) {
            return console.log("读取失败！");
        }
        fs.readFile("./data/todo/db.json", (err, data2) => {
            if (err) {
                return console.log("读取失败！");
            }
            let cardData = JSON.parse(data1)
            let tableData = JSON.parse(data2)
            let originData = cardData.map(item => {
                ['urgent', 'common', 'suspend', 'complete'].forEach(item1 => {
                    if (item.workCode === item1) {
                        item.workCount = tableData.filter(item => {
                            return item.workCode === item1
                        }).length || 0
                        item.percent = tableData.length ? ((item.workCount / tableData.length) * 100).toFixed(2) * 1 : 0
                    }
                })
                return item
            })
            let result = {
                result: originData,
                total: tableData.length
            }
            return response.send(JSON.stringify(result))
        })
    })

})

//3.1请求表格
app.post('/getList', (request, response) => {
    response.setHeader("Access-Control-Allow_origin", '*')
    response.setHeader("cache-Control", "no-store, no-cache, max-age=0")
    fs.readFile("./data/todo/db.json", (err, data) => {
        if (err) {
            return console.log("读取失败！");
        }
        let originData = JSON.parse(data).filter(item => item.workCode === request.body.activateCard).slice((request.body.currentPage-1)*request.body.pageSize,request.body.currentPage*request.body.pageSize)
        let result = {
            result: originData,
            rowCount: JSON.parse(data).filter(item => item.workCode === request.body.activateCard).length
        }
            return response.send(JSON.stringify(result))
    })
})

//3.2删除
app.post('/delete', (request, response) => {
    response.setHeader("Access-Control-Allow_origin", '*')
    response.setHeader("cache-Control", "no-store, no-cache, max-age=0")
    let originData = []
    fs.readFile("./data/todo/db.json", (err, data) => {
        if (err) {
            return console.log("读取失败！");
        }
        originData = JSON.parse(data)
        request.body.ids.forEach(item => {
            originData.splice(originData.findIndex(item2 => item2.id === item), 1)

        });
        fs.writeFile("./data/todo/db.json", JSON.stringify(originData), (err) => {
            console.log(err);
        })
        return response.send({
            result: "删除成功"
        });
    })

})

//3.3新增
app.post('/append', (request, response) => {
    response.setHeader("Access-Control-Allow_origin", '*')
    response.setHeader("cache-Control", "no-store, no-cache, max-age=0")
    let originData = []
    fs.readFile("./data/todo/db.json", (err, data) => {
        if (err) {
            return console.log("读取失败！");
        }
        originData = JSON.parse(data)
        originData.unshift(request.body)
        fs.writeFile("./data/todo/db.json", JSON.stringify(originData), (err) => {
            console.log(err);
        })
        return response.send({
            result: "新增成功"
        });
    })

})

//3.4编辑
app.post('/change', (request, response) => {
    response.setHeader("Access-Control-Allow_origin", '*')
    response.setHeader("cache-Control", "no-store, no-cache, max-age=0")
    let originData = []
    fs.readFile("./data/todo/db.json", (err, data) => {
        if (err) {
            return console.log("读取失败！");
        }
        originData = JSON.parse(data)
        originData.splice(originData.findIndex(item => item.id === request.body.id), 1)
        originData.unshift(request.body)
        fs.writeFile("./data/todo/db.json", JSON.stringify(originData), (err) => {
            console.log(err);
        })
        return response.send({
            result: "编辑成功"
        });
    })

})

//3.5完成
app.post('/complete', (request, response) => {
    response.setHeader("Access-Control-Allow_origin", '*')
    response.setHeader("cache-Control", "no-store, no-cache, max-age=0")
    let originData = []
    fs.readFile("./data/todo/db.json", (err, data) => {
        if (err) {
            return console.log("读取失败！");
        }
        originData = JSON.parse(data)
        originData.forEach(item => {
            if (request.body.ids.includes(item.id)) {
                item.workCode = "complete"
                item.workName = "已完成事项"
                item.updataTime = dayjs().valueOf()
            }
        })
        fs.writeFile("./data/todo/db.json", JSON.stringify(originData), (err) => {
            console.log(err);
        })
        return response.send({
            result: "修改成功"
        });
    })

})

//3.6全部删除
app.get('/deleteAll', (request, response) => {
    response.setHeader("Access-Control-Allow_origin", '*')
    response.setHeader("cache-Control", "no-store, no-cache, max-age=0")
    fs.readFile("./data/todo/db.json", (err, data) => {
        if (err) {
            return console.log("读取失败！");
        }

        fs.writeFile("./data/todo/db.json", JSON.stringify(JSON.parse(data).filter(item => item.workCode !== 'complete')), (err) => {
            console.log(err);
        })
        return response.send({
            result: "全部删除成功"
        });
    })

})
module.exports = app