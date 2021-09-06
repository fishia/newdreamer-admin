## 命令介绍
- npm install 安装依赖
- npm start 启动
- npm build 编译
- yarn install 安装依赖
- yarn start 启动
- yarn build 编译

## 分支介绍

- master 主分支
- dev 开发分支
//正式上线后，后期会多加分支
- feature/ 新增功能分支
- release/ 发布功能分支
- hotfix/ 修复补丁分支

## 插件介绍

- 脚手架：dva+roadhog
- UI:antd,Vtx-components
- 请求：axios
- 工具库：lodash.moment,ramda,react-uuid,immer,path-to-regexp,updeep，ahooks等
- 打包优化：webpack-parallel-uglify-plugin：代码压缩，css-split-webpack-plugin：css分割，兼容ie,babel-plugin-transform-remove-console:去除console,babel-plugin-import:动态加载等
- 代码分析：webpack-bundle-analyzer 

## 目录介绍
├─dist   打包目录
├─mock   本地mock
├─public  项目本地模板入口及全局js     
└─src
    │  index.js  项目入口
    │  router.js  路由入口
    ├─api        旧版api请求
    ├─assets     项目中静态资源（图片、js、全局样式)    
    ├─axios      重构1.0api请求拦截器配置
    ├─components 公共组件    
    ├─hooks      公共hooks    
    ├─layouts    登录、主页面layout          
    ├─models    model控制页面业务数据     
    ├─pages     项目页面        
    ├─routers   路由相关配置及方法
    │  │  index.js
    │  ├─components
    │  │      RouterContainer.js   路由层级包裹
    │  ├─config  页面路由配置
    │  └─utils    renderRoutes.js     路由渲染业务逻辑渲染    
    ├─services   重构1.0api请求路径
    └─utils      项目工具js
│  .editorconfig
│  .env          环境变量配置文件
│  .env.development  开发环境变量配置文件
│  .env.production   生产环境变量配置文件
│  .env.test         测试环境变量配置文件
│  .gitignore
│  .prettierignore    
│  .prettierrc       
│  .roadhogrc.mock.js
│  .webpackrc.js      webpackpe配置
│  jsconfig.json
│  package-lock.json  package.json锁定文件，勿删！！
│  package.json
│  README.md       
│  webpack.config.js  webpack补充配置文件
│  yarn.lock          package.json锁定文件，勿删！！   