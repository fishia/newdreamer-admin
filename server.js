const path = require('path');
const rf = require('fs');
const express = require('express');
const app = express();

app.use('/nd/res/', express.static('build'));

app.get(/\/nd\//, function (req, res) {
    let reg = /nd\/res/;
    if (reg.test(req.url)) {
        res.status(404).send('Not Fount');
    } else {
        handleSend('build/index.html', req, res);
    }
});

// 为了设置界面的header信息，动态向界面输出window._headers
// 通过rf获取location地址的文件,找到</head>下标，截断在向文件中添加全局window._headers对象
function handleSend(location, request, response) {
    let html;
    rf.readFile(path.resolve(__dirname, location), 'utf-8', function (err, data) {
        if (err) {
            console.error(err);
        } else {
            let he = JSON.stringify(request.headers);
            html = data.replace('</head>', '<script>window._headers = ' + he + ' </script></head>');
            response.send(html);
            response.end();
        }
    });
}

// 启动
app.listen(3000, function () {
    console.log('端口:3000');
});
