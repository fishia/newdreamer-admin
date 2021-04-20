console.log('--1212-', process.env.NODE_ENV);

let reqUrl = '//newdreamer.cn';

if (window.location.href.indexOf('newdreamer.cn') <= 0) {
    reqUrl = '';   
}

export default reqUrl;