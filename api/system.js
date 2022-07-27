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


app.post("/login", (request, response) => {
    response.setHeader("Access-Control-Allow_origin", '*')
    response.setHeader("cache-Control", "no-store, no-cache, max-age=0")
    fs.readFile("./data/sys/userInfo.json", (err, data) => {
        if (err) {
            return console.log("读取失败！");
        } else {
            let originData = JSON.parse(data)
            if (originData.loginId === request.body.loginId && originData.password === request.body.password) {
                return response.send({
                    code: 200,
                    result: {
                        token: "37289173921738hgdwfkjh7238137",
                        msg: "登陆成功"
                    }
                })
            }
        }
    })
})
app.post("/checkPassword", (request, response) => {
    response.setHeader("Access-Control-Allow_origin", '*')
    response.setHeader("cache-Control", "no-store, no-cache, max-age=0")
    fs.readFile("./data/sys/userInfo.json", (err, data) => {
        if (err) {
            return console.log("读取失败！");
        } else {
            let originData = JSON.parse(data)
            if (originData.password === request.body.oldPassword) {
                return response.send({
                    code: 200,
                    result: {
                        msg: "密码正确"
                    }
                })
            }
        }
    })
})
app.post("/changePassword", (request, response) => {
    response.setHeader("Access-Control-Allow_origin", '*')
    response.setHeader("cache-Control", "no-store, no-cache, max-age=0")
    fs.readFile("./data/sys/userInfo.json", (err, data) => {
        if (err) {
            return console.log("读取失败！");
        } else {
            let originData = {
                loginId: JSON.parse(data).loginId,
                password: request.body.newPassword
            }
            fs.writeFile('./data/sys/userInfo.json', JSON.stringify(originData), err => {
                console.log(err);
            })
        }
    })

    return response.send({
        code: 200,
        msg: "修改成功",
        result: null,
        success: true
    });
})
app.get("/getMenuTree", (request, response) => {
    response.setHeader("Access-Control-Allow_origin", '*')
    response.setHeader("cache-Control", "no-store, no-cache, max-age=0")
    fs.readFile('./data/sys/routes.json', (err, data) => {
        if (err) {
            return console.log("读取失败！");
        } else {
            return response.send({
                code: 200,
                msg: "",
                result: JSON.parse(data),
                success: true
            });
        }
    })
})
app.post("/changeMenuTree", (request, response) => {
    response.setHeader("Access-Control-Allow_origin", '*')
    response.setHeader("cache-Control", "no-store, no-cache, max-age=0")
    fs.writeFile('./data/sys/routes.json', JSON.stringify(request.body), err => {
        console.log(err);
    })
    return response.send({
        code: 200,
        msg: "修改成功",
        result: null,
        success: true
    });
})


module.exports = app