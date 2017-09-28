# cook

> A Vue.js project


## 问题日记
* App.vue引入多个css文件，加‘；’，不然不解析
* axios 发送post请求时，要配置Content-type，将post的参数从preload data转换成form data
* 全局引入scss变量，[方案一](https://hopkinson.github.io/2017/06/30/Vue%E4%B8%ADSASS%E5%A6%82%E4%BD%95%E5%85%A8%E5%B1%80%E4%BD%BF%E7%94%A8%E5%8F%98%E9%87%8F%EF%BC%8Cmixin%EF%BC%8C%E6%88%96%E8%80%85function/),[方案二](https://github.com/shakacode/sass-resources-loader)
* 静态资源加载（图片）
* 通过在main里添加Vue.prototype.BUS=new Vue()新建一个vue实例作为中央事件总线，来进行非父子组件之间的通信，后续改为vuex



## 技术方案
* [图片上传](http://blog.csdn.net/xiaogezl/article/details/70156500)
* mint-picker + mint-popup 自定义时间日期选择器，并自定义时间