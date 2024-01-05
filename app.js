// const express = require('express');
// const app = express();
// var db = require('./sql');
//1-引入组件
import MyButton from "./src/components/MyButton"
export default {
    
        data() {
            return {
                message:"天下第一",
                count:0
            }
        },
        //在哪用就在哪注册组件
        //在组件中注册组件
        components:{
            MyButton:MyButton //属性名：属性值 ,template中使用属性名
        },
        template:  `
        <h1> {{message}}</h1>
        <MyButton></MyButton>
        <MyButton></MyButton>
        <MyButton></MyButton>
        <MyButton></MyButton>
        `
    
}

//引入users.js
// const users = require("./public/router/users");
// app.use(express.static('./public'));//将public设置为静态文件路径
 
// app.use("/",users);


// app.use('/',function(req,res){
//     res.sendFile(__dirname + "/" + "index.html");
// });

// var server = app.listen(8080,function(){
//     var port = server.address().port;
//     console.log("http://localhost:%s",port);
// });
