这是一个演示 React hooks 的 demo。用到 [LeanCloud](https://leancloud.cn) 做数据存储。

相关的代码主要在 [`src/App.js`](src/App.js)。可以在本地用 `npm start` 来运行项目，也可以访问 [https://hook-demo.netlify.com/]。

注意这个项目使用的是 LeanCloud 的一个开发版应用，在测试的人多时可能会因为超出请求数限制而出错。如果要基于它做进一步开发，建议尽快替换自己的 AppId 和 AppKey。

这是个简单的 Todo list, 可以添加新的项目，点击项目可以标记为完成。
