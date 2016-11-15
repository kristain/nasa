#allience_web_app

###安装
```
npm install
```
启动服务(http://localhost:8091)

```
node server.js
```
生产环境发布代码
```
npm run build
```

###注意：

生产环境，复制index.html到dist目录，同时更改common.js和build.js目录
```
<script src="common.js"></script>
<script src="build.js"></script>
```