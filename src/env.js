console.log('--1212-', process.env.NODE_ENV);
console.log('--1212-', process.env);

// let reqUrl = '//newdreamer.cn';
let reqUrl = process.env.REACT_APP_ENV === 'production' ? "//www.hznewdreamer.cn" : '//test.hznewdreamer.cn';

if (window.location.href.indexOf('newdreamer.cn') <= 0) {
    reqUrl = '';
}

export default reqUrl;
